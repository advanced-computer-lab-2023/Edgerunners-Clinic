import axios from "axios";
import Logo from "../../UI/UX/Logo";
import { useState, useEffect } from "react";
import Card from "../../UI/UX/Card";

function ViewAndUNSubToAHealthPackage() {
  const username = sessionStorage.getItem("Username");
  const [MyPackage, setMyPackage] = useState(null);
  const [MyFamily, setMyFamily] = useState([]);
  const p = { patientUsername: username };

  useEffect(() => {
    console.log(p);
    axios
      .get("http://localhost:3001/viewStatusforMyself", {
        params: { patientUsername: username },
      })
      .then((response) => {
        if (response.data) {
          setMyPackage(response.data);
          console.log(MyPackage);
        } else {
          setMyPackage([]); // Set to null if there is no linked account
        }
      })
      .catch((error) => {
        console.error("Error fetching data for myself:", error);
      });

    axios
      .get("http://localhost:3001/viewStatusForMyFamilyMember", {
        params: { patientUsername: username },
      })
      .then((response) => {
        if (response.data) {
          setMyFamily(response.data);
        } else {
          setMyFamily([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data for family members:", error);
      });
  }, [username]);

  let myPackageStatus = "";
  if (MyPackage !== null) {
    const today = new Date();
    const packageEndDate = new Date(MyPackage.EndDate);
    if (MyPackage.Renewal) {
      myPackageStatus = MyPackage.Status;
    } else {
      if (today < packageEndDate) {
        myPackageStatus = "Cancelled until " + packageEndDate.toDateString();
      } else {
        myPackageStatus = "Unsubscribed";
      }
    }
  }

  const handleUnsubscribe = () => {
    axios.put("http://localhost:3001/Cancelsubscription", p);
  };
  const handleUnsubscribeF = (Username) => {
    axios.put("http://localhost:3001/Cancelsubscription", {
      patientUsername: Username,
    });
  };
  console.log(MyFamily.length);
  return (
    <div className=" mb-4 justify-center flex">
      <a href="/PatientHome">
        <Logo />
      </a>
      {MyPackage !== null && (
        <Card className=" w-44 h-14">
          <h1>My Package Details</h1>
          <body>
            Name: {MyPackage.PackageName}
            <br />
            Status: {myPackageStatus}
            <br />
            discountDoctor: {MyPackage.discountDoctor}, discountMedicin:{" "}
            {MyPackage.discountMedicin}
            <br />
            discountFamily: {MyPackage.discountFamily}
          </body>
          <button onClick={handleUnsubscribe}>Cancel</button>
        </Card>
      )}

      {(MyFamily !== undefined || MyFamily.length !== 0) &&
        MyFamily.map((f, index) => {
          let familyMemberStatus = "";
          const today = new Date();
          const familyPackageEndDate = new Date(f.EndDate);
          console.log(f.Renewal);
          if (f.Renewal) {
            familyMemberStatus = f.Status;
          } else {
            if (today < familyPackageEndDate) {
              familyMemberStatus =
                "Cancelled until " + familyPackageEndDate.toDateString();
            } else {
              familyMemberStatus = "Unsubscribed";
            }
          }

          return (
            <Card key={index} className="w-44 h-14 mt-3">
              <h1>My Family Details</h1>
              <body>
                Username: {f.username}
                <br />
                Name: {f.PackageName}
                <br />
                Status: {familyMemberStatus}
                <br />
                discountDoctor: {f.discountDoctor}, discountMedicin:{" "}
                {f.discountMedicin}
                <br />
                discountFamily: {f.discountFamily}
              </body>
              <button onClick={() => handleUnsubscribeF(f.username)}>
                Cancel
              </button>
            </Card>
          );
        })}
    </div>
  );
}

export default ViewAndUNSubToAHealthPackage;
