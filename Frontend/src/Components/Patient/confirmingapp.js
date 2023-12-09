import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const sendEmail = ({ patientUserName, message, patientEmail }) => {
  
  emailjs.send('service_9hvgjvp', 'template_4rumpw7', {
    patientUserName,
    message,
     patientEmail,
  }, '8xcmoOBw3G1Xkvd5d')
    .then((result) => {
        console.log(result.text);
        
    })
    .catch((error) => {
        console.log(error.text);
        
    });
};
export default sendEmail;