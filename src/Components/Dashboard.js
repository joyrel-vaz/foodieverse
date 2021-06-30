import React, { useState } from 'react'
import { makeStyles} from '@material-ui/core/styles';
import { Card, Alert, Row, Col, Button } from 'react-bootstrap'
import {  NavItem, NavLink} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddRecipe from './AddRecipe';
import RecipeCarousel from './RecipeCarousel'


const columns = [
    { id: 'name', label: 'Recipe Name', minWidth: 170 },
    {
      id: 'procedure',
      label: 'Procedure',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'uploaddate',
      label: 'Date of Uploading',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'comments',
      label: 'Comments',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, procedure, uploaddate, comments) {
    return { name, procedure, uploaddate, comments };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

export function LoginButton() {
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
    <>
      {console.log(error)}
{/*   
      {currentUser?
          <Button onclick={handleLogOut}>Log Out</Button>
      :
        <NavItem className="nav-item-n right-nav l-n">
          <NavLink href="/Login">Login</NavLink>
        </NavItem>
      } */}
    </>
    );
  }

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    depositContext: {
      flex: 1,
    },
  });
  
  function preventDefault(event) {
    event.preventDefault();
  }

export default function Dashboard() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

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
        <>
        <Card>
            <LoginButton/>
        </Card>
        <br></br>
        <Card className="no-click">
            <Card.Body>
                {currentUser ?
                <div>
                    <div className="text-center mb-4" >
                        {error && <Alert variant="danger">{error}</Alert>}
                        <h2 className="mb-2">Hello {currentUser.displayName}!</h2>
                        <strong>Email:</strong> {currentUser.email}

                        {currentUser.emailVerified ?
                        <>
                         <Button className="SendBtn right-align" onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                                    <br/>
                            <Col>
                            <center>
                                <Row className="d-flex justify-content-around mt-2">
                                    <Link to="/update-profile" className="btn SendBtn btnpadd">Update Profile</Link>
                                    <AddRecipe/>
                                    <Link to="/shopping-list" className="btn SendBtn btnpadd">Shopping List</Link>
                                </Row>
                            </center>
                            </Col>
                            <h2 className="title-dash">My Recipes</h2>
                                <RecipeCarousel/>
                            <h2 className="title-dash">My Favourites</h2>
                                <RecipeCarousel/>
                            <h2 className="title-dash">Pending Approvals</h2>
                            <Paper elevation={3}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      {columns.map((column) => (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                          style={{ minWidth: column.minWidth }}
                                        >
                                          {column.label}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                      return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                          {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                              <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                              </TableCell>
                                            );
                                          })}
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                              />
                            </Paper>        
                            </>
                        :
                            <div className="text-center mt-3" >
                                <Alert variant="danger">
                                    <strong>User Not Verified</strong>
                                    <br></br>
                                    Please verify email to avail features. Refresh page if verification has been completed.
                                </Alert>
                                    <Button className="SendBtn" onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="text-center" >
                    <h2 className="mb-2">User Not Logged In</h2>
                    <Link to="/login" className="btn SendBtn">Log In</Link>
                </div>
                }
                
            </Card.Body>
        </Card>    
        
        </>
    )
}
