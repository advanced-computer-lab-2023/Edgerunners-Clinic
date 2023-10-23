import React, { useMemo, useState } from "react";
import emailjs from "emailjs-com";

export default function ResetPass() {
  const [Email, setEmail] = useState();
  const final1 = useMemo(() => {
    return Math.floor(Math.random() * 900) + 100;
  }, []);
  const final2 = useMemo(() => {
    return Math.floor(Math.random() * 900) + 100;
  }, []);
  const [OTP, setOTP] = useState(false);
  const [Intial, setIntial] = useState(true);
  const [UserInput, SetUserInput] = useState(["", "", "", "", "", ""]);
  const [Verified, setVerified] = useState(false);
  const handleVerify = () => {
    const res1 = UserInput[0] + UserInput[1] + UserInput[2];
    const res2 = UserInput[3] + UserInput[4] + UserInput[5];
    if (parseInt(res1) === final1 && parseInt(res2) === final2) {
      setVerified(true);
      setOTP(false);
    }
  };
  const handleInputChange = (e, index) => {
    const final = [...UserInput];
    final[index] = e.target.value;
    SetUserInput(final);
  };
  const handle = async () => {
    // emailjs.send(
    //   "service_bow4wjw",
    //   "template_1p4aore",
    //   {
    //     name: "my pookie bear",
    //     message: `your OTP is ${final1}-${final2}`,
    //     reciever: Email,
    //   },
    //   "EDcsSrK17MRIgCsU9"
    // );
    setIntial(false);
    setOTP(true);
  };
  return (
    <div>
      {OTP && (
        <>
          {UserInput.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
          <br />
          <button onClick={handleVerify}>verify</button>
        </>
      )}
      {Intial && (
        <>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handle}>reset password</button>
        </>
      )}
      {Verified && (
        <>
          <input type="text" placeholder="enter your new password" />
        </>
      )}
    </div>
  );
}
