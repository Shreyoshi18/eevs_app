import React,{Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from 'react-particles-js';
import { Link } from "react-router-dom";
import './forgot.css';
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
class Forgot extends Component{
  constructor(props){  
    super(props); 
    this.state = {
      mobile : '',
      otp : '',
      reqId : '',
      password : '',
      repass : ''
    }
    this.onForgotSubmit = this.onForgotSubmit.bind(this);
    this.onSendSubmit = this.onSendSubmit.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRepassChange = this.onRepassChange.bind(this);
    this.onOtpChange  = this.onOtpChange.bind(this);
    this.onReqChange  = this.onReqChange .bind(this);
    this.onMobileChange = this.onMobileChange.bind(this);
  }
   onOtpChange(event){
    this.setState({
      otp : event.target.value
    })
  }
  onReqChange(event){
    this.setState({
      reqId  : event.target.value
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
  onMobileChange(event){
    let temp = "91" + event.target.value
    this.setState({
      mobile : temp
    })
  }
  onSendSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/forgot', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        number: this.state.mobile
      })
    }).then(response => response.json())
    .then(user => {
        if(user.request_id){
          console.log("id "+user.request_id);
          this.setState({
            reqId : user.request_id
          })
          toast("OTP sent successfully!");
        }else if(user === "no-reg"){
          toast.error("Number is not registered");
        }
        else{
          toast.error("Server error"); 
        }
    })
  }
  onForgotSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/confirm', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phoneNumber : this.state.mobile,
        pin: this.state.otp,
        password: this.state.password,
        repassword: this.state.repass,
        requestId: this.state.reqId 
      })
    }).then(response => response.json())
    .then(user => {
      if(user === "set"){
        this.props.history.push("/login");
        toast("Account verified! and password has been reset🎉");
      }else{
        toast.error("Wrong OTP retry");
      }

    })
  }
  render(){
    return (
      <div class="container for-container">
      <Particles className="particles"
              params={particlesopt}
            />
      <h1>E-Election Voting System </h1>
    <div class="row">
        <div class="col-md-12">
            <div class="card for-card">
                <form class="for-box" onSubmit={this.onForgotSubmit} >
                    <h2>Forgot Password</h2>
                    <p class="text-muted"> Please enter the required details!</p>
                    <input  class="for-inp" type="tel" name="" placeholder="Mobile Number" pattern="[0-9]{10}" value={this.state.value} onChange={this.onMobileChange} required/> 
                    <button class="otp-button" onClick={this.onSendSubmit}>Send OTP</button>
                    <input class="for-inp" type="text" name="" placeholder="OTP" value={this.state.value} onChange={this.onOtpChange} required/> 
                    <input type="hidden" name="requestId" value="<%= requestId %>" />
                    <input class="for-inp" type="password" name=""  minlength="8" maxlength="15" placeholder="New Password" value={this.state.value} onChange={this.onPasswordChange} required/>
                    <input class="for-inp" type="password" name=""  minlength="8" maxlength="15" placeholder="Re-Enter New Password" value={this.state.value} onChange={this.onRepassChange} required/>
                    <div class="other_option">
                     <Link to="/login"><a class="forgot text-muted" href="#">Login</a></Link>
                     <input class="for-sub" type="submit" name="" value="Submit" />
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

export default Forgot;
