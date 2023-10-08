import React, { Component } from 'react';
import {useRef, useState} from 'react';
import GenderInputSelect from './GenderInputSelect';
import axios from 'axios';

class DoctorReg extends Component{
	state ={
		isContainerActive : false,
		signUp_name : null,
		signUp_email : null,
		signUp_password : null,
		signUp_hourlyRate:null,
		signIn_username : null,
		signIn_password : null,
		signUp_gender:null,
	};
	signUp= (event) =>{ 
		const newUser = {
			Username : this.state.signUp_username,
            Name : this.state.signUp_name,
            Email : this.state.signUp_email,
			Password : this.state.signUp_password,
			DOB : this.state.signUp_DOB,
			Hourlyrate: this.state.signUp_hourlyRate,
			Affiliation : this.state.signUp_affiliation,
            Education : this.state.signUp_education
		}
			console.log(newUser);

			axios.post('http://localhost:3001/addDoctor', newUser)
			.then(res => {
			  console.log(res)
			}).catch(err =>{
			  console.log(err)
			})
	}

	signIn = async (event) =>{
		
		 axios.get('http://localhost:3001/getdoctor')
		.then( response => {
		  const patientsObject = response.data.data;
			let patient =false;
		  // Assuming you have a specific username and password you want to search for
		  const usernameToFind = this.state.signIn_username;
		  const passwordToFind = this.state.signIn_password;
			
			console.log(this.state.signIn_password)
			console.log(response.data.data);
			for (let i = 0; i <  patientsObject.length ; i++) {
				console.log(patientsObject[i])
				if (
					patientsObject[i].Username === usernameToFind &&
					patientsObject[i].Password === passwordToFind
				) {
				  patient = true;
				  break;
				}
			}
	  
		  if (patient) {
			// Successfully found the patient, you can now proceed with the login
			console.log('Login successful');
		  } else {
			// Patient not found or incorrect credentials
			console.log('Login failed');
		  }
		})
		.catch(error => {
		  console.error(error);
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
			<input onChange = {(event)=>{this.setState({signUp_hourlyRate : event.currentTarget.value})}} type="number" placeholder="Hourly Rate" />
			<input onChange = {(event)=>{this.setState({signUp_DOB : event.currentTarget.value})}} type="date" placeholder="Date Of Birth" />
			<input onChange = {(event)=>{this.setState({signUp_affiliation : event.currentTarget.value})}} type="text" placeholder="Affiliation" />
			<input onChange = {(event)=>{this.setState({signUp_education : event.currentTarget.value})}} type="text" placeholder="Education" />
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
			<button onClick = {this.signIn}>Sign In</button>
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
export default DoctorReg;