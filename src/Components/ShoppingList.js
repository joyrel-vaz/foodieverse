import React,{useRef, useState, useEffect} from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext'
import {Container, Row, Col} from 'react-bootstrap'
import {getShopList, addShopList, delShopList} from '../api.js'

export default function ShoppingList() {
    const itemRef = useRef();
    const [error, setError] = useState("");
    const [shopList, setShopList] = useState({Items: [],
                                             _id: NaN,
                                             userID: "User Not Logged In"});
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth()

    const fetchShopList=async()=>{
        try{
            //get user shopList
            var shopList = await getShopList(currentUser.email);
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
            var shopList = await addShopList(currentUser.email,itemRef.current.value);
            //console.log(shopList);
            if(shopList._id){
                setShopList(shopList);
            }else{
                setError(shopList.userID);
            }
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    async function delItem(item){
        try{
            setError('');
            setLoading(true);
            //shoplist update
            var shopList = await delShopList(currentUser.email,item);
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
            <Col>
            {shopList.Items.length>0 ? shopList.Items.map(item=>
                <Row>
                    <Col>{item}</Col>
                    <Col><Button onClick={()=>delItem(item)} disabled={loading}>delete</Button></Col>
                </Row>
                )
                :
                "Your Shopping List is Empty."
            } 
            </Col>
            
            </Card.Body>
        </Card>
        
        </>
        </div>
    )
}
