import React,{useRef, useState, useEffect} from 'react';
import { Form, Card, Button, Alert, Container} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import { setProfile, getAllergens } from '../api';


export default function UpdateProfile (){

    const BarStyling = {display:'block',border:'1px solid grey',height:'100px', width:'500px',
  maxWidth: '100%',margin:'0 auto'};
  
  const inputStyling = {appearance:'none' , border:'none' , outline:'none' , margin:'10px', padding:'10px'};
  const [tags, setTags] = React.useState([]);

  const addTags = event => {
    let word = event.target.value;
    let len = word.length - 1;
    if (word.charAt(len) === ' ' && word !== "") {
        setTags([...tags, event.target.value.trim()]);
        event.target.value = "";
    }
};


const getMyAllergies = async() =>{
    const res = await getAllergens(currentUser.email);
    //console.log(res)
    setTags(res)
}

useEffect(() => getMyAllergies() ,[])

const submitProfile = async(newEmail) => {
        if(newEmail.value !== undefined)
    {
    const data = await setProfile(currentUser.email,newEmail.value,tags);
    //console.log(data);
 }
}

const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
};

    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser, updateEmail, updatePassword, updateDetails } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()


    function handleSubmit (e){
        e.preventDefault();      
            
        if(passwordRef.current.value !== 
            confirmPasswordRef.current.value){
            return setError("Passwords do not match");
        }
        
        const promises = []
        setError('');
        setLoading(true);

        if(emailRef.current.value !== currentUser.email){
           promises.push(updateEmail(emailRef.current.value)) 
        }
        
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value)) 
        }

        if(displayNameRef.current.value !== currentUser.displayName){
            promises.push(updateDetails(displayNameRef.current.value)) 
        }

        const newEmail = emailRef.current;
        promises.push(setProfile(currentUser.email,newEmail.value, tags))

        Promise.all(promises)
            .then(()=>{
                alert('Update successful!')
            })
            .catch((error)=>{
                alert('Update unsuccessful! Please try again')
                setError(error.message)
            })
            .finally(()=>{ 
                setLoading(false);
                history.push("/");
               
            })
    }

    return(
    <>
         <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'1rem 0'}}
    >
         <div className="w-100" style={{maxWidth:"400px" , padding:"0 20px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>

                    <Form.Group id="displayName ">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} required/>
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required/>
                    </Form.Group>

                    <Form.Group id="allergens">
                        <Form.Label>Allergens</Form.Label>
                        <label className="p-1 card overflow-auto" style={BarStyling}>
                        {tags.map((tag, index) => (
                        
                            <span
                                key={index}
                                className="m-2"
                                >
                                <Chip 
                                className="mt-1"
                                label={tag}
                                color='secondary'
                                deleteIcon = {<CancelIcon/>}
                                onDelete={() => removeTags(index)} 
                                ></Chip>
                            </span>
                        ))}
                        <input
                        style={inputStyling}
                            type="text"
                            name="searchTerm"
                            list="allergensNames"
                            placeholder="Press space to add tags"
                            onKeyUp={event => addTags(event)}
                        />
                        <datalist id="allergensNames">
                            <option value="Potato"/>
                            <option value="Tomato"/>
                            <option value="Onion"/>
                            <option value="Salt"/>
                            <option value="Sugar"/>
                            <option value="Milk"/>
                            <option value="Cheese"/>
                            <option value="Orange"/>
                            <option value="Banana"/>
                            <option value="Apple"/>
                            <option value="Butter"/>
                            <option value="Chocolate"/>
                            <option value="Oreo"/>
                            <option value="Peanut"/>
                            <option value="Cashew"/>
                            <option value="Mushroom"/>
                            <option value="Rice"/>
                            <option value="Flour"/>
                            <option value="Chikpeas"/>
                            <option value="Water"/>
                            <option value="Mustard"/>
                            <option value="Coriander"/>
                            <option value="Cloves"/>
                            <option value="Chicken"/>
                            <option value="Eggs"/>
                            </datalist>
                            </label>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep unchanged" />
                    </Form.Group>

                    <Form.Group id="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep unchanged" />
                    </Form.Group>

                    <Button disabled={loading} className="w-50 btn-red" type="submit" style={{marginRight:'5px'}}>
                        Update
                    </Button>
                    <Button className="btn-red" style={{marginLeft:'22px'}}>
                    <Link to="/" className='discard-up'>Discard Update</Link>
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
        </Container>
        </>
    );
}