import React from 'react'
import { Container}  from 'react-bootstrap'
import './Home.css'
import HoverRating from './Rating'

export default function Feedback() {
  return(
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{ padding:'0'}}
      >
           <div className="w-100" style={{maxWidth:"600px" , padding:"20px", }}>
      <h4>Did you like our service?</h4>
      <HoverRating></HoverRating>
      <h4>Are the recipes displayed relevant?</h4>
      <HoverRating></HoverRating>
      <h4>How good is the website UI?</h4>
      <HoverRating></HoverRating>
      </div></Container>
    </>
  )
}