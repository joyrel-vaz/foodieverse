import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../Contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import ShoppingList from './ShoppingList'
import AilmentList from './AilmentList'
import AilmentCategory from './AilmentCategory'
import HomeRemedies from './HomeRemedies'
import NavigationBar from './NavBar'
import RecipePage from './Recipe'


function App() {
  
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}
    >
      <div className="w-100" style={{maxWidth:"400px", padding:"20px"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/shopping-list" component={ShoppingList} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/home-remedies/:a_category/:a_name" component={HomeRemedies}/>
              <Route path="/home-remedies/:a_category" component={AilmentList}/>
              <Route path="/home-remedies" component={AilmentCategory}/>
              <Route path="/recipes" component={RecipePage}/>
            </Switch>
          </AuthProvider>
        </Router>        
      </div>
    </Container>
    </React.Fragment>
   
  );
}

export default App;
