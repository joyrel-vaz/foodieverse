import React,{useState , useEffect } from 'react';
import { useParams } from "react-router-dom";


function HomeRemedies(props) {
    const [remedies,setRemedies]=useState([])
    const {a_name} = useParams();
    const state = props.location.state;
  
    let list = [];
    state.forEach((d) => {
      if(d.ailment_name === a_name)
        list.push(d);
    })
    
    useEffect(() => {
      setRemedies(list);
    },[]);
    

  return (
        <div>
          <h1>Home remedies for {a_name}</h1>
            { 
              remedies.map(r => 
              <p key={r.methods}>{r.methods}</p>)
            }
        </div>
  );
}

export default HomeRemedies;