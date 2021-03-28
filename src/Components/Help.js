import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Container} from 'react-bootstrap';
import HelpIcon from '@material-ui/icons/Help';
import PaymentIcon from '@material-ui/icons/Payment';
import GroupIcon from '@material-ui/icons/Group';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: '#C90F03'
  }
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'3rem 0 0 0'}}
    >
         <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
      <center><h4>HELP</h4>
    <List component="nav" className={classes.root} aria-label="mailbox folders">
       <ListItem button>
       <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <HelpIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Recipe Enquiry" />
      </ListItem>
      <Divider />
      <ListItem button component='a' href="/payments">
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <PaymentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Payments" />
      </ListItem>
      <Divider />
      <ListItem button>
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <CallToActionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="FAQs" />
      </ListItem>
      <Divider />
      <ListItem button>
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <GroupIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Referrals" />
      </ListItem>
      <Divider />
      <ListItem button>
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <LiveHelpIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Customer Care" />
      </ListItem>
      <Divider />
      <ListItem button component='a' href="/demo">
      <ListItemAvatar >
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <VisibilityIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Demo" />
      </ListItem>
    </List>
    </center>
    </div>
    </Container>
    </>
  );
}
