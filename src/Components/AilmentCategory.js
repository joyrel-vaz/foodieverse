import React,{useState,useEffect} from 'react';
import { Link} from "react-router-dom";
import {getRemedies} from '../api.js';
import {Card, CardColumns}  from 'react-bootstrap'

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
          <CardColumns>
            { 
              uniqueCategories.map(c => 
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title> 
                      <ul>
                    <Link 
                    to={{ pathname: `/home-remedies/${c}`,
                          state: catgs}}>
                      <li key={c}>{c}</li></Link>
                      </ul>
                    </Card.Title>
                  </Card.Body>
                </Card>
              )
            }
          </CardColumns>
        </div>
  );
}

export default AilmentCategory;