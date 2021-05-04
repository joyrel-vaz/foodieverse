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
import NavigationBar from './Navbar'
import Recipes from './Recipe'
import Home from './Home'
import Settings from './Settings'
import Footer from './Footer'
import Help from './Help'
import Demo from './Demo'
import Surprise from './Surprise'
import './App.css';
import Feedback from './Feedback'
import Payments from './Payments'
import AboutUs from './AboutUs'
import MealPlanner from './MealPlanner'
import LoginError from './LoginError'
import RecipeFullPage from './RecipeFullPage'
import MyFavorites from './MyFavorites';
import Foodium from './Foodium'
import ContactUs from './ContactUs'
import Integration from './Integration'

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
              <Route path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/shopping-list" component={ShoppingList} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/login-error" component={LoginError} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/home-remedies/:a_category/:a_name" component={HomeRemedies}/>
              <Route path="/home-remedies/:a_category" component={AilmentList}/>
              <Route path="/home-remedies" component={AilmentCategory}/>
              <Route exact path="/recipes" component={Recipes}/>
              <PrivateRoute path="/settings" component={Settings}/>
              <Route path="/help" component={Help}/>
              <Route path="/demo" component={Demo}/>
              <Route path="/feedback" component={Feedback}/>
              <Route path="/payments" component={Payments}/>
              <Route path="/aboutus" component={AboutUs}/>
              <PrivateRoute path="/surprise" component={Surprise}/>
              <PrivateRoute path="/mealPlanner" component={MealPlanner}/>
              <Route path='/recipefull' component={RecipeFullPage}/>
              <Route path='/foodium' component={Foodium}/>
              <Route path='/contact' component={ContactUs}/>
              <PrivateRoute path='/favorites' component={MyFavorites}/>
              <Route path='/integrations' component={Integration}/>
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
