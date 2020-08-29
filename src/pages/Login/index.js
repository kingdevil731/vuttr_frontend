import React, { useState, useEffect } from 'react';
// use history
import { useHistory } from 'react-router-dom';
// styles
import './styles.css';

import logo from '../../Assets/logo512.png'; // logo

import api from '../../services/api';


const Login = () => {
    // inicialização do useHistory
    const history = useHistory();
    //state
    const [id, setId] = useState('');

    useEffect(() => {
        console.log(id);
    }, [id]);

    async function iniciarSeccao(){
        const response = await api.get('/auth/login').send({
            id
        })
    }

    return(
        <div className="main-content">
            <section className="logo">
            <img src={logo} alt="logo da aplicação"/>
            <h1>Vuttr</h1>
            </section>
           
            <section className="form">
                <h1>Login</h1>
            <form action={iniciarSeccao} method="get">
                <input value={id} onChange={e => setId(e.target.value)} type="text" name="id" id="id" placeholder="Id"/>
                <button className="button-log" type="submit">Iniciar</button>
            </form>
            </section>
        </div>
    );
}

export default Login;