import React, { useState ,useEffect} from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
import Logo from "../../UI/UX/Logo";

const UploadDocuments = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("initial");
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };


  const handleDeleteFile = async (filename) =>{
    const res = await axios.put("http://localhost:3005/deleteFile",{Username: sessionStorage.getItem("Username"), Filename: filename});
    setFiles((prevFiles) => prevFiles.filter((file) => file !== filename));
    console.log(res);
  }


  const handleUploadFiles = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("Username", sessionStorage.getItem("Username"));
      console.log(sessionStorage.getItem("Username"));
      try {
        const result = await fetch("http://localhost:3005/patientUploadFile", {
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

  useEffect(() => {
    // Fetch initial data and set the 'files' state
    async function fetchData() {
      try {
        const result = await axios.get(`http://localhost:3005/gethealthrecords/${sessionStorage.getItem("Username")}`);
        setFiles(result.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  
    fetchData(); // Call the fetchData function to fetch data once
  }, []);

  const handleUploadRecords = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("Username", sessionStorage.getItem("Username"));
      console.log(sessionStorage.getItem("Username"));
      try {
        const result = await fetch("http://localhost:3005/patientUploadHealthRecord", {
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
  const handleViewFiles = async (filename) => {
    await axios.get(`http://localhost:3005/viewFiles/${filename}`, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }

   return (
    <>
      <div>
      <div>
      {/* Display file list on the screen */}
      <ul>
      {files != undefined && files.map((fileName, index) => (
              <div key={index}>
                <li key={index}>{fileName}</li>
                <button onClick={() => handleViewFiles(fileName)}>Download</button>
                <button onClick={() => handleDeleteFile(fileName)}>Remove</button>
              </div>
            ))}
          </ul>
      </div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={() => {handleUploadFiles(); window.location.reload(false);}} className="submit">
          Upload a file
        </button>
      )}
      

      <Result status={status} />
    </>
  );
};

const Result = ( {status} ) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
}; 

export default UploadDocuments;
