import React, { useEffect, useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

const UploadHRforPatient = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFiles = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("Username", sessionStorage.getItem("PatientUsername"));
      console.log(sessionStorage.getItem("PatientUsername"));
      try {
        const result = await fetch("http://localhost:3001/patientUploadFile", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
        console.log(status);
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  function handleViews() {
    const [res, SetRes] = useState();
    useEffect(() => {
      getFiles();
      async function getFiles() {
        try {
          const result = await axios.get(
            `http://localhost:3001/gethealthrecords/${sessionStorage.getItem(
              "PatientUsername"
            )}`
          );
          SetRes(result.data);
        } catch (error) {}
      }
    }, []);
    return res;
  }

  let d = handleViews();

  const handleViewFiles = async (filename) => {
    await axios
      .get(`http://localhost:3001/viewFiles/${filename}`, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <>
      <div className="hr-file-parent">
        <label for="file" className="fafilearrowup-div">
          <FontAwesomeIcon
            icon={faFileArrowUp}
            onChange={handleFileChange}
            className="faFileArrowUp"
          />
          <input
            id="file"
            style={{ display: "none", zIndex: "20" }}
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <div className="hr-file-upload">
          {d != undefined &&
            d.map((fileName, index) => (
              <div key={index} className="hr-file-upload-item">
                <span>{fileName}</span>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="faDownload"
                  onClick={() => handleViewFiles(fileName)}
                />
              </div>
            ))}
        </div>
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUploadFiles} className="submit">
          Upload a file
        </button>
      )}
    </>
  );
};

export default UploadHRforPatient;
