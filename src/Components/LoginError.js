import React,{useRef, useState} from 'react';
import { Form, Card, Button, Alert, Row, Col, Image, Container} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import {createShop} from '../api.js'
import Login from './Login'


export default function LoginError (){
    return(
        <>
         <Container className="d-flex align-items-center justify-content-center" style={{padding:'1rem 0 0 0'}}
    >
         <div className="w-100" style={{maxWidth:"400px" , padding:"0 20px"}}>
         <Alert variant="danger">
         <center>Please Login to Access this Feature!</center>
         </Alert>
        </div>
        </Container>
        <Login/>
        </>
    );
}