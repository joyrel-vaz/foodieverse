import React , {useState} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

export default function ModeToggle(props) {
    const [radioValue, setRadioValue] = useState('1');
  
    const modes = [
        {name : "Recipe" ,value:'1'},
        {name: "Ingredient" ,value:'2'}
      ]
  
    return (
      <div className="m-3 d-flex justify-content-center">
        <ButtonGroup toggle>
          {modes.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="primary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {setRadioValue(e.currentTarget.value); props.setMode(radio.name)}}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
    );
  }
  