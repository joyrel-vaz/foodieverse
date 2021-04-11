import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import './Chip.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip1:{
    color:'white' ,
    backgroundColor:'#C90F03' 
  }
}));

export default function SmallChips() {
  const classes = useStyles()
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <div className={classes.root}>
      <Chip
        className={classes.chip1}
        size="small"
        avatar={<Avatar alt="P" src='xyz.jpg' />}
        label="Peas"
        onDelete={handleDelete}
      />
      <Chip
      className={classes.chip1}
        size="small"
        avatar={<Avatar alt="C" src='xyz.jpg'/>}
        label="Cheese"
        onDelete={handleDelete}
      />
      <Chip
      className={classes.chip1}
        size="small"
        avatar={<Avatar alt="O" src='xyz.jpg' />}
        label="Oil"
        onDelete={handleDelete}
      />
      <Chip
      className={classes.chip1}
        size="small"
        avatar={<Avatar alt="S" src='xyz.jpg'/>}
        label="Sugar"
        onDelete={handleDelete}
      />
      <Chip
      className={classes.chip1}
        size="small"
        avatar={<Avatar alt="P" src='xyz.jpg'/>}
        label="Paneer"
        onDelete={handleDelete}
      />
    </div>
  );
}
