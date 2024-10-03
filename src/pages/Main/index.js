
import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import './styles.css';

import api from '../../services/api';


const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <h2>Erro</h2> */ }
        <p className="message">{ message }</p>
        <button className="fechar" onClick={ onClose }>Fechar</button>
      </div>
    </div>
  );
};

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [newRepo, setNewRepo] = useState('');            // input q capta o q digita
  const [repositorios, setRepositorio] = useState([])    // [] para armazenar todos os repositórios cadastrados
  const [loading, setLoading] = useState(false)          // estado para animação


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {          // função responsável por fazer a requisição

      setLoading(true);                // habilita o loading
      try {

        // verificando se foi digitado algo
        if (newRepo === '') {
          setErrorMessage('Você precisa indicar um repositório');    // modal
          setIsModalOpen(true);

          return;
          // throw new Error('Você precisa indicar um repositório');
        }


        // verificando se repo ja existe
        const seExisteRepo = repositorios.find(repo => repo.name === newRepo);

        if (seExisteRepo) {
          setErrorMessage('Repositorio Duplicado');
          setIsModalOpen(true);

          throw new Error('Repositorio Duplicado');  // se tem o repositorio vou barrar
        }

        const response = await api.get(`repos/${ newRepo }`)  // exemplo : https://api.github.com/repo/facebook/react

        const data = {                              // pega o q foi digitado   // desconstrução
          name: response.data.full_name,            // colocando dentro objeto para poder colocar mais depois
        }

        setRepositorio([...repositorios, data]);    // pega tudo q tem e adiciona o data, novo cadastro
        setNewRepo('');                             // para limpar o input

      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false);                          // finaliza o loading
      }
    }

    submit();

  }, [newRepo, repositorios]);         // qndo uma ou a outra state for atualizada ele chama o useCallback

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleDelete = useCallback((repo) => {
    const encontrar = repositorios.filter(r => r.name !== repo);
    setRepositorio(encontrar);    // find - retorna tudo menos o ue foi clicado para deletar

    alert(`Repositório ${ repo } Deletado!`)

  }, [repositorios])

  // MODAL DE DIGITAR REPOSITORIO
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  return (
    <Container>
      <h1>
        <FaGithub size={ 25 } />
        Meus Repositórios
      </h1>

      <Form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={ newRepo }
          onChange={ handleInputChange }
        />

        <SubmitButton loading={ loading ? 1 : 0 }>
          {
            loading ? (
              <FaSpinner size={ 14 } color="#DC143C" />
            ) : (
              <FaPlus color="#DC143C" size={ 14 } />
            )
          }
        </SubmitButton>

      </Form>

      <List>
        { repositorios.map(repo => (
          <li key={ repo.name }>
            <span>
              <DeleteButton onClick={ () => handleDelete(repo.name) }>
                <FaTrash size={ 12 } color="#DC143C" />
              </DeleteButton>
              { repo.name }
            </span>
            <a href="../Repositorio/index.js">
              <FaBars size={ 20 } color="#6F42C1" />
            </a>
          </li>
        )) }
      </List>

      <Modal isOpen={ isModalOpen } onClose={ closeModal } message={ errorMessage } />
    </Container>

  )
}
