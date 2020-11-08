import React from 'react';
import DuckCard from './DuckCard.jsx';
import data from '../data.jsx';
import './styles/DuckList.css';

function DuckList () {
  let { ducks } = data;
  return (
    <div className="duck-list">
      {
        ducks.map((duck) => {
          return (
            <DuckCard duck={duck} key={duck.id} />
          )
        })
      }
    </div>
  )
}

export default DuckList;