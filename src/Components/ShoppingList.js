import React,{useRef, useState} from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';

export default function ShoppingList() {
    const itemRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
                //shoppinglist display
            </Card.Body>
        </Card>
        
        </>
        </div>
    )
}
