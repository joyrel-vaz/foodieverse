import React,{useRef, useState} from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';


export default function ForgotPassword (){
    const emailRef = useRef();
    const { forgotpassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await forgotpassword(emailRef.current.value);
            setMessage("Reset email has been sent. Check your inbox for further instructions.")

        }catch(error){
            if(error.code==="auth/user-not-found")
                setError("There is no user record corresponding to this email. You can try creating an account.");
        }
        
        setLoading(false);
    }

    return(
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>

                    <Button disabled={loading} className="w-100" type="submit">
                        Reset Password
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                   Try to <Link to="/login">Log In</Link>?
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        
        </>
    );
}