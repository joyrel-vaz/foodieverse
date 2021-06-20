import React from 'react'
import { Container} from 'react-bootstrap';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import RedeemIcon from '@material-ui/icons/Redeem';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Card} from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const names = [
  'Tomato',
  'Potato',
  'Onion',
  'Cheese',
  'Milk',
  'Apple',
  'Peas',
  'Rice',
  'Chicken',
  'Eggs',
];

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  cardSurprise: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: '#C90F03',
    '&:hover': {
      backgroundColor: '#C90F03',
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SurpriseRecipes() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const [time, setTime] = React.useState('');
  const [type, setType] = React.useState('');
  const [allergens, setAllergens] = React.useState('');
  const handleChange = (event) => {
    setIngredientsName(event.target.value);
  };
  const handleChange1 = (event) => {
    setType(event.target.value);
  };
  const handleChange2 = (event) => {
    setTime(event.target.value);
  };
  const handleChange3 = (event) => {
    setAllergens(event.target.value);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const [IngredientsName, setIngredientsName] = React.useState([]);


  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setIngredientsName(value);
  };
  const handleChangeMultiple2 = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setAllergens(value);
  };
  return (
      <>
      <center>
        <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <RedeemIcon /> : <SentimentVerySatisfiedIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
         Get Surprised!!!
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
    <div>
    <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="select-multiple-native">Ingredients</InputLabel>
        <Select
          multiple
          native
          value={IngredientsName}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
         {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="select-multiple-native">Allergens</InputLabel>
        <Select
          multiple
          native
          value={allergens}
          onChange={handleChangeMultiple2}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
         {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel shrink id="demo-customized-select-label">Type</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={type}
          onChange={handleChange1}
          input={<BootstrapInput />}
        >
          <MenuItem value={'Veg'}>Veg</MenuItem>
          <MenuItem value={'Non-Veg'}>Non-Veg</MenuItem>
          <MenuItem value={'Vegan'}>Vegan</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="demo-customized-select-native">Cooking Time</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={time}
          onChange={handleChange2}
          input={<BootstrapInput />}
        >
          <option aria-label="Any" value="" />
          <option value={30}>0-30 Minutes</option>
          <option value={60}>0-60 Minutes</option>
          <option value={90}>0-Above 1 Hour</option>
        </NativeSelect>
      </FormControl>
    </div>
    { 
                //   remedies.map(r => 
                //     <Card style={{marginTop:"1rem"}}>
                //     <Card.Header as="h5" className={classes.cardSurprise} >Remedy</Card.Header>
                //     <Card.Body>
                //       <Card.Text>
                //   {/* <p key={r.methods}>{r.methods}</p> */}
                //       </Card.Text>
                //   </Card.Body>
                // </Card>
                //   )
            }
    </center>
    </>
  );
}
