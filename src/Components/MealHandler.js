import React from 'react'
import {Button} from 'react-bootstrap'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import {useHistory} from 'react-router-dom'

export default function MealHandler(props){

    
  const history = useHistory();

  const mealHandler = ()=>{
      const link = `Recipe link : http://localhost:3000/full-recipe/${props.id}`

    history.push({
      pathname: '/meal-planner',
      state: 
      { title : props.title,
        notes: link
    }});
  }

  return  <div>
  <Button variant="outline-primary"
  onClick={mealHandler}
  ><EventOutlinedIcon/></Button>
  </div>
}