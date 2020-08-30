import React, { useState, useEffect } from 'react';
// use history
import { useHistory } from 'react-router-dom';
// styles
import './styles.css';

import logo from '../../Assets/logo512.png'; // logo

//import api from '../../services/api';


const Register = () => {
    // inicialização do useHistory
    const history = useHistory();
    //state
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');

    useEffect(() => {
        console.log(usuario, nome);
    }, [usuario, nome]);

    async function cadastrar(){
       /* const response = await api.get('/auth/login').send({
            id
        })*/
    }
    function voltarParaLogin(){
        return history.push('/auth/login');
    }

    return(
        <div className="main-content">
            <section className="logo">
            <img src={logo} alt="logo da aplicação"/>
            <h1>Vuttr</h1>
            </section>
           
            <section className="form">
                <h1>Cadastrar</h1>
            <form onSubmit={voltarParaLogin} method="get">
                <input value={usuario} onChange={e => setUsuario(e.target.value)} type="text" name="usuario" id="usuario" placeholder="Introduza o Usuario"/>
                <input value={nome} onChange={e => setNome(e.target.value)} type="text" name="nome" id="nome" placeholder="Introduza o Nome"/>
                <button className="button-log" type="submit">Cadastrar</button>
            </form>
            </section>
        </div>
    );
}

export default Register;