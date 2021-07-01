import React,{Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from 'react-particles-js';
import { Link , withRouter } from "react-router-dom";
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
class Confirm extends Component{
  constructor(props){  
    super(props); 
    this.state = {
      voterId : this.props.location.state.id,
      mobile : this.props.location.state.mobile,
      otp : '',
      reqId : ''
    }
    this.onConfirmSubmit = this.onConfirmSubmit.bind(this);
    this.onOtpChange  = this.onOtpChange.bind(this);
  }
  componentDidMount(){
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
          toast("OTP sent to registered Phone Number!");
        }else if(user === "no-reg"){
          toast.error("Number is not registered");
        }
        else{
          toast.error("Server error"); 
        }
    })
  }
   onOtpChange(event){
    this.setState({
      otp : event.target.value
    })
  }
 
  onConfirmSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/otpconfirm', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        pin: this.state.otp,
        requestId: this.state.reqId 
      })
    }).then(response => response.json())
    .then(user => {
      if(user === "set"){
        const vId = sessionStorage.getItem("voterId")
        this.props.history.push({ pathname: `/voter/${vId}`, state: { id : vId }});
        toast("Account verified! Login Successful🎉");
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
                <form class="for-box" onSubmit={this.onConfirmSubmit} >
                    <h2>Verify OTP</h2>
                    <p class="text-muted"> Please enter the OTP!</p>
                    <input class="for-inp" type="text" name="" placeholder="OTP" value={this.state.value} onChange={this.onOtpChange} required/> 
                    <input type="hidden" name="requestId" value="<%= requestId %>" onChange={this.onReqChange} />
                    <div class="other_option">
                     <input class="for-sub" type="submit" name="" value="Verify" />
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

export default withRouter(Confirm);