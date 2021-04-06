import React from 'react'
import './Home.css'
import ControlledCarousel from './ControlledCarousel';

export default function Home() {
  return(
    <>
      <header>
      <div className="intro-logo jumbo-bg">
      <h1>Welcome to FoodKart</h1>
        <h3 className="subtitle">The One-Stop Destination for all your Cooking Needs!</h3>
        <ControlledCarousel/>
        <div className="company-icons">
          <span className="company-icons__item">
            <i className="fas fa-carrot" />
            <a href="./recipe" class="navL">Search by Ingredient</a>
          </span>
          <span className="company-icons__item">
            <i className="fas fa-utensils" />
            <a href="./recipe" class="navL">Search by Recipe</a>
          </span>
          <span className="company-icons__item">
            <i className="fas fa-mortar-pestle" />
            <a href="/home-remedies" class="navL">Dadi Ke Nuske</a>
          </span>
        </div>
        </div>
    </header>
    </>
  )
}