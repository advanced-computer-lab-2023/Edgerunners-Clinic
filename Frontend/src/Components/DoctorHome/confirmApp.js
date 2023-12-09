import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import emailjs from '@emailjs/browser';


const sendEmail = ({ DocrorUserName, message, doctorEmail }) => {
  
  emailjs.send('service_9hvgjvp', 'template_usfz9ix', {
    DocrorUserName,
    message,
     doctorEmail,
  }, '8xcmoOBw3G1Xkvd5d')
    .then((result) => {
        console.log(result.text);
        
    })
    .catch((error) => {
        console.log(error.text);
        
    });
};
export default sendEmail;