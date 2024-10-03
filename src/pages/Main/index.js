
import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

import api from '../../services/api';

export default function Main() {

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorio] = useState([])  // [] para armazenar todos os repositórios cadastrados
  const [loading, setLoading] = useState(false) // estado para animação


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {          // funcao reponsavel por fazer a requisicao

      setLoading(true);                // habilita o loading
      try {
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

    alert(`Repositòrio ${repo} Deletado!`)

  }, [repositorios])

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
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={ 16 } color="#DC143C"/>
              </DeleteButton>
              {repo.name}
            </span>
            <a href="../Repositorio/index.js">
              <FaBars size={20}/>
            </a>
          </li>
        ))}
      </List>

    </Container>
  )
}