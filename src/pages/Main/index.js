
import React, { useState } from "react";
import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Form, SubmitButton } from './styles';

export default function Main() {

  const [repo, setRepo] = useState('')

  return (
    <Container>
      <h1>
        <FaGithub size={ 25 } />
        Meus Repositorios
      </h1>

      <Form onSubmit={(e) => {
        e.preventDefault();
        alert(repo);
        setRepo('')
      }}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />

        <SubmitButton>
          <FaPlus color="#DC143C" size={ 14 } />
        </SubmitButton>

      </Form>

    </Container>
  )
}