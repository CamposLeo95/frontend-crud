import { useEffect, useState, useContext} from 'react';
import './styles.css';

import { Link } from 'react-router-dom';

import Nav from './Nav';
import Search from './Search';
import Repositories from './Repositories';
import { AuthContext } from '../../contexts/auth';

import { createRepository, getRepositories, destroyRepository } from '../../services/api';


const MainPage = () => {
    const{ user, logout } = useContext(AuthContext);

    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const loadData = async(query = '') => {
        try {
            const response = await getRepositories(user?.id, query);
            setRepositories(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoadingError(true);
        }  
    }

    useEffect(() => {
        (async () => await loadData())();

    }, []);

    const handleLogout = () => {
        logout();
    };

    const handleSearch = (query) => {
        loadData(query);
    };

    const handleDeleteRepo = async (repository) =>{
        try{
            await destroyRepository(user?.id, repository._id);
            await loadData();
        }catch (error){
            console.error(error);
            setLoadingError(true);
        } 
    };

    const handleNewRepo = async (url) =>{
        try {
           await createRepository(user?.id, url);
           await loadData();
        } catch (error) {
            console.error(error);
            setLoadingError(true);
        }
        
    };

    if(loadingError){
        return(
            <div className="loading">
                Erro ao carregar os dados
                <Link to="/login">Voltar</Link>
            </div>
        )
    }

    if (loading){
        return(
            <div className="loading">
                Carregando...
            </div>
        )
    }

    return(
        <div id="main">
            <Nav onLogout={handleLogout}></Nav>
            <Search onSearch={handleSearch} />
            <Repositories 
                repositories={repositories} 
                onDeleteRepo={handleDeleteRepo}
                onNewRepo={handleNewRepo}
            />
        </div>
    )
};

export default MainPage;