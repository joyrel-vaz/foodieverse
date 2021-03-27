import React from 'react'
import { Jumbotron, Button, Form, FormControl, Image}  from 'react-bootstrap'
import './Home.css'
import ControlledCarousel from './ControlledCarousel'
import Recipe from './Recipe'
import Search from './Search'

export default function Home() {
  return(
    <>
      <Jumbotron>
        <ControlledCarousel></ControlledCarousel>
      </Jumbotron>
      <Recipe></Recipe>
    </>
  )
}