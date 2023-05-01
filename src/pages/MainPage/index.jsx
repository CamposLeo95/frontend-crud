import './styles.css';

import { Link } from 'react-router-dom';

import Nav from './Nav';
import Search from './Search';
import Repositories from './Repositories';

import { createRepository, getRepositories } from '../../services/api';
import { useEffect, useState } from 'react';

const userId = '6449907dd9a137925b560f2a'

const MainPage = () => {

    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const loadData = async(query = '') => {
        try {
            const response = await getRepositories(userId);
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
        console.log('out');
    };

    const handleSearch = (query) => {
        console.log('search', query);
    };


    const handleDeleteRepo = (repository) =>{
        console.log(repository);
    };

    const handleNewRepo = (url) =>{
        createRepository;
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