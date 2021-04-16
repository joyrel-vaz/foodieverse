import React,{useEffect, useState} from 'react';
import SmallChips from './Chip'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import { Col } from 'react-bootstrap';


const SearchBar = () => {
  const BarStyling = {display:'block',border:'1px solid black',height:'100px', width:'500px',
  borderRadius:'20px',maxWidth: '100%',margin:'0 auto'};
  
  const [searchTerm,setSearchTerm] = useState('');
  const [hasDeleted,setHasDeleted] = useState(false);
  const [deletedChip,setDeletedChip] = useState({});
  const history = useHistory();
  const [tags, setTags] = React.useState([]);

  const addTags = event => {
    if (event.keyCode === 32 && event.target.value !== "") {
        setTags([...tags, event.target.value]);
        event.target.value = "";
    }
};

const reformSearchTerm = () =>{
  tags.forEach(tag => {
    if(typeof(tag) === 'object') {
      if(!searchTerm.includes(tag.label))
        setSearchTerm(searchTerm.concat(" " + tag.label))
    }

    else {if(!searchTerm.includes(tag))
      setSearchTerm(searchTerm.concat(" " + tag));}
  })

}

useEffect(() =>{
  reformSearchTerm();
    
  console.log('new search term is ' + searchTerm)
},[tags])

const removeTags = index => {
  if(typeof(tags[index]) === 'string')
    setSearchTerm(searchTerm.replace(tags[index],''));
  setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);

};

const removeChipTags =(index,tag) => {
  setHasDeleted(true);
  setSearchTerm(searchTerm.replace(tag.label,''));
  setDeletedChip(tag);
  removeTags(index);
};

  const handleClick = () =>{
    setSearchTerm(encodeURIComponent(searchTerm));
      history.push({
      pathname: '/recipes',
      state:{mode: 'Ingredient'},
      search : `searchTerm=${searchTerm}`});
  }

  return (
    <div>
    <SmallChips 
    tags={tags}
    setTags={setTags}
    hasDeleted={hasDeleted}
    setHasDeleted={setHasDeleted}
    deletedChip={deletedChip}
    ></SmallChips>

    <div className="d-flex justify-content-center">
      <Container>
        <Row md={1}>
          <Col>
      <Form className="form-center" >
            <label className="justify-content-center" style={BarStyling}>
                {tags.map((tag, index) => (
                  
                    <span
                        key={index}
                        style={{margin:'5px'}}
                        >
                          {typeof(tag) !== 'object' ? 
                        <Chip 
                        className="material-icons"
                        label={tag}
                        color='secondary'
                        deleteIcon = {<CancelIcon/>}
                        onDelete={() => removeTags(index)} 
                        ></Chip>
                    :
                    <Chip 
                    className="material-icons"
                    label={tag.label}
                    color='secondary'
                    deleteIcon = {<CancelIcon/>}
                    onDelete={() => removeChipTags(index,tag)} 
                    ></Chip>}
                    </span>
                ))}
            <input
                style={{appearance:'none' , border:'none' , outline:'none' , margin:'10px', padding:'10px'} }
                type="text"
                name="searchTerm"
                placeholder="Press space to add tags"
                onKeyUp={event => addTags(event)}
            />
            </label>
        <div className="text-center m-3" >
        <input type="button" className="btn btn-outline-success" value="Search" variant="outline-success" onClick= {handleClick}/>
       </div> </Form></Col>
       </Row>
       </Container>
        </div>
        
    </div>
    
  );
}

export default SearchBar