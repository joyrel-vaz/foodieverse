import React from 'react'
import { Form, FormControl, Button}  from 'react-bootstrap'

export default function Search(){
    return(
        <Form inline class="form-center">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 inp"/>
          <Button variant="outline-success">Search</Button>
        </Form>
    )
}