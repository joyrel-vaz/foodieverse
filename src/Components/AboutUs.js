import React, { Component } from 'react'
import CountUp from 'react-countup';


export default class AboutUs extends Component {
    
    render() {
        return (
            <>
            <div>
        <section className="page-title">
          {/* Container Start */}
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2 text-center">
                {/* Title text */}
                <h3>About Us</h3>
              </div>
            </div>
          </div>
          {/* Container End */}
        </section>
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-img">
                  <img src="images/imagesabout.jpg" className="img-fluid w-100 rounded" alt="" />
                </div>
              </div>
              <div className="col-lg-6 pt-5 pt-lg-0">
                <div className="about-content">
                  <h3 className="font-weight-bold">What is FoodKart?</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc est justo, aliquam nec tempor
                    fermentum, commodo et libero. Quisque et rutrum arcu. Vivamus dictum tincidunt magna id
                    euismod. Nam sollicitudin mi quis orci lobortis feugiat.</p>
                  <br />
                  <h3 className="font-weight-bold">How we can help</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc est justo, aliquam nec tempor
                    fermentum, commodo et libero. Quisque et rutrum arcu. Vivamus dictum tincidunt magna id
                    euismod. Nam sollicitudin mi quis orci lobortis feugiat. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Nunc est justo, aliquam nec tempor fermentum, commodo et libero.
                    Quisque et rutrum arcu. </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading text-center text-capitalize font-weight-bold py-5">
                  <h2>Our team</h2>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/wom001.jpg" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">XYZ</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/men001.png" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">XYZ</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/men001.png" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">XYZ</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card my-3 my-lg-0">
                  <img className="card-img-top" src="images/wom002.png" alt="Card img cap" />
                  <div className="card-body bg-gray text-center">
                    <h5 className="card-title">XYZ</h5>
                    <p className="card-text">Founder / CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section bg-gray">
          <div className="container">
            <div className="row">
            <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={0}
                    end={2314}
                    duration={5}></CountUp>
                      <h5>Happy Customers</h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={0}
                    end={1013}
                    duration={5}></CountUp>
                      <h5>Active Members</h5>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 my-lg-0 my-3">
                <div className="counter-content text-center bg-light py-4 rounded">
                  <i className="fa fa-smile-o d-block" />
                  
                    <CountUp start={220}
                    end={2413}
                    duration={5}></CountUp>
                      <h5>Verified Recipes</h5>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
            </>
        )
    }
}