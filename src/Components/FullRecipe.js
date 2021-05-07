import React from 'react'
import './FullRecipe.css'


export default function FullRecipe(props) {
    const method = props.location.state.instructions;
    const ingred = props.location.state.ingredients.split('$ ');

  return (
      <div className="page">
            <div className="page__body">
                <img src={props.location.state.img}
                alt="Recipe img"
                className="page__image"/>
                <h4 className="page__title">{props.location.state.title}</h4>
                <p className="page__description">{props.location.state.servings}</p>
                <p className="page__ingredients">Ingredients:<br/></p><ul>
                {ingred.map(i => <li key={i}>{i}</li>)}</ul>
                <p className="page__insructions">Method:<br/></p>
                 <ol>{method.map(m =><li key={m}>{m}</li>)}</ol>
                
            </div>
    </div>
    )
}
