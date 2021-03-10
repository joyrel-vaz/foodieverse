import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import {fireSQL} from '../firebase';

import { Alert } from 'react-bootstrap'

function HomeRemedies() {
    const [remedies,setRemedies]=useState([])
    const [error, setError] = useState("")
    const {a_category,a_name} = useParams();

  const fetchRemedies=async()=>{

    try{
    const methods = await fireSQL.query(`
    SELECT methods FROM dadiKeNuske WHERE ailment_category = '${a_category}' AND ailment_name= '${a_name}'
    `);

    setRemedies(methods)

    }catch(error){
      setError(error.message)
    }
  }
  
  useEffect(() => {
    fetchRemedies();
  },[]);

  return (
        <div>
          <h1>Home remedies for {a_name}</h1>
          {error && <Alert variant="danger">{error}</Alert>}
            { 
              remedies.map(r => 
              <p key={r.methods}>{r.methods}</p>)
            }
        </div>
  );
}

export default HomeRemedies;