import React,{useEffect, useState} from 'react';
import SmallChips from './Chip'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import { Col } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import {Button} from 'react-bootstrap';


export default function SearchByIng () {
  const BarStyling = {display:'block',border:'1px solid grey',height:'100px', width:'500px',
  maxWidth: '100%',margin:'0 auto'};
  
  const inputStyling = {appearance:'none' , border:'none' , outline:'none' , margin:'10px', padding:'10px'};

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

const addTagsMob = event => {
  if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
};

const reformSearchTerm = () =>{
  tags.forEach(tag => {
    if(typeof(tag) === 'object') {
      if(!searchTerm.includes(tag.label))
        setSearchTerm(searchTerm.concat(tag.label +" "))
    }

    else {if(!searchTerm.includes(tag))
      setSearchTerm(searchTerm.concat(tag));}
  })

}

useEffect(() =>{
  reformSearchTerm();   
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
      history.push({
      pathname: '/recipes',
      state:{mode: 'Ingredient', search : searchTerm },
      });
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
        <Row xs={1}>
          <Col xs>
      <Form className="form-center" >
            <label className="p-1 card overflow-auto" style={BarStyling}>
                {tags.map((tag, index) => (
                  
                    <span
                        key={index}
                        className="m-2"
                        >
                          {typeof(tag) !== 'object' ? 
                        <Chip 
                        className="mt-1"
                        label={tag}
                        color='secondary'
                        deleteIcon = {<CancelIcon/>}
                        onDelete={() => removeTags(index)} 
                        ></Chip>
                    :
                    <Chip 
                    className="mt-1"
                    label={tag.label}
                    color='secondary'
                    deleteIcon = {<CancelIcon/>}
                    onDelete={() => removeChipTags(index,tag)} 
                    ></Chip>}
                    </span>
                ))}
            <input
                style={inputStyling}
                type="text"
                name="searchTerm"
                list="ingredientNames"
                placeholder="Press space to add tags"
                onTouchEnd={event => addTagsMob(event)}
                onKeyUp={event => addTags(event)}
            />
            <datalist id="ingredientNames">
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
        <div className="text-center m-3" >
        <Button type="button" onClick={handleClick} className="btn-red">Search <SearchIcon className="white-icon"/></Button>
        
       </div> </Form></Col>
       </Row>
       </Container>
        </div>
        
    </div>
    
  );
}

