import React, {useEffect, useState} from 'react';

import './styles.css'; // styles

import api from '../../services/api'; // api

import {FiX, FiPlus, FiSearch} from 'react-icons/fi'; // icon x e +

import Modal from '@bit/react-bootstrap.react-bootstrap.modal' // modal biblioteca

const Inicial = () => {
    const [query, setQuery] = useState(''); // query / pesquisa
    const [dados, setDados] = useState([]); // dados da lista
    const [estado, setEstado] = useState(false); // estado da form

    // obter dados no inicio
    useEffect(() => {
        try {
             api.get("/tools").then((response) => {
               setDados(response.data);
             });
        } catch (error) {
            alert('Aconteceu um erro estranho, Por favor Recarregue a pagina :X');
        }
    }, []);
    
    // funcao para remover item quando clicar no butao remover
    function removerItem(item){
        try {
            api.delete(`/tools/${item}`);

            setDados(dados.filter(i => i._id !== item));
        } catch (error) {
            alert('Error, tente novamente! :)');
        }
    }

    function abrirForm(form){

    }

    function fecharForm(form){

    }

    return (
      <div className="main">
        <div className="title">
          <h1>VUTTR</h1>
          <h4>Very Useful Tools to Remember</h4>
        </div>

        <div className="tools">
          <div className="first">
            <>
              <FiSearch />
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
            </>

            <label>
              <input
                type="checkbox"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="tags"
                id="tags"
              />
              search in tags only
            </label>
          </div>
          <div className="second">
            <button className="b" onClick={abrirForm}>
              <FiPlus />
              Add
            </button>
          </div>
        </div>
        <ul>
          {dados.map((i) => (
            <li key={i._id}>
              <div className="liTitle">
                <a href={i.link}>
                  <strong>{i.title}</strong>
                </a>
                <button
                  className="bRemove"
                  onClick={() => {
                    removerItem(i._id);
                  }}
                >
                  <FiX size={15} color="#e02041" />
                  remove
                </button>
              </div>
              <p>{i.description}</p>
              <p>{i.tags.toString()}</p>
            </li>
          ))}
        </ul>

        <Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<button onClick={fecharForm}>
							Close
            </button>
						<button onClick={fecharForm}>
							Save Changes
            </button>
					</Modal.Footer>
				</Modal>
      </div>
    );
};


export default Inicial;