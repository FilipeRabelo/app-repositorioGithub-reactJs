
import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Form, SubmitButton } from './styles';

import api from '../../services/api';

export default function Main() {

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorio] = useState([])  // [] para armazenar todos os repositórios cadastrados

  const handleSubmit = useCallback((e) => {           
    e.preventDefault();
  
    async function submit(){          // funcao reponsavel por fazer a requisicao
      
      const response = await api.get(`repos/${ newRepo }`)  // exemplo : https://api.github.com/repo/facebook/react
                                                            
      const data = {                                        // desconstrução
        name: response.data.full_name,                      // colocando dentro objeto para poder colocar mais depois
      }

      setRepositorio([...repositorios, data]);   // pega tudo q tem e adiciona o data, novo cadastro
      setNewRepo('')                            // para limpar o input
    }

    submit()

  }, [newRepo, repositorios])   // qndo uma ou a outra state for atualizada ele chama o useCallback
  

  function handleInputChange(e){    
    setNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={ 25 } />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color="#DC143C" size={ 14 } />
        </SubmitButton>

      </Form>

    </Container>
  )
}