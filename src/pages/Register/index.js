import React, { useState, useEffect } from 'react';
// use history
import { useHistory } from 'react-router-dom';
// styles
import './styles.css';

import logo from '../../Assets/logo512.png'; // logo

import api from '../../services/api'; // api


const Register = () => {
    // inicialização do useHistory
    const history = useHistory();
    //state
    const [user, setUser] = useState('');
    const [name, setName] = useState('');

    async function cadastrar(e){
        e.preventDefault();
        try {
            const response = await api.post("/auth", {
              usuario: user,
              nome: name,
            });

            const {nome, token, usuario, _id} = response.data; // obtencao dos dados da resposta

            //guardar no localStorage do usuario a informacao para posterior uso na app
            localStorage.setItem('nome', nome);
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('_id', _id);

            //informar o usuario o seu id
            alert(`Parabens, Seu Id e ${_id}`);

            history.push('/main');
            
        } catch (error) {
            console.log(error);
            alert('Error, verifique os dados e tente novamente!');
        }
    }

    return(
        <div className="main-content">
            <section className="logo">
            <img src={logo} alt="logo da aplicação"/>
            <h1>Vuttr</h1>
            </section>
           
            <section className="form">
                <h1>Cadastrar</h1>
            <form onSubmit={cadastrar}>
                <input value={user} onChange={e => setUser(e.target.value)} type="text" name="usuario" id="usuario" placeholder="Introduza o Usuario"/>
                <input value={name} onChange={e => setName(e.target.value)} type="text" name="nome" id="nome" placeholder="Introduza o Nome"/>
                <button className="button-log" type="submit">Cadastrar</button>
            </form>
            </section>
        </div>
    );
}

export default Register;