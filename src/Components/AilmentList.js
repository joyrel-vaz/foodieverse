import React,{useState , useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import {Card, CardColumns}  from 'react-bootstrap'
import HealingIcon from '@material-ui/icons/Healing';
import './Ailment.css';

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
          <h1 style={{paddingTop:'2rem'}}><center>{a_category}</center></h1>
          <CardColumns>
           {     
             ailments.map(a => 
              <Card className="text-center" style={{ height: '10rem' }}>
                <Card.Body>
                <HealingIcon style={{ fontSize: 60, color: '#C90F03' }}/>
                  <Card.Title> 
                    <ul className='list-bul-no'>
                      <Link className='noLink' to={{ pathname: `/home-remedies/${a.ailment_category}/${a.ailment_name}`,
                          state:state
                    }}><li className = 'navD' key={a.ailment_name}>{a.ailment_name}</li></Link>
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

export default AilmentList;