import styled from "styled-components";

export const Head = styled.header`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #6f42c1;
  color: #FFF;

.divLink {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  font-weight: bold;
}

.linkTo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  color: #FFF;
  font-weight: bold;
  text-decoration: none;
  align-items: center;
  font-size: 16px;
  transition: all 0.9s;

  &:hover {
    transform: scale(1.2);
    color: #DC143C;
  }
}
`;
