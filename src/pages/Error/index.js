
import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div style={{textAlign: 'center'}}>
      <h2>Pagina não encontrada</h2>

      <Link to={'/'}>Voltar para Home</Link>
    </div>
  )
}