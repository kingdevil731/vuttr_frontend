import React from 'react';
//styles
import './styles.css';

const Main = () => {


    return (
      <div className="main-interface">

          <h1>Bem vindo ao Vuttr</h1>

          <h2>
            Uma aplicacao onde temos ferramentas que sao muito uteis de se lembrar
          </h2>

          <h3>
              Para poder prosseguir efectue a autenticacao do usuario
          </h3>

          <div className="selecao">
              <button>Iniciar seccao</button>
              <button>Cadastar</button>
          </div>
 
      </div>
    );
}

export default Main;