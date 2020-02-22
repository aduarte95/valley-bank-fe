import React from 'react';
import './Subtitle.scss';

function Subtitle({children}) {

  return (   
        <h2 className="subtitle">{children}</h2>
  );
}

export default Subtitle;