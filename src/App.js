import React,{Component} from 'react';
import Login from './Login';
import Forgot from './Forgot';
import Confirm from './Confirm';
import Register from './Register';
import Voter from './Voter';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import './App.css';

class App extends Component{
  render(){
    return (
  	<Router>
	    <div className="App">
	      <Route path="/voter/:id" exact component={Voter} />
	      <Route path="/confirm" exact component={Confirm} />
	      <Route path="/login" component={Login} />
	      <Route path="/" exact component={Register} />
	      <Route path="/forgot" component={Forgot} />
	      <footer>
          <div class="footer">
            <h6 className="star">&copy; 2021 All Rights Reserved E-Election Voting System</h6>
          </div>
      </footer>
	    </div>
	</Router>
  );
}
}


export default App;
