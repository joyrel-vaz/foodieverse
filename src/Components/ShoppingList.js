import React,{useRef, useState, useEffect} from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext'
import {Container, Row, Col} from 'react-bootstrap'
import {getShopList} from '../api.js'

export default function ShoppingList() {
    const itemRef = useRef();
    const [error, setError] = useState("");
    const [shopList, setShopList] = useState({});
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth()

    
    const fetchShopList=async()=>{
        try{
          var shopList = await getShopList(currentUser.email);
          setShopList(shopList);
        }catch(error){
            setError(error);
        }  
      }
      
      useEffect(() => {
        fetchShopList();
      },[]);

    function addItem(e){

    }

    return (
        <div>
           <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Shopping List</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={addItem}>
                    <Form.Group id="addItem">
                        <Form.Label>Add Item</Form.Label>
                        <Form.Control type="text" ref={itemRef} required/>
                    </Form.Group>

                   

                    <Button disabled={loading} className="w-100" type="submit">
                        Add Item
                    </Button>
                </Form>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body className="text-center">
                {  shopList.userID}

                {shopList.Items.map(item=>
                    <ul>
                        <li key={item}>{item}</li>
                    </ul>
                    )} 
            </Card.Body>
        </Card>
        
        </>
        </div>
    )
}
