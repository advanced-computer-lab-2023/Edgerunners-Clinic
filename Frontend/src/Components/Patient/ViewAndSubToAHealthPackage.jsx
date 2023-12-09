import { useState, useEffect } from "react";
import Card from "../../UI/UX/Card";
import Logo from "../../UI/UX/Logo";
import GetPackages from "../Packages/getPackages";
import axios from "axios";
import ConfirmationCard from "../../UI/UX/ConfirmationCard";

function ViewAndSubToAHealthPackage() {
  const array = GetPackages();
  const packages = array.data;
  const [flag, setFlag] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubscribe = (packageName) => {
    // Display the confirmation card for the specific card
    setFlag((prevFlag) => ({ ...prevFlag, [packageName]: true }));
    setShowConfirmation(true);
  };

  const handleConfirmYes = (packageName) => {
    setShowConfirmation(false);
  
    if (!flag[packageName]) {
      setShowConfirmation(false);
      const patientUsername = sessionStorage.getItem("Username");

      // Call the backend method using Axios
      axios
        .post("/api/createHealthPackage", {
          patientUsername: patientUsername,
          packagename: packageName,
        })
        .then((response) => {
          // Handle successful subscription
          console.log("Health package subscribed successfully");
          // You can also update the state or perform other actions based on the response
        })
        .catch((error) => {
          // Handle error
          console.error("Error subscribing to health package:", error);
        });

      // Set flag to prevent multiple subscriptions (if needed)
      setFlag((prevFlag) => ({ ...prevFlag, [packageName]: true }));

      // Close the confirmation card for the specific card
      
    }
  };

  const handleConfirmNo = () => {
    // Close the confirmation card for the specific card
    setShowConfirmation(false);
  };

  return (
    <div className="tailwind">
      <Card>
        <Logo height="3rem" className="mr-9" />
        <div className="package-list">
          {packages != null &&
            packages.map((packageItem, index) => (
              <div key={index}>
                <h3>Name: {packageItem.Name}</h3>
                <p>
                  discountDoctor: {packageItem.discountDoctor}
                  <br />
                  discountMedicin: {packageItem.discountMedicin}
                  <br />
                  discountFamily: {packageItem.discountFamily}
                  <br />
                  Price: {packageItem.Price}
                  <br />
                  <button
                    className="ml-4"
                    onClick={() => handleSubscribe(packageItem.Name)}
                  >
                    Subscribe
                  </button>

                  {showConfirmation && flag[packageItem.Name] && (
                    <ConfirmationCard
                      message="Are you sure you want to subscribe?"
                      onYes={() => handleConfirmYes(packageItem.Name)}
                      onNo={handleConfirmNo}
                    />
                  )}
                </p>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

export default ViewAndSubToAHealthPackage;
