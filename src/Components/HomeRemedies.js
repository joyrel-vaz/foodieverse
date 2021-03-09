import React,{useState,useEffect} from 'react';
import {db} from '../firebase';

function HomeRemedies() {
    const [remedies,setRemedies]=useState([])

  const fetchRemedies=async()=>{

    const data = await db.collection('dadiKeNuske').get();
    setRemedies(data.docs.map(doc=>doc.data()));
    }
  useEffect(() => {
    fetchRemedies();
  });

  return (
        <div><h1>Home remedies</h1>
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