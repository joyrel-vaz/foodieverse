import React, { useState } from 'react'
import { Card, Button, Alert, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'




export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogOut(){
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch(error){
            setError(error.message)
        }

    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Search</h2>
                <div className="mb-2" >
                    <input type="text" className=" w-100"></input>
                </div>                

                <div className="text-right mt-2">
                    <Button /*onClick={}*/>
                       Search
                    </Button>
                </div>
            </Card.Body>
        </Card>
        <br></br>
        <Card>
            <Card.Body>
                {currentUser ?
                <div>
                    <div className="text-center mb-4" >
                        <h2 className="mb-2">Profile</h2>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <strong>Email:</strong> {currentUser && currentUser.email}

                        <Col>
                            <Row className="d-flex justify-content-around mt-2">
                                <Link to="/update-profile" className="btn btn-primary">Update Profile</Link>
                                <Link to="/shopping-list" className="btn btn-primary">Shopping List</Link>
                            </Row>
                            <Row className="d-flex justify-content-around mt-2">
                                <Button onClick={handleLogOut}>
                                    Log Out
                                </Button>
                            </Row>
                        </Col>                      
                    </div>
                </div>
                :
                <div className="text-center" >
                    <h2 className="mb-2">User Not Logged In</h2>
                    <Link to="/login" className="btn btn-primary">Log In</Link>
                </div>
                }
                
            </Card.Body>
        </Card>            
        </>
    )
}
