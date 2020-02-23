import React from 'react';
import './Title.scss';

function Title({children, className}) {

  return (   
        <h1 className={"title " + className}>{children}</h1>
  );
}

export default Title;