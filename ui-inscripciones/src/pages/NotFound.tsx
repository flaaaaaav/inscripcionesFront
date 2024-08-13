import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <a href="/">
        <button>inicio</button>
      </a>
    </div>
  );
};

export default NotFound;
