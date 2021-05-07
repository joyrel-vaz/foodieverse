import React from 'react'
import './FullRecipe.css'


export default function FullRecipe(props) {
    const method = props.location.state.instructions;

  return (
      <div className="page">
            <div className="page__body">
                <img src={props.location.state.img}
                alt="Recipe img"
                className="page__image"/>
                <h4 className="page__title">{props.location.state.title}</h4>
                <p className="page__description">{props.location.state.servings}</p>
                <p className="page__ingredients">Ingredients:<br/>
                {props.location.state.ingredients}</p>
                <p className="page__insructions">Method:<br/></p>
                {method.map(m => <ol><li key={m}>{m}</li></ol>)}
                
            </div>
    </div>
    )
}
