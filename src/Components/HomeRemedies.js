import React,{useState,useEffect} from 'react';
import {db} from '../firebase';
import { Alert } from 'react-bootstrap'

function HomeRemedies() {
    const [remedies,setRemedies]=useState([])
    const [error, setError] = useState("")

  const fetchRemedies=async()=>{

    try{
      const data = await db.collection('dadiKeNuske').get();
      setRemedies(data.docs.map(doc=>doc.data()));
    }catch(error){
      setError(error.message)
    }
    
    
  }
  
  useEffect(() => {
    fetchRemedies();
  });

  return (
        <div>
          <h1>Home remedies</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {remedies.map(remedy => (
            <div>       
            <h5>{remedy.ailment_name}</h5>
           <p>{remedy.methods}</p>
           </div>  
          ))}
           
        </div>
  );
}

export default HomeRemedies;