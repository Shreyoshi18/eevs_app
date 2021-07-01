import React,{Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from 'react-particles-js';
import { Link , withRouter  } from "react-router-dom";
import myPdf from './DEMO.pdf'
import './login.css';
const particlesopt = {
                particles: {
                  number:{
                    value:55,
                    density:{
                      enable: true,
                      value_area : 600
                    }
                  }
                  
                }
              }
class Login extends Component{
  constructor(props){  
    super(props); 
    this.state = {
      voterId : '',
      password : ''
    }
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onVoteridChange  = this.onVoteridChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }
  
  onVoteridChange(event){
    this.setState({
      voterId : event.target.value
    })
    
  }
  onPasswordChange(event){
    this.setState({
      password : event.target.value
    })
  }
  onLoginSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        voter_id: this.state.voterId,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        if (user[0].voter_id) {
          sessionStorage.setItem("voterId",this.state.voterId);
          console.log(sessionStorage.getItem("voterId"));
            this.props.history.push({ pathname: `/confirm`, state: { id : user[0].voter_id, mobile : user[0].contact_number }});
        }
        else if(user === "has-voted"){
          toast.error("You cannot enter as you have already voted");
        }
        else if(user === "wrong-pass"){
          toast.error("Incorrect password try again");
        }
        else{
          toast.error("Voter ID incorrect || You have not registered yet");
        }
    })
    console.log(this.state);

  }
  render(){
    return (
      <div class="container log-container">
      <Particles className="particles"
              params={particlesopt}
            />
      <div class="log-instructions" >
          <a href={myPdf} class="inst-manual" target="_blank" download="INSTRUCTION_MANUAL.pdf"><button class="btn btn2"><h6>Instruction Manual</h6></button></a>
      </div>
      <h1 class="log-heading">E-Election Voting System Login</h1>
    <div class="row">
        <div class="col-md-12">
            <div class="card log-card">
                <form class="log-box"  onSubmit={this.onLoginSubmit} >
                    <h2>Login</h2>
                    <p class="text-muted"> Please enter your Voter ID Number and password!</p> 
                    <input type="text" class="log-inp" name="" placeholder="Voter ID Number" value={this.state.value} onChange={this.onVoteridChange} required/> 
                    <input type="password" class="log-inp" name="" placeholder="Password" value={this.state.value} onChange={this.onPasswordChange} required/>
                    <div class="other_option">
                     <Link to="/forgot"><a class="forgot text-muted" href="#">Forgot password?</a></Link>
                     <Link to="/"><a class="forgot text-muted reg" href="#">Register</a></Link>
                     <input type="submit" class="log-sub"name="" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer />
</div>
    );
  }
}

export default withRouter(Login);
