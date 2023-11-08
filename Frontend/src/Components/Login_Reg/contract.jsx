import React, { useState } from 'react';

const ContractPage = () => {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleReject = () => {
    setRejected(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Doctor's Contract</h1>
        {accepted ? (
          <div>
            <p className="mb-4">Contract Accepted! You now have access to the home page.</p>
          </div>
        ) : rejected ? (
          <div>
            <p className="mb-4">Contract Rejected. You have been removed from the system.</p>
          </div>
        ) : (
          <div>
            <p className="mb-4">
              This is the contract text. Please read it carefully. By accepting, you agree to the terms and conditions.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractPage;