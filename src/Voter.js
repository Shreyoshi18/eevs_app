import React,{Component} from 'react';
import Particles from 'react-particles-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , withRouter } from "react-router-dom";
import eci from "./eci.png";
import inc from "./inc.png";
import bjp from "./bjp.png";
import cpim from "./cpim.png";
import tmc from "./tmc.png";
import nota from "./nota.png";
import './voter.css';
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
class Voter extends Component{
  constructor(props){  
    super(props);  
    this.state = { 
        voterId : '',
        name : '',
        mobile : '',
        constituency : '',
         count : 0,
        
      }   
  } 
  
  componentDidMount(){
      if(sessionStorage.getItem("voterId")){
  
        window.history.pushState(null, null, this.props.location.href);
  window.onpopstate = function(event) {
    window.history.go(1);
  };
      
    fetch(`http://localhost:3000/voter/${sessionStorage.getItem("voterId")}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(user => {
        this.setState({
          voterId : sessionStorage.getItem("voterId"),
          name : user.voter_name,
          mobile : user.contact_number,
          constituency : user.constituency,
          count : user.has_voted
        })
    })
  }
  }
  handleVoting(party) {  
    fetch(`http://localhost:3000/voter/${this.state.voterId}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        choice : party  
      })
    }).then(response => response.json())
    .then(user => {
        if(user === "success") {
          console.log(user);
          toast("Thank you for casting your vote! " ,{autoClose: 10000});
          toast("अपना वोट डालने के लिए धन्यवाद!" ,{autoClose: 8000});
          toast("আপনার ভোট দেওয়ার জন্য আপনাকে ধন্যবাদ!" ,{autoClose: 8000} );
        }
        else{
          console.log(user);
          toast.error("Sorry You can cast your vote only once!", {autoClose: 10000});
          toast.error("क्षमा करें आप अपना वोट केवल एक बार ही डाल सकते हैं!", {autoClose: 8000});
          toast.error("দুঃখিত আপনি একবার আপনার ভোট দিতে পারেন!", {autoClose: 8000});
        }
    }).catch(err => console.log(err));
    
      
  }
  reset(){
    sessionStorage.removeItem("voterId");
    this.setState({
          ...this.state,
          voterId : '',
          name : '',
        mobile : '',
        constituency : '',
         count : 0,
        })
  }  
  render(){
    return (
      <div class="container vot-container">
      <Particles className="particles"
              params={particlesopt}
            />
      { (this.state.voterId === '' ) ? (
        <div>
        <h1>PLEASE LOGIN FIRST!!</h1>
        <Link to="/login"><button class="btn vot-btn2"><h4>LOGIN</h4></button></Link>
        </div>
        ) : (
      <div>
      <div class="vot-log-out" >
          <Link to="/login"><button class="btn btn2 a-logout" onClick={() => this.reset()}><h6>Log Out</h6></button></Link>
      </div>
      <img src={eci}  alt="eci" width="250" class="eci"/>
      <h1 class="vot-heading">Welcome to the Voting Page!! </h1>
      <h2>Session : 2021</h2>
      <div class="row voter-row">
        <div class="col-md-4 col1">
          <div class="user-info">
            <h4>Voter ID : {this.state.voterId}</h4>
            <h4>Name : {this.state.name}</h4>
            <h4>Phone Number : {this.state.mobile}</h4>
            <h4>Constituency : {this.state.constituency}</h4>
            </div>
        </div>
        <div class="col-md-1">
        </div>
        <div class="col-md-7  col2">
        <h4>Click on the party symbol of your choice!!</h4>
            <div class="row">
                <div class="col-md-6 col-sm-12 col-lg-6">
                <button class="btn1"  onClick={() => this.handleVoting("BJP")}> <img src={bjp}  alt="bjp" width="325" class="party-logo bjp"/></button>
                </div>
                <div class="col-md-6 col-sm-12 col-lg-6">
                <button class="btn1" onClick={() => this.handleVoting("AIC")}> <img src={inc}  alt="inc" width="325" class="party-logo inc"/></button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12 col-lg-6">
                <button class="btn1" onClick={() => this.handleVoting("AITMC")}> <img src={tmc}  alt="tmc" width="240" class="party-logo tmc"/></button>
                </div>
                <div class="col-md-6 col-sm-12 col-lg-6">
                <button class="btn1" onClick={() => this.handleVoting("CPIM")}> <img src={cpim}  alt="cpim" width="250" class="party-logo cpim"/></button>
                </div>
                
            </div>
            <div class="row row2">
                <div class="col-md-3 col-sm-12 col-lg-3">
                </div>
                <div class="col-md-6 col-sm-12 col-lg-6">
                <button class="btn1" onClick={() => this.handleVoting("NOTA")}> <img src={nota}  alt="nota" width="250" class="party-logo nota"/></button>
                </div>
                <div class="col-md-3 col-sm-12 col-lg-3">
                </div>
            </div>
        </div>
    </div>
    </div>
    )}
    <ToastContainer />
    </div>
    );
  }
}

export default withRouter(Voter);
