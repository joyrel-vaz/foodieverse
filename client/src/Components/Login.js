import React,{useRef, useState} from 'react';
import { Form, Card, Button, Alert, Row, Col, Image, Container} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import {addFavorites, createShop} from '../api.js'
import { useLocation } from 'react-router'


export default function Login (){
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, loginGoogle, loginFB, loginTw, loginApple, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            if(location.state != null)
            {
                addFavorites(emailRef.current.value,location.state.id);
                history.push('/favorites');
            }
            else
                history.push('/')   
        }catch(error){
            setError(error.message);
        }
        
        setLoading(false);
    }

    async function googleLogin(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            var local = await loginGoogle();
            //check shoplist
            try{
                createShop(local.user.email);
            }catch(error){
                console.log(error.message);
            }
            history.push('/')   
        }catch(error){
            setError(error.message);
        }
        
        setLoading(false);
    }

    // eslint-disable-next-line
    async function fbLogin(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await loginFB();
            history.push('/')   
        }catch(error){
            setError(error.message);
        }
        
        setLoading(false);
    }

    // eslint-disable-next-line
    async function twLogin(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await loginTw();
            history.push('/')   
        }catch(error){
            setError(error.message);
        }
        
        setLoading(false);
    }

    // eslint-disable-next-line
    async function appleLogin(e){
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await loginApple();
            history.push('/')   
        }catch(error){
            setError(error.message);
        }
        
        setLoading(false);
    }


    return(
        <>
         <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'1rem 0'}}
    >
         <div className="w-100" style={{maxWidth:"400px" , padding:"0 20px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>

                    <Button disabled={loading} className="w-100 btn-red" type="submit">
                        Log In
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3 text-red">
                    <Link to="/forgot-password"  className="text-red">Forgot Password?</Link>
                </div>
                <hr></hr>
                <div className="w-100 text-center mt-3 text-muted">
                    or
                <br></br>
                <Col>
                    <Row className="d-flex align-items-center justify-content-around ">
                        <button className="btn btn-outline-dark" onClick={googleLogin}>
                            <Image src="https://img.icons8.com/color/24/000000/google-logo.png" /> Login with Google
                        </button>

                        {/* <button class="btn btn-light" onClick={appleLogin}>
                            <img src="https://img.icons8.com/color/30/000000/apple-logo.png" alt="google-logo" className="p-2"/> 
                        </button>

                        <button class="btn btn-light" onClick={fbLogin}>
                            <img src="https://img.icons8.com/offices/28/000000/facebook-new.png" alt="google-logo" className="p-2"/> 
                        </button>

                        <button class="btn btn-light" onClick={twLogin}>
                            <img src="https://img.icons8.com/color/35/000000/twitter.png" alt="google-logo" className="p-2"/> 
                        </button> */}
                    </Row>
                </Col>
                   
                </div>
            </Card.Body>
        </Card>
        
        <div className="w-100 text-center mt-2 text-red">
            Need an account? <Link to="/signup" className="text-red">Sign Up</Link>
        </div>
        </div>
        </Container>
        </>
    );
}