import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  }
  100% {
    box-shadow: 0 0 40px rgba(138, 43, 226, 0.9); /* Brilho aumentado */
  }
`;

export const Container = styled.div`
  color: #DC143C;
  max-width: 700px;
  background-color: #FFFFFF;
  border-radius: 6px;
  // box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
  box-shadow: 0 0 30px rgba(138, 43, 226, 1);
  animation: ${pulse} 1.5s infinite alternate;

  h1{
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg{
      margin-right: 10px;
    }
  }

  @media (max-width: 550px) {
    max-width: 90%;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  

  input{
    flex: 1;                            // para pegar toda a largura da tela
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 4px;
    color: #000;
    font-weight: bold;
    transition: all 0.8s;
    touch-action: manipulation;

    &:hover{
      background-color: #f5f5f5;
    }
  }
`;

export const SubmitButton = styled.button.attrs({
  
  type: 'submit',
})`
  background: #6F42C1;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s;

  &:hover{
    background-color: #f5f5f5;
  }
`;