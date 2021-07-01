import React,{Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from 'react-particles-js';
import { Link , withRouter } from "react-router-dom";
import myPdf from './DEMO.pdf'
import './reg.css';
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
class Register extends Component{
  constructor(props){  
    super(props); 
    this.state = {
      voterId : '',
      name : '',
      mobile : '',
      password : '',
      repass : ''
    }
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onVoteridChange  = this.onVoteridChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRepassChange = this.onRepassChange.bind(this);
    this.onNameChange  = this.onNameChange.bind(this);
    this.onMobileChange = this.onMobileChange.bind(this);
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
   onRepassChange(event){
    this.setState({
      repass : event.target.value
    })
  }
  onNameChange  (event){
    this.setState({
      name : event.target.value
    })
  }
  onMobileChange(event){
    let temp = "91" + event.target.value
    this.setState({
      mobile : temp
    })
  }
  onRegisterSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        voter_id: this.state.voterId,
        password: this.state.password,
        name: this.state.name,
        contact_number: this.state.mobile,
        repassword: this.state.repass
      })
    })
    .then(response => response.json())
    .then(user => {
        if (user === "success") {
            console.log(user);
            this.props.history.push("/login");
            toast("Registration Successfull!");
        }
        else if(user==="no-reg"){
          toast.error("No such registered voter retry with valid values");
        }
        else if(user === "already-reg"){
          toast.error("You are already registered");
        }
        else if(user==="wrong-num"){
          toast.error("Entered Number is not linked with the entered Voter ID");
        }
        else{
          toast.error("The re-entered password doesnt match the original password");
        }
    })
    console.log(this.state);

  }
  render(){
    return (
      <div class="container reg-container">
      <Particles className="particles"
              params={particlesopt}
            />
      <div class="reg-instructions" >
        <a href={myPdf} class="inst-manual" target="_blank" download="INSTRUCTION_MANUAL.pdf"><button class="btn btn2"><h6>Instruction Manual</h6></button></a>
      </div>
      <h1 class="reg-heading">E-Election Voting System New User Registration</h1>
    <div class="row">
        <div class="col-md-12">
            <div class="card reg-card">
                <form class="reg-box" onSubmit={this.onRegisterSubmit}>
                    <h2>Register</h2>
                    <p class="text-muted"> Please enter the following details!</p> 
                    <input type="text" class="reg-inp" name="" placeholder="Name" value={this.state.value} onChange={this.onNameChange} required/> 
                    <input type="tel" class="reg-inp" name="" placeholder="Mobile Number" pattern="[0-9]{10}" value={this.state.value} onChange={this.onMobileChange} required/> 
                    <input type="text" class="reg-inp" name="" placeholder="Voter ID Number" value={this.state.value} onChange={this.onVoteridChange} required/> 
                    <input type="password" class="reg-inp" name="" placeholder="Password" minlength="8" maxlength="15" value={this.state.value} onChange={this.onPasswordChange} required/>
                    <input type="password" class="reg-inp" name="" placeholder="Re-Enter Password"  minlength="8" maxlength="15" value={this.state.value} onChange={this.onRepassChange} required/>
                    <div class="other_option">
                     <Link to="/login"><a class="forgot text-muted " href="#">Login</a></Link>
                     <input type="submit" class="reg-sub" name="" value="Register" />
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

export default Register;
