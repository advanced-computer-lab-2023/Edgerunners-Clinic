import axios from "axios";
import Logo from "../../UI/UX/Logo";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/UX/Card";
import Footer from "./Footer";
import MyWalletP from "./MyWalletP";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../PatientHome/FilterModal";

function ViewAndUNSubToAHealthPackage() {
  const username = sessionStorage.getItem("Username");
  const [MyPackage, setMyPackage] = useState(null);
  const [MyFamily, setMyFamily] = useState([]);
  const [WalletModal, setWalletModal] = useState(false);
  const p = { patientUsername: username };

  useEffect(() => {
    console.log(p);
    axios
      .get("http://localhost:3005/viewStatusforMyself", {
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
      .get("http://localhost:3005/viewStatusForMyFamilyMember", {
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
    axios.put("http://localhost:3005/Cancelsubscription", p);
  };
  const handleUnsubscribeF = (Username) => {
    axios.put("http://localhost:3005/Cancelsubscription", {
      patientUsername: Username,
    });
  };
  console.log(MyFamily.length);
  return (
    <div className="Bootstrap PatientHome">
      <div style={{ position: 'sticky', top: 0 }} className="header">
        <nav style={{ position: 'relative' }} className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <Link to="/PatientHome" className="logo-link">
              <Logo />
              <span className="clinicText">El-7a2ny Clinic</span>
            </Link>

            <button
              className="navbar-toggler ps-0"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon d-flex justify-content-start align-items-center">
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div className="navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#pets">
                    Video Call
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#adoptions">
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/myAppointments"
                  >
                    My Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/viewPackage"
                  >
                    My Subscriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/Prescriptions"
                  >
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => setWalletModal(true)}
                  >
                    My Wallet
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/changePassword"
                  >
                    Change password
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      sessionStorage.removeItem("Username");
                      sessionStorage.removeItem("type");
                      sessionStorage.removeItem("token");
                      window.location.replace("/");
                    }}
                  >
                    Log Out
                  </a>
                </li>
              </ul>

              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-2" href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ps-2" href="#!">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className=" mb-4 flex" style={{ marginTop: "100px" }}>
        <Card className="w-44 h-14 mt-3">
          <div className="tailwind flex">
            <div className="ml-4">
              {MyPackage !== null && (
                <>
                  <h1 className="text-2xl font-bold mb-2">
                    My Package Details
                  </h1>
                  <div>
                    <p>Name: {MyPackage.PackageName}</p>
                    <p>Status: {myPackageStatus}</p>
                    <p>Discount Doctor: {MyPackage.discountDoctor}%</p>
                    <p>Discount Medicine: {MyPackage.discountMedicin}%</p>
                    <p>Discount Family: {MyPackage.discountFamily}%</p>
                  </div>
                  <button
                    onClick={handleUnsubscribe}
                    className="mt-4 mx-auto px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </Card>

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
      {WalletModal ? (
        <FilterModal>
          <FontAwesomeIcon
            className="circleXmark"
            icon={faCircleXmark}
            onClick={() => {
              setWalletModal(false);
            }}
          />
          <MyWalletP />
        </FilterModal>
      ) : null}
      <Footer />
    </div>
  );
}

export default ViewAndUNSubToAHealthPackage;
