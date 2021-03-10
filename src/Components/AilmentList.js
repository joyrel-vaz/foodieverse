import React,{useState,useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import {fireSQL} from '../firebase';
import { Alert } from 'react-bootstrap'

function AilmentList() {
    const [ailments,setAilments]=useState([])
    const [error, setError] = useState("")
    const {a_category} = useParams();

  const fetchAilments=async()=>{

    try{
    const ails = await fireSQL.query(`
    SELECT ailment_name FROM dadiKeNuske WHERE ailment_category = '${a_category}'
    `);

    setAilments(ails)

    }catch(error){
      setError(error.message)
    }
  }
  
  useEffect(() => {
    fetchAilments();
  },[]);

  return (
        <div>
          <h1>{a_category}</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <ul>
            { 
              ailments.map(a => 
              <Link to={`/home-remedies/${a_category}/${a.ailment_name}`}><li key={a.ailment_name}>{a.ailment_name}</li></Link>
              )
            }
          </ul>
        </div>
  );
}

export default AilmentList;