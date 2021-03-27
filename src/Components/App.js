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
import Home from './Home'
import Footer from './Footer'
import './App.css';


function App() {
  
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}
    >
      <div className="home-edits" >
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/" component={Dashboard} /> */}
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/shopping-list" component={ShoppingList} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/home-remedies/:a_category/:a_name" component={HomeRemedies}/>
              <Route path="/home-remedies/:a_category" component={AilmentList}/>
              <Route path="/home-remedies" component={AilmentCategory}/>
              <Route exact path="/recipes" component={RecipePage}/>
            </Switch>
          </AuthProvider>
        </Router>        
      </div>
    </Container>
    <Footer></Footer>
    </React.Fragment>
   
  );
}

export default App;
