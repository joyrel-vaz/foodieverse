import React from 'react'
import './Home.css'
import ControlledCarousel from './ControlledCarousel';
import { Container, Row, Col } from 'reactstrap'

export default function Home() {
  return(
    <>
      <header>
      <div className="intro-logo jumbo-bg">
      <h1>Welcome to FoodieVerse</h1>
        <h3 className="subtitle">The One-Stop Destination for all your Cooking Needs!</h3>
        <ControlledCarousel/>
        <div className="company-icons">
          <span className="company-icons__item">
            <i className="fas fa-carrot" />
            <a href="./recipes" class="navL">Search for Recipes</a>
          </span>
          <span className="company-icons__item">
            <i className="fas fa-mortar-pestle" />
            <a href="/home-remedies" class="navL">Dadi Ke Nuske</a>
          </span>
        </div>
        </div>
    </header>
    <section className="s1">
      <Container>
        <Row>
        <Col md="12" className="text-center s1-intro">
            <h1>Crave. Find. Devour.</h1>
            <h3>Recipes that make you go WOW!</h3>
          </Col>
        </Row>
      <Row className="s3__box-wrapper">
      
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home001.jpg"
            alt=""
          />
          <h3>Ingredient-based Search</h3>
          <p>
          Your search for recipes based on the ingredients you crave for ends here!
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home003.jpg"
            alt=""
          />
          <h3>Remedies for Illnesses</h3>
          <p>
          Heal Naturally with verified homemade remedies.
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home004.jpg"
            alt=""
          />
          <h3>Plan your Meals Before-hand</h3>
          <p>
            Like a recipe and wanna cook it for dinner on your Anniversary? Schedule it now.
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home005.jpg"
            alt=""
          />
          <h3>Like to save Favourites</h3>
          <p>
            Love it? Save for the Future!
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home006.jpg"
            alt=""
          />
          <h3>In-App Grocery Lists</h3>
          <p>
            Make a list of all the ingredients that you'll need to buy.
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home007.jpg"
            alt=""
          />
          <h3>Surprise Recipes</h3>
          <p>
           Don't know what to cook? Let us choose for you!
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home009.jpg"
            alt=""
          />
          <h3>Wanna Gain More?</h3>
          <p>
            The Foodium Service helps you make the best out of your investment.
          </p>
        </Col>
        <Col md="6" lg="3" className="s3__box-item">
          <img
            src="images/home011.jpg"
            alt=""
          />
          <h3>Chat with Us</h3>
          <p>
            Our Virtual Assistant will help you solve all your queries!
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="text-center s1-intro">
            <h1>Come indulge in the Universe of Foodies.</h1>
            <h3>Cherish each meal you cook and get your craving satisfied.</h3>
            <h3>Don't just eat to live, also LIVE TO EAT!</h3>
          </Col>
        </Row>
    </Container>
    <style>{`
    .s3 {
        font-size: 16px;
        margin-top: 10em;
    }
    .s3__titles {
        margin-bottom: 2em;
    }
    .s3__titles h1 {
        font-size: 2.6em;
        font-weight: 100;
        text-align: center;
    }
    .s3__titles h4 {
        font-size: .9em;
        font-weight: 100;
        text-align: center;
        margin-top: 1.8em;
        color: hsl(0, 2%, 48%);
    }
    .s3__box-wrapper {

    }
    .s3__box-wrapper {
        text-align: center;
    }
    .s3__box-item {
        padding: 2em;
        transition: all .5s;
    }
    .s3__box-item:hover {
        box-shadow: #ece9e9 1px 1px 15px;
    }
    .s3__box-item img {
        height: 100px;
    }
    .s3__box-item h3 {
        font-size: .9em;
        line-height: 2;
        font-weight: 700;
        letter-spacing: 1.5px;
        margin: 1.6em 0;
        text-transform: uppercase;
    }
    .s3__box-item p {
        font-weight: 100;
        font-size: .95em;
        line-height: 2;
        color: dimgray;
    }
    
    `}</style>
  </section>
    </>
  )
}