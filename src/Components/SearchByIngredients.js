import React,{useEffect, useState} from 'react';
import SmallChips from './Chip'
import {useHistory} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';


const SearchBar = () => {
  const BarStyling = {display:'block',border:'1px solid black',height:'100px', width:'500px',
  borderRadius:'20px',maxWidth: '100%',margin:'20px',padding:'10px'};
  
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

useEffect(() =>{
  tags.forEach(tag => {
    if(typeof(tag) === 'object') setSearchTerm(searchTerm.concat(" " + tag.label)); 
    else setSearchTerm(searchTerm.concat(" " + tag));
  });

},[tags])

const removeTags = index => {
  setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
};

const removeChipTags =(index,tag) => {
  setHasDeleted(true);
  setDeletedChip(tag);
  removeTags(index);
};

  const handleSubmit = (e) =>{
    alert('in submit');
    alert(searchTerm); 
    setSearchTerm(encodeURIComponent(searchTerm));
      history.push({
      pathname: '/recipe',
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
      <Form className="form-center" onSubmit={handleSubmit}>
            <label style={BarStyling}>
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
                style={{appearance:'none' , border:'none' , outline:'none'}}
                type="text"
                name="searchTerm"
                placeholder="Press space to add tags"
                onKeyUp={event => addTags(event)}
            />
            </label>
        <div className="text-center m-3" >
        <button className="btn btn-danger" variant="outline-success">Search</button>
       </div> </Form>
        </div>

    </div>
    
  );
}

export default SearchBar