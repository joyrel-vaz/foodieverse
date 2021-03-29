import React from 'react'
import { Form, FormControl, Button, Container}  from 'react-bootstrap'
import SmallChips from './Chip'

export default function Search(){
    return(
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{ padding:'0'}}
      >
           <div className="w-100" style={{maxWidth:"600px" , padding:"20px", }}>
        <Form inline class="form-center">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 inp"/>
          <Button variant="outline-success">Search</Button>
        </Form>
        </div>
        </Container>
        <SmallChips></SmallChips>
        </>
    )
}