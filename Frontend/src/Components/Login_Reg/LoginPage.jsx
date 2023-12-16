import React, { Component } from "react";
import { useRef, useState } from "react";
import GenderInputSelect from "./GenderInputSelect";
import axios from "axios";
import ContractPage from "./contract";
import { GetSpecialities } from "../PatientHome/getDoctors";
class LoginPage extends Component {
  state = {
    isContainerActive: false,
    signUp_name: null,
    signUp_email: null,
    signUp_password: null,
    signUp_number: null,
    signUp_username: null,
    signIn_username: null,
    signIn_password: null,
    signUp_gender: null,
    success: false,
    error: false,
    errorPassword: false,
    enable: false,
    role: true,
    signUp_hourlyRate: null,
    file: null,
    Specialities: GetSpecialities(),
  };

  handleFileChange = (e) => {
    console.log("in handle file change ");
    if (e.target.files) {
      this.setState({ file: e.target.files[0] });
    }
  };

  handleUpload = async () => {
    console.log("in handle upload ");
    if (this.state.file) {
      const formData = new FormData();
      formData.append("Username", this.state.signUp_username);
      formData.append("Name", this.state.signUp_name);
      formData.append("Email", this.state.signUp_email);
      formData.append("Password", this.state.signUp_password);
      formData.append("DOB", this.state.signUp_DOB);
      formData.append("Hourlyrate", this.state.signUp_hourlyRate);
      formData.append("Affiliation", this.state.signUp_affiliation);
      formData.append("Education", this.state.signUp_education);
      formData.append("Speciality", this.state.signUp_speciality);
      formData.append("file", this.state.file);
      console.log(sessionStorage.getItem("Username"));
      try {
        const result = await fetch("http://localhost:3001/doctorUploadFile", {
          method: "POST",
          body: formData,
        });

        //const data = await result.json();

        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  passwordValidationP = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;

    if (passwordRegex.test(this.state.signUp_password)) {
      this.signUpPatient(e); // Call the signup function here or perform other actions
    } else {
      // Show error in the register page
      this.setState({ errorPassword: true, success: false });
    }
  };
  passwordValidationD = (e) => {
    console.log("in pass validation doc ");
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,}$/;
    if (passwordRegex.test(this.state.signUp_password)) {
      this.handleUpload();
      // Call the signup function here or perform other actions
    } else {
      // Show error in the register page
      this.setState({ errorPassword: true, success: false });
    }
  };
  signUpPatient = async (event) => {
    event.preventDefault();
    const newUser = {
      Username: this.state.signUp_username,
      Password: this.state.signUp_password,
      DOB: this.state.signUp_DOB,
      Gender: this.state.signUp_gender,
      phoneNumber: this.state.signUp_number,
      Name: this.state.signUp_name,
      Email: this.state.signUp_email,
      EmergencyContact: {
        FullnameEC: this.state.signUp_emergencyContactName,
        phoneNumberEC: this.state.signUp_emergencyContactNumber,
      },
    };
    console.log(newUser);

    await axios
      .post("http://localhost:3001/addPatient", newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ isContainerActive: false });
    this.setState({ errorPassword: false });
  };
  signUpDoctor = (event) => {
    console.log("in sign up doctor ");
    event.preventDefault();
    const newUser = {
      Username: this.state.signUp_username,
      Name: this.state.signUp_name,
      Email: this.state.signUp_email,
      Password: this.state.signUp_password,
      DOB: this.state.signUp_DOB,
      Hourlyrate: this.state.signUp_hourlyRate,
      Affiliation: this.state.signUp_affiliation,
      Education: this.state.signUp_education,
      Speciality: this.state.signUp_speciality,
    };
    console.log(newUser);

    axios
      .post("http://localhost:3001/doctorUploadFile", newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ isContainerActive: false });
    this.setState({ errorPassword: false });
  };
  signIn = async (event) => {
    event.preventDefault();
    const newUser = {
      Username: this.state.signIn_username,
      Password: this.state.signIn_password,
    };
    axios
      .post("http://localhost:3001/signin", {
        Username: newUser.Username,
        Password: newUser.Password,
      })
      .then((res) => {
        this.setState({ success: true });
        this.setState({ error: false });
        sessionStorage.setItem("Username", res.data.Username);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("type", res.data.type);
        let status = null;
        if (res.data.Status) {
          sessionStorage.setItem("Status", res.data.Status);
        }

        console.log(res);
        if (res.statusText == "OK") {
          if (sessionStorage.getItem("type") == "Patient") {
            window.location.replace("/PatientHome");
          } else if (sessionStorage.getItem("type") == "Doctor") {
            if (sessionStorage.getItem("Status") == "Accepted") {
              window.location.replace("/DoctorHome");
            } else if (sessionStorage.getItem("Status") == "Waiting") {
              this.setState({ enable: true });
            }
          } else {
            window.location.replace("/AdminHome");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
        this.setState({ success: false });
      });
  };
  render() {
    return (
      <div className="PatientReg">
        <div className="bodyClass">
          <div
            className={`container${
              this.state.isContainerActive ? " right-panel-active" : ""
            }`}
            id="container"
          >
            {this.state.role ? (
              //Patient Registeration
              <div className="form-container sign-up-container">
                <form action="">
                  <h1>Create Account</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span>or use your email for registration</span>
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_username: event.currentTarget.value,
                      });
                    }}
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({ signUp_name: event.currentTarget.value });
                    }}
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_email: event.currentTarget.value,
                      });
                    }}
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_password: event.currentTarget.value,
                      });
                    }}
                    type="password"
                    placeholder="Password"
                  />
                  <GenderInputSelect
                    onChange={(event) => {
                      this.setState({
                        signUp_gender: event.currentTarget.value,
                      });
                    }}
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_number: event.currentTarget.value,
                      });
                    }}
                    type="number"
                    placeholder="Phone Number"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({ signUp_DOB: event.currentTarget.value });
                    }}
                    type="date"
                    placeholder="Date Of Birth"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_emergencyContactName: event.currentTarget.value,
                      });
                    }}
                    type="text"
                    placeholder="Emergency Contact Name"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_emergencyContactNumber:
                          event.currentTarget.value,
                      });
                    }}
                    type="number"
                    placeholder="Emergency Contact Number"
                  />
                  <button onClick={this.passwordValidationP}> Sign Up</button>
                </form>
              </div>
            ) : (
              //Doctor Registeration
              <div className="form-container sign-up-container">
                <form action="">
                  <h1>Create Account</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span>or use your email for registration</span>
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_username: event.currentTarget.value,
                      });
                    }}
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({ signUp_name: event.currentTarget.value });
                    }}
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_email: event.currentTarget.value,
                      });
                    }}
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_password: event.currentTarget.value,
                      });
                    }}
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_hourlyRate: event.currentTarget.value,
                      });
                    }}
                    type="number"
                    placeholder="Hourly Rate"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({ signUp_DOB: event.currentTarget.value });
                    }}
                    type="date"
                    placeholder="Date Of Birth"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_affiliation: event.currentTarget.value,
                      });
                    }}
                    type="text"
                    placeholder="Affiliation"
                  />
                  <input
                    onChange={(event) => {
                      this.setState({
                        signUp_education: event.currentTarget.value,
                      });
                    }}
                    type="text"
                    placeholder="Education"
                  />

                  <select
                    onChange={(event) => {
                      this.setState({
                        signUp_speciality: event.currentTarget.value,
                      });
                    }}
                  >
                    <option value="">Select Speciality</option>
                    {this.state.Specialities.map((speciality, index) => {
                      return (
                        <option key={index} value={speciality}>
                          {speciality}
                        </option>
                      );
                    })}
                  </select>
                  <div className="input-group">
                    <label htmlFor="file" className="sr-only">
                      Choose a file
                    </label>
                    <input
                      id="file"
                      type="file"
                      onChange={this.handleFileChange}
                    />
                  </div>
                  {this.state.file && (
                    <button
                      onClick={(e) => {
                        this.passwordValidationD(e);
                      }}
                      className="submit"
                    >
                      Sign Up
                    </button>
                  )}

                  {/* <button onClick = {this.handleUpload}> Sign Up</button> */}
                </form>
              </div>
            )}
            <div className="form-container sign-in-container">
              <img className="raya-img" alt="" />
              <form action="">
                <h1>Sign in</h1>
                <div className="social-container">
                  <a href="/patientHome" className="social">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your account</span>
                <input
                  onChange={(event) => {
                    this.setState({
                      signIn_username: event.currentTarget.value,
                    });
                  }}
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(event) => {
                    this.setState({
                      signIn_password: event.currentTarget.value,
                    });
                  }}
                  type="password"
                  placeholder="Password"
                />
                <a href="/ResetPass">Forgot your password?</a>
                {this.state.success && (
                  <div className="bg-green-500 text-white p-2 rounded-md mb-4">
                    Login successful
                  </div>
                )}
                {this.state.error && (
                  <div className="bg-red-500 text-white p-2 rounded-md mb-4">
                    Invalid username or password
                  </div>
                )}
                <button onClick={this.signIn}>Sign In</button>
                <ContractPage enable={this.state.enable} />
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    details
                  </p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => this.setState({ isContainerActive: false })}
                  >
                    Sign In
                  </button>
                  {this.state.errorPassword && (
                    <div
                      className="bg-red-500 text-white p-2 rounded-md mb-4"
                      style={{ marginTop: "10px" }}
                    >
                      Please Write a Valid Password
                    </div>
                  )}
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hi There!</h1>
                  <p>Enter your personal details to open an account with us</p>
                  <button
                    className="ghost"
                    style={{ marginBottom: "10px" }}
                    id="signUp"
                    onClick={() => {
                      this.setState({ role: true });
                      this.setState({ isContainerActive: true });
                    }}
                  >
                    Sign Up as a Patient
                  </button>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={() => {
                      this.setState({ role: false });
                      this.setState({ isContainerActive: true });
                    }}
                  >
                    Sign Up as a Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
