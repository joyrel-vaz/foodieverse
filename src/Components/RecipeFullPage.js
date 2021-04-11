import React , {Component } from 'react'
import './RecipeFullPage.css'
export default class RecipeFullPage extends Component {
    /*componentDidMount() {

     const {title} = this.props.location.state
     console.log("title:",title)
     const {id} = this.props.location.state
     console.log("ID:",id)
     const {instructions} = this.props.location.state
     console.log("Instructions",instructions)
     const {ingredients} = this.props.location.state
     console.log("Ingrdients:",ingredients)
     const {img} = this.props.location.state
     console.log("Image Link:",img)
     const {description} = this.props.location.state
     console.log("Description:",description)
    }*/
render(){
    
  return (
      <div className="page">
            <div className="page__body">
                <img src={this.props.location.state.img}
                alt="Recipe img"
                className="page__image"/>
                <h4 className="page__title">{this.props.location.state.title}</h4>
                <p className="page__description">{this.props.location.state.description}</p>
                <p className="page__ingredients">Ingrdients:<br/>
                {this.props.location.state.ingredients}</p>
                <p className="page__insructions">Method:<br/>
                {this.props.location.state.instructions}</p>
                
                </div>
        </div>
    )
}
}