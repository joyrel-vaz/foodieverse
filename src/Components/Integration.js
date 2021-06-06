import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IntegrationCard from './IntegrationCard.js'
import IntegratedCard from './IntegratedCard.js'
import { Container} from 'react-bootstrap';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
      <><Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'0 0 0 0'}}
      >
            <div className="w-100 div-main" style={{maxWidth:"400px" , padding:"20px"}}>
        <center><h4>INTEGRATIONS<AddCircleOutlineIcon className="switch-integration"/></h4></center>
        
      <IntegratedCard/><IntegrationCard />
      </div>
      </Container>
    </>
  );
}
