import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Container} from 'react-bootstrap';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import BlockIcon from '@material-ui/icons/Block';
import ShareIcon from '@material-ui/icons/Share';
import StarRateIcon from '@material-ui/icons/StarRate';
import InfoIcon from '@material-ui/icons/Info';


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
      <center><h4>SETTINGS</h4>
    <List component="nav" className={classes.root} aria-label="mailbox folders">
       <ListItem button  component="a" href="/notifications">
       <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <NotificationsActiveIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Notifications" />
      </ListItem>
      <Divider />
      <ListItem button  component="a" href="/permissions">
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <BlockIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Permissions" />
      </ListItem>
      <Divider />
      <ListItem button  component="a" href="/integrations">
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <ShareIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Integrations" />
      </ListItem>
      <Divider />
      <ListItem button component="a" href="/feedback">
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <StarRateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Rate Us" />
      </ListItem>
      <Divider />
      <ListItem button  component="a" href="/legal">
      <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#C90F03' }}>
            <InfoIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Legal and Privacy Statement" />
      </ListItem>
    </List>
    </center>
    </div>
    </Container>
    </>
  );
}
