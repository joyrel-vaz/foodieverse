import React,{useState,useEffect} from 'react';
import { Link} from "react-router-dom";
import {fireSQL} from '../firebase';
import { Alert } from 'react-bootstrap'

function AilmentCategory() {
    const [uniqueCategories,setUniqueCategories]=useState([])
    const [error, setError] = useState("")
    const [catgs,setCatgs] = useState([]);
  const fetchCategories=async()=>{

    try{
    const catgs = await fireSQL.query(`
    SELECT * FROM dadiKeNuske
    `);

    //code to filter unique elements 
   const uniqueCatgs =  catgs.map(catgs => catgs.ailment_category).filter((value, index, self) => self.indexOf(value) === index)
    setUniqueCategories(uniqueCatgs)
    setCatgs(catgs);

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
              uniqueCategories.map(c => 
              <Link 
              to={{ pathname: `/home-remedies/${c}`,
                    state: catgs}}>
                <li key={c}>{c}</li></Link>
              )
            }
          </ul>
        </div>
  );
}

export default AilmentCategory;