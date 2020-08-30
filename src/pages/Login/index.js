import React, { useState, useEffect } from 'react';
// use history
import { useHistory, Link } from 'react-router-dom';
// styles
import './styles.css';

import logo from '../../Assets/logo512.png'; // logo

import api from '../../services/api'; // importação do api

const Login = () => {
    // inicialização do useHistory
    const history = useHistory();
    //state
    const [id, setId] = useState('');
    const local = localStorage.getItem("_id");

    useEffect(() => {
      if(local !== undefined || local.length === 24){
        history.push('/main');
      }
    }, [local]);

    async function iniciarSeccao(e){
        e.preventDefault();
        try {
            const response = await api.get('/auth/login', {id});

            const {token, usuario} = response.body;
            
            // colocar o token e usuario no local storage do computador/usuario
            localStorage.setItem("token", token);
            localStorage.setItem("usuario", usuario);

            //ir para a pagina incial sendo que o usuario ja iniciou a seccao
            history.push('/main');
        } catch (error) {
            console.log(error);
            alert('Error, tente novamente');  
        }
       

    }

    return (
      <div className="main-content">
        <section className="logo">
          <img src={logo} alt="logo da aplicação" />
          <h1>Vuttr</h1>
        </section>

        <section className="form">
          <h1>Login</h1>
          <form onSubmit={iniciarSeccao}>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              name="id"
              id="id"
              placeholder="Introduza o Id"
            />
            <button className="button-log" type="submit">
              Iniciar
            </button>
          </form>
        </section>
      </div>
    );
}

export default Login;