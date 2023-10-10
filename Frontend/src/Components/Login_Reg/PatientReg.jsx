import React, { Component } from 'react';
import {useRef, useState} from 'react';
import GenderInputSelect from './GenderInputSelect';
import axios from 'axios';

class PatientReg extends Component{
	state ={
		isContainerActive : false,
		signUp_name : null,
		signUp_email : null,
		signUp_password : null,
		signUp_number:null,
		signIn_username : null,
		signIn_password : null,
		signUp_gender:null,
	};
	signUp= (event) =>{ 
		const newUser = {
			Username : this.state.signUp_username,
			Password : this.state.signUp_password,
			DOB : this.state.signUp_DOB,
			Gender : this.state.signUp_gender,
			phoneNumber : this.state.signUp_number,
			Name : this.state.signUp_name,
			Email : this.state.signUp_email,
			EmergencyContact: {
				FullnameEC: this.state.signUp_emergencyContactName,
				phoneNumberEC: this.state.signUp_emergencyContactNumber
			}
		}
			console.log(newUser);

			axios.post('http://localhost:3001/addPatient', newUser)
			.then(res => {
			  console.log(res)
			}).catch(err =>{
			  console.log(err)
			})
	}

	signIn = async (event) =>{
		const newUser = {
			Username : this.state.signIn_username,
			Password : this.state.signIn_password,
		}
		axios.post('http://localhost:3001/signin', {Username : newUser.Username , Password: newUser.Password})
			.then(res => {
				sessionStorage.setItem('Username', res.data.Username);
				sessionStorage.setItem('token',  res.data.token);
				sessionStorage.setItem('type',  res.data.type);
			  	console.log(res)
			}).catch(err =>{
			  console.log(err)
			})
		
	}
render(){
	return(
        <div className ='PatientReg'>
            <body>

<div className={`container${this.state.isContainerActive ? " right-panel-active" : ""}`} id="container">
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input onChange = {(event)=>{this.setState({signUp_username : event.currentTarget.value}) }} type="text" placeholder="Username" />
			<input onChange = {(event)=>{this.setState({signUp_name : event.currentTarget.value})}} type="text" placeholder="Name" />
			<input onChange = {(event)=>{this.setState({signUp_email : event.currentTarget.value})}} type="email" placeholder="Email" />
			<input onChange = {(event)=>{this.setState({signUp_password : event.currentTarget.value})}} type="password" placeholder="Password" />
			<GenderInputSelect  onChange = {(event)=>{this.setState({signUp_gender : event.currentTarget.value})}}/>
			<input onChange = {(event)=>{this.setState({signUp_number : event.currentTarget.value})}} type="number" placeholder="Phone Number" />
			<input onChange = {(event)=>{this.setState({signUp_DOB : event.currentTarget.value})}} type="date" placeholder="Date Of Birth" />
			<input onChange = {(event)=>{this.setState({signUp_emergencyContactName : event.currentTarget.value})}} type="text" placeholder="Emergency Contact Name" />
			<input onChange = {(event)=>{this.setState({signUp_emergencyContactNumber : event.currentTarget.value})}} type="number" placeholder="Emergency Contact Number" />
			<button onClick = {this.signUp}> Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
    <img class="raya-img" alt=""/>
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input onChange = {(event)=>{this.setState({signIn_username : event.currentTarget.value}) }} type="text" placeholder="Username" />
			<input onChange = {(event)=>{this.setState({signIn_password : event.currentTarget.value}) }} type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button onClick = 
			{this.signIn}>
			Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal details</p>
				<button class="ghost" id="signIn" onClick = {()=> this.setState({isContainerActive: false})}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hi There!</h1>
				<p>Enter your personal details to open an account with us</p>
				<button class="ghost" id="signUp"  onClick = {()=> this.setState({isContainerActive: true})}>Sign Up</button>
		    </div>
	    </div>
    </div>
</div>

</body>
        </div>
    );

}
}
export default PatientReg;