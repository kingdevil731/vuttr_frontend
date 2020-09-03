import React, {useEffect, useState} from 'react';

import './styles.css'; // styles

import api from '../../services/api'; // api

import {FiX, FiPlus, FiSearch} from 'react-icons/fi'; // icon x e +

//utilidades
import converterParaArray from '../../utils/converterStringParaArray'; // String -> Array of Strings

const Inicial = () => {
    // query / pesquisa
    const [query, setQuery] = useState('');
    // dados da lista
    const [dados, setDados] = useState([]);
    // estado da form para nova ferramenta
    const [show, setShow] = useState(false); 
    // estado da form para remoção de dados
    const [remover, setRemover] = useState(false);
    // id para remover
    const [id, setId] = useState('');
    // usuario
    const usuario = localStorage.getItem('usuario');
    // token
    const token = localStorage.getItem('token');
    // dados no cadastro
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

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
    //função para adicionar item
    async function addItem(e){
      e.preventDefault();
      
      const data = {
        title,
        link,
        description,
        tags: converterParaArray(tags)
      }

      console.log("data", data, "headers", usuario, token);

      try {
        await api.post("/tools", data ,{
          headers: {
            usuario:usuario,
            token:token
          }
        }).then((response) => {
          console.log(response);
          //setDados(response.data);
        });
      } catch (error) {
        alert('Error, Tente Novamente! :(');
      }
    }

    // apresentar o modal
    function showModal(tipo) {
      if(tipo === 1){
        setShow(true);
      } else if (tipo === 2){
      setRemover(true);
      }
    };
    // guardar/esconder o modal
    function hideModal (tipo, e) {
      if(tipo === 1){
        setShow(false);
      } else if(tipo === 2) {
        addItem(e);
        setShow(false);
      }
       else if (tipo === 3){
        setRemover(false);
      } else if(tipo === 4){
        removerItem(id);
        setRemover(false);
      }
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
                    setId(i._id);
                    showModal(2);
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

        <Modal show={remover} handleClose={hideModal} tipo="modal-main-remove">
        <div className="title-modal">
          <FiX color="#e02041"/>
          <h3>Remove Tool</h3>
        </div>
        <div className="text">
          <p>Are You Sure You Want to Remove</p>
        </div>
        <div className="butoes">
          <button onClick={e => hideModal(3)}>Cancel</button>
          <button onClick={e => hideModal(4)}>Yes, Remove</button>
        </div>
        </Modal>

        <Modal show={show} handleClose={hideModal} tipo="modal-main">
          <div className="title-modal">
            <FiPlus color="#e02041"/>
            <h3>Add new tool</h3>
          </div>

          <form className="form-modal" onSubmit={e => hideModal(1)}>
            <label htmlFor="title">Tool Name</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" id="title" placeholder="Titulo da Ferramenta"/>

            <label htmlFor="link">Tool Link</label>
            <input type="text" value={link} onChange={e => setLink(e.target.value)} name="link" id="link" placeholder="Endereço da Ferramenta"/>

            <label htmlFor="description">Tool description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} name="description" id="description" placeholder="Descrição da Ferramenta"/>

            <label htmlFor="tags">Tags</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} name="tags" id="tags" placeholder="Tags para a Ferramenta"/>
          </form>

          <div className="butoes">
            <button type="submit" onClick={e => hideModal(2, e)}>Add Tool</button>
          </div>
        </Modal>
      </div>
    );
};

const Modal = ({ show, tipo, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className={tipo}>
        {children}
      </section>
    </div>
  );
};

export default Inicial;