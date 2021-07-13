import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Container} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Payments() {
  const classes = useStyles();

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'3rem 0 0 0'}}
  >
       <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="EMI"
          secondary={
            <React.Fragment>
              {" Debit EMI is a new EMI method using which you can avail EMI on your debit card. You don't need to have the entire amount in your account at the time of transaction and bank will not block any amount on your card. We will use the pre-approved overdraft facility enabled by your bank and bank will deduct the EMI amount every month from your account. Currently, EMI is available only on HDFC, SBI, Axis, ICICI, Federal and Kotak Mahindra debit cards. You will need to make a purchase of a minimum amount of ₹5000 using your HDFC, ICICI, Federal, Axis and Kotak Mahindra debit cards and ₹8000 on SBI debit cards to avail EMI."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Revise Payment"
          secondary={
            <React.Fragment>
               {"If your transaction failed in the first attempt, you can retry your payment with the same payment method or choose a different one."}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </div>
    </Container>
    </>
  );
}
