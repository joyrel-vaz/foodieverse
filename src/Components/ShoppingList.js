import React,{useRef, useState, useEffect} from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext'
import {Container, Row, Col} from 'react-bootstrap'
import {getShopList, updateShopList} from '../api.js'

export default function ShoppingList() {
    const itemRef = useRef();
    const [error, setError] = useState("");
    const [shopList, setShopList] = useState({Items: ["No Items added"],
                                             _id: NaN,
                                             userID: "User Not Logged In"});
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth()

    console.log(currentUser.email)
    const fetchShopList=async()=>{
        try{
            //get user shopList
            var shopList = await getShopList(currentUser.email);
            console.log(shopList);
            setShopList(shopList);
        }catch(error){
            setError(error);
        }  
      }
      
      useEffect(() => {
        fetchShopList();
      },[]);

    async function addItem(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            //shoplist update
            var shopList = await updateShopList(currentUser.email,itemRef.current.value);
            setShopList(shopList);
            setLoading(false);
        }catch(error){
            setError(error);
        }
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
                        <Form.Control type="text" ref={itemRef}required/>
                    </Form.Group>

                   

                    <Button disabled={loading} className="w-100" type="submit">
                        Add Item
                    </Button>
                </Form>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body className="text-center">
            {shopList.userID}

            {shopList.Items ? shopList.Items.map(item=>
                <ul>
                    <li key={item}>{item}</li>
                </ul>
                )
                :
                "empty list"
            } 
            </Card.Body>
        </Card>
        
        </>
        </div>
    )
}
