import React,{useState,useEffect} from 'react';
import { Link} from "react-router-dom";
import {fireSQL} from '../firebase';
import { Alert } from 'react-bootstrap'

function AilmentCategory() {
    const [categories,setCategories]=useState([])
    const [error, setError] = useState("")

  const fetchCategories=async()=>{

    try{
    const catgs = await fireSQL.query(`
    SELECT ailment_category FROM dadiKeNuske
    `);

    //code to filter unique elements 
   const uniqueCatgs =  catgs.map(catgs => catgs.ailment_category).filter((value, index, self) => self.indexOf(value) === index)
    setCategories(uniqueCatgs)

    }catch(error){
      setError(error.message)
    }
  }
  
  useEffect(() => {
    fetchCategories();
  },[]);

  return (
        <div>
          <h1>Ailment categories</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <ul>
            { 
              categories.map(c => 
              <Link to={`/home-remedies/${c}`}><li key={c}>{c}</li></Link>
              )
            }
          </ul>
        </div>
  );
}

export default AilmentCategory;