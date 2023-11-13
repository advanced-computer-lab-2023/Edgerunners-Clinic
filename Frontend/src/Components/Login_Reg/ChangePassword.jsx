import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import React, { useRef } from "react";
import axios from "axios";

function ChangePassword() {
    const passwordRef = useRef();
    const passwordConRef = useRef();
    function submitHandeler(event) {
        event.preventDefault();
        const usernameValue = sessionStorage.getItem("Username");
        const passwordValue = passwordRef.current.value;
        const passwordConValue = passwordConRef.current.value;
        const change = {
            Username: usernameValue,
            Password: passwordValue,
            confirmPassword: passwordConValue,
        };
        axios
            .put("http://localhost:3001/changePassword", change, {})
            .then((res) => {
                console.log(res);
                console.log("Password changed");
                passwordRef.current.value = "";
                passwordConRef.current.value = "";
                let type = sessionStorage.getItem("type");
                if (type === "Pharmacist") {
                    type = "Pharm";
                }
                window.location.href = `/${type}Home`;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <div className=" justify-center flex mt-20">
                <Card width='w-4/12' height=' h-[32rem]'>
                    <div className=" flex justify-center  mt-6 mb-0 ">
                        <a
                            onClick={() => {
                                let type = sessionStorage.getItem("type");
                                if (type === "Pharmacist") {
                                    type = "Pharm";
                                }
                                window.location.href = `/${type}Home`;
                            }}
                        ><Logo height='4rem' className="mt-6 mb-0" /></a>
                        <h1 className="text-2xl font-bold text-center text-sky-600 ml-0 mt-6">Change Password</h1>
                    </div >
                    <div className=" flex justify-center mt-7">

                        <form onSubmit={submitHandeler}>
                            <div className=" mt-3">
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold   font-SourceSansPro  text-gray-500  ml-2"> Enter New Password : </label>
                                    <br />
                                    <input type="password" id="password" ref={passwordRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" mb-4">
                                    <label className=" text-xl font-bold    font-SourceSansPro   text-gray-500 ml-2"> Confirm Password : </label>
                                    <br />
                                    <input type="password" id="passwordCon" ref={passwordConRef} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className=" flex justify-center  mt-6">
                                    <br />
                                    <br />
                                    <button className="  text-sky-600  outline  w-40  h-9  rounded-md   mt-5 shadow"> Confirm </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}


export default ChangePassword;