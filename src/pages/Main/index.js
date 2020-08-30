import React from 'react';
//styles
import './styles.css';
//
import logo from '../../Assets/logo512.png';
import { useHistory } from 'react-router-dom';

const Main = () => {
    const history = useHistory();

    function loginPage(e) {
      e.preventDefault();
      return history.push('/auth/login');
    }

    function RegisterPage(e) {
      e.preventDefault();
      return history.push('/auth/register');
    }

    return (
      <div className="main-interface">
        <section className="main-interface-text">
          <img src={logo} alt="logo da aplicacao" />

          <h1>Bem vindo ao Vuttr</h1>

          <h2>
            Uma aplicacao onde temos ferramentas que sao muito uteis de se lembrar
          </h2>
        </section>
        <div className="selecao">
          <button className="button-log" onClick={loginPage}>Iniciar seccao</button>
          <button className="button-log" onClick={RegisterPage}>Cadastrar</button>
        </div>
      </div>
    );
}

export default Main;