import React,{useState,useEffect} from 'react';
import { Link} from "react-router-dom";
import {getRemedies} from '../api.js';

function AilmentCategory() {
    const [uniqueCategories,setUniqueCategories]=useState([])
    const [catgs,setCatgs] = useState([]);

  const fetchCategories=async()=>{
    try{
      const catgs = await getRemedies();
      //code to filter unique elements 
      const uniqueCatgs =  catgs.map(catgs => catgs.ailment_category).filter((value, index, self) => self.indexOf(value) === index)
      setUniqueCategories(uniqueCatgs)
      setCatgs(catgs);
    }catch(error){
      console.log(error);
    }  
  }
  
  useEffect(() => {
    fetchCategories();
  },[]);

  return (
        <div>
          <h1>Ailment categories</h1>
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