
import React from "react";
import { useParams } from "react-router-dom";
import { Container } from './styles';

export default function Repositorio({match}) {

  const {repositorio} =useParams();

  return (

    <Container>
      <h1>
        Pagina Repositorio<br/>
        { repositorio }
      </h1>
    </Container>
  )
}