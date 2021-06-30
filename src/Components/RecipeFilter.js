import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

export default function RecipeFilter(props) {
  //const classes = useStyles();
 

  const handleChange = (event) => {
    props.setRanges({ ...props.ranges, [event.target.name]: event.target.checked });
  };

  const { range1,range2,range3,range4,range5,range6 } = props.ranges;

  return (
    <div /*className={classes.root}*/>
      <FormControl component="fieldset" /*</div>className={classes.formControl}*/>
        <FormLabel component="legend">Cook Time</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={range1} onChange={handleChange} name="range1" />}
            label="0-30 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range2} onChange={handleChange} name="range2" />}
            label="31-60 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range3} onChange={handleChange} name="range3" />}
            label="61-90 minutes"
          />
           <FormControlLabel
            control={<Checkbox checked={range4} onChange={handleChange} name="range4" />}
            label="91-120 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range5} onChange={handleChange} name="range5" />}
            label="121-150 minutes"
          />
          <FormControlLabel
            control={<Checkbox checked={range6} onChange={handleChange} name="range6" />}
            label="150+ minutes"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
