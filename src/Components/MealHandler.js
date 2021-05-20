import React from 'react'
import {Button} from 'react-bootstrap'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import {useHistory} from 'react-router-dom'

export default function MealHandler(props){

    
  const history = useHistory();

  const mealHandler = ()=>{

    history.push({
      pathname: '/meal-planner',
      state: props
    });
  }

  return  <div>
  <Button variant="outline-primary"
  onClick={mealHandler}
  ><EventOutlinedIcon/></Button>
  </div>
}