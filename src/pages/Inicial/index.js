import React, {useEffect, useState} from 'react';

import './styles.css'; // styles

import api from '../../services/api'; // api

import {FiX, FiPlus, FiSearch} from 'react-icons/fi'; // icon x e +

const Inicial = () => {
    // query / pesquisa
    const [query, setQuery] = useState('');
    // dados da lista
    const [dados, setDados] = useState([]);
    // estado da form para nova ferramenta
    const [show, setShow] = useState(false); 
    // estado da form para remoção de dados
    const [remover, setRemover] = useState(false);

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
    };

    // apresentar o modal
    function showModal(tipo) {
      if(tipo === 1){
        setShow(true);
      }
      setRemover(true);
    };
    // guardar/esconder o modal
    function hideModal (tipo) {
      if(tipo === 1){
        setShow(false);
      }
      setRemover(false);
    };

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
            <button className="b" onClick={e => showModal(1)}>
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
        
        <Modal show={show} handleClose={hideModal}>
          <div className="title-modal">
            <FiPlus color="#e02041"/>
            <h3>Add new tool</h3>
          </div>

          <form class="form-modal" onSubmit={e => hideModal(1)}>
            <label htmlFor="title">Tool Name</label>
            <input type="text" name="title" id="title" placeholder="Titulo da Ferramenta"/>

            <label htmlFor="title">Tool Link</label>
            <input type="text" name="link" id="link" placeholder="Endereço da Ferramenta"/>

            <label htmlFor="title">Tool description</label>
            <input type="text" name="description" id="description" placeholder="Descrição da Ferramenta"/>

            <label htmlFor="title">Tags</label>
            <input type="text" name="tags" id="tags" placeholder="Tags para a Ferramenta"/>
          </form>

          <div className="butoes">
            <button type="submit" onClick={e => hideModal(1)}>Add Tool</button>
          </div>
        </Modal>
      </div>
    );
};

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};

export default Inicial;