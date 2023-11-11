import React, { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
const ContractPage = (props) => {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [openModal, setOpenModal] = useState(props.enable);
  const handleAccept = () => {
    setAccepted(true);
  };

  const handleReject = () => {
    setRejected(true);
  };
  useEffect(() => {
    console.log("openModal:", openModal);
    setOpenModal(props.enable);
  }, [props.enable]);
  return (
    <div>
      <Modal show={openModal} className="container">
        <Modal.Header>Clinic Contract</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This Independent Contractor Agreement ("Agreement") is entered
              into between "El-7a2ny Clinic", hereinafter referred to as the
              "Clinic," and "{sessionStorage.getItem("Username")}", hereinafter
              referred to as the "Contractor" or "Doctor." The Contractor agrees
              to provide medical services at the Clinic under the terms and
              conditions specified in this Agreement.
            </p>
            <h3>Scope of Services:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The Contractor shall provide medical services, consultations, and
              related tasks as required by the Clinic.
            </p>
            <h3>Term of Agreement:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This Agreement shall commence on the date of registration and
              continue until terminated by either party with reasonable notice.
            </p>
            <h3>Clinic Markup:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              By accepting this Agreement, the Contractor acknowledges receipt
              and understanding of the Clinic's policies, procedures, and
              markup. The Clinic applies a 10% markup to the Contractor's
              service fees.
            </p>
            <h3>Confidentiality:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The Contractor agrees to maintain the confidentiality of patient
              information, clinic operations, and any proprietary information
              disclosed during the term of this Agreement.
            </p>
            <h3>Acceptance:</h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              By registering on the clinic website, the Contractor affirms
              understanding and acceptance of the terms outlined in this
              Agreement, including the attached Clinic Markup. The Contractor
              agrees to abide by the terms and conditions set forth herein.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              By selecting the "I Accept" button below, the Contractor signifies
              their intent to be bound by the terms of this Agreement.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={async () => {
              setOpenModal(false);
              await axios
                .put("http://localhost:3001/updateStatus", {
                  Username: sessionStorage.getItem("Username"),
                  Status:"Accepted",
                });
              sessionStorage.setItem("Status" , "Accepted");
              window.location.replace("/DoctorHome");
              
            }}
          >
            I Accept
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setOpenModal(false);
              sessionStorage.removeItem("Username");
              sessionStorage.removeItem("type");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("Status");
              window.location.replace("/");
            }}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContractPage;
