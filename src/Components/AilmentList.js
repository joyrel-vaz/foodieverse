import React,{useState , useEffect} from 'react';
import { Link, useParams } from "react-router-dom";

function AilmentList(props) {
    const [ailments,setAilments]=useState([])
    const {a_category} = useParams();
    let list = []
  const state = props.location.state;

    state.forEach((remedy) => {
    if(remedy.ailment_category === a_category)
      list.push(remedy);
  })

  useEffect(() => {
    setAilments(list);
  },[]);
  
  

  return (
        <div>
          <h1>{a_category}</h1>
          <ul>
            { 
              ailments.map(a => 
              <Link to={{ pathname: `/home-remedies/${a.ailment_category}/${a.ailment_name}`,
                          state:state
            }}><li key={a.ailment_name}>{a.ailment_name}</li></Link>
              )
            }
          </ul>
        </div>
  );
}

export default AilmentList;