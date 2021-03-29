import React , { useState } from 'react'
import { Carousel }  from 'react-bootstrap'
import './Home.css'

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'images/ingredients.jpg'}
            alt="First slide"
          />
          
          <Carousel.Caption>
            <h3>Your Ingredients, Our Recipe</h3>
            <p>Immerse yourselves into the world of innovative cuisine.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'images/cuisine.jpg'}
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>For Cravings that we Satsify</h3>
            <p>Name it and you Have it!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'images/remedies.jpg'}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Medicinal Remedies at your Fingertips</h3>
            <p>
            Missing home and your Granny's homemade remedies? We have got you covered.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }