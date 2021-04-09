import { useAuth } from '../Contexts/AuthContext'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'


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
  const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogOut(){
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch(error){
            setError(error.message)
        }

    }

  return (
      <>{currentUser ?
        <div>
                {currentUser.emailVerified ?
                    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'0 0 0 0'}}
                    >
                         <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
                      <center><h4>BIG SURPRISE COMING SOON!</h4>
                    </center>
                    </div>
                    </Container>
                :
                <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'0 0 0 0'}}
                >
                     <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
                  <center><h4>PLEASE VERIFY YOUR EMAIL TO ACCESS THIS FEATURE!</h4></center>
                </div>
                </Container>
                }
            </div>
        :
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh", padding:'0 0 0 0'}}
        >
             <div className="w-100" style={{maxWidth:"400px" , padding:"20px"}}>
          <center><h4>PLEASE <Link to="/Login" className="navR">LOGIN</Link> TO ACCESS THIS FEATURE!</h4></center>
        </div>
        </Container>
        }
    </>
  );
}
