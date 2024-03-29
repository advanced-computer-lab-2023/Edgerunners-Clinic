import React, { Component } from 'react';
import {useRef, useState} from 'react';


class Body extends Component{
constructor(props){
	super(props);
	this.state = {
	isContainerActive : false,
	signUp_name : null,
	signUp_email : null,
	signUp_password : null,
	signUp_number:null,

	signIn_email : null,
	signIn_password : null
	};
}



render(){

return(
        <div>
            <body>

<div className={`container${this.state.isContainerActive ? " right-panel-active" : ""}`} id="container">
	<div className="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input onChange = {(event)=>{this.state.signUp_name = event.currentTarget.value;}} type="text" placeholder="Name" />
			<input onChange = {(event)=>{this.state.signUp_email = event.currentTarget.value;}} type="email" placeholder="Email" />
			<input onChange = {(event)=>{this.state.signUp_password = event.currentTarget.value;}} type="password" placeholder="Password" />
			<input className = "PhoneNumber" onChange = {(event)=>{this.state.signUp_number = event.currentTarget.value;}} type="number" placeholder="Phone Number" />
			<button > Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
    <img className="raya-img"src="rsz_download_1.png" alt=""/>
		<form action="#">
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input onChange = {(event)=>{this.state.signIn_email = event.currentTarget.value;}} type="email" placeholder="Email" />
			<input onChange = {(event)=>{this.state.signIn_password = event.currentTarget.value;}} type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button >Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal details</p>
				<button className="ghost" id="signIn" onClick = {()=> this.setState({isContainerActive: false})}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hi There!</h1>
				<p>Enter your personal details to open an account with us</p>
				<button className="ghost" id="signUp"  onClick = {()=> this.setState({isContainerActive: true})}>Sign Up</button>
		    </div>
	    </div>
    </div>
</div>

</body>
        </div>
    );

}
}
export default Body;