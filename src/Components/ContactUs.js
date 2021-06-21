import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';
import SubjectIcon from '@material-ui/icons/Subject';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#C90F03'),
      backgroundColor: '#C90F03',
      '&:hover': {
        backgroundColor: '#C90F03',
        boxShadow:'3px 3px 3px #AAA',
      },
    },
  }))(Button);

export default function ContactUs() {
  const classes = useStyles();

  return ( <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"60vh", padding:'0 0 0 0'}}
    >
    <center>
          <h4>CONTACT US</h4>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <AccountCircle />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Name" />
            </Grid>
            </Grid>
        </div>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <EmailIcon />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Email" />
            </Grid>
            </Grid>
        </div>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <SubjectIcon />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Subject" />
            </Grid>
            </Grid>
        </div>
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <MessageIcon />
            </Grid>
            <Grid item>
                <TextField id="input-with-icon-grid" label="Message" />
            </Grid>
            </Grid>
        </div>
        <br/>
        <ColorButton
        variant="contained"
        endIcon={<SendIcon className="SendBtn"></SendIcon>}
      >
        <div className="SendBtn">Send</div>
      </ColorButton>
    </center>
    </Container>
    </>
  );
}
