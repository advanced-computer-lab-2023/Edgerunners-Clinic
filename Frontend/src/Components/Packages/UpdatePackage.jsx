import { Card, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileArrowUp,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import GetPackages, { DeletePackages } from "./getPackages";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Logo from "../../UI/UX/Logo";
import { Link } from "react-router-dom";
import Footer from "../Patient/Footer";
import FilterModal from "../PatientHome/FilterModal";
import SetAdmin from "../Admin/SetAdmin";
import CreatePackage from "./CreatePackage";
import RemoveUser from "../Admin/RemovePar";

const handleSubmit = async (e) => e.preventDefault();
async function DeletePackage(p) {
  await axios.delete("http://localhost:3005/deletePackage", p);
}

const TABLE_HEAD = [
  "Name",
  "Doctor Discount",
  "Medicin Discount",
  "Family Discount",
  "Price",
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
const confirmationDialogStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  confirmButton: {
    backgroundColor: "green",
    color: "white",
  },

  cancelButton: {
    backgroundColor: "red",
    color: "white",
  },
  confirmButtonHover: {
    backgroundColor: "darkgreen",
  },

  cancelButtonHover: {
    backgroundColor: "darkred",
  },
};
export default function DefaultTable() {
  const [packages, setPackages] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [forceEffect, setForceEffect] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(false);
  const [hoveredConfirmButton, setHoveredConfirmButton] = useState(false);
  const [hoveredCancelButton, setHoveredCancelButton] = useState(false);
  const [isModalSetAdminOpen, setIsModalSetAdminOpen] = useState(false);
  const [isModalRemoveUserOpen, setIsModalRemoveUserOpen] = useState(false);
  const [isModalCreatePackageOpen, setIsModalCreatePackageOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/getPackage");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setForceEffect(false);
  }, [forceEffect]);

  const ConfirmationDialog = ({ message, onConfirm, onCancel }) => (
    <div style={confirmationDialogStyles.overlay}>
      <div style={confirmationDialogStyles.modal}>
        <p>{message}</p>
        <div style={confirmationDialogStyles.buttons}>
          <button
            style={{
              ...confirmationDialogStyles.button,
              ...confirmationDialogStyles.confirmButton,
              ...(hoveredConfirmButton
                ? confirmationDialogStyles.confirmButtonHover
                : {}),
            }}
            onMouseEnter={() => setHoveredConfirmButton(true)}
            onMouseLeave={() => setHoveredConfirmButton(false)}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            style={{
              ...confirmationDialogStyles.button,
              ...confirmationDialogStyles.cancelButton,
              ...(hoveredCancelButton
                ? confirmationDialogStyles.cancelButtonHover
                : {}),
            }}
            onMouseEnter={() => setHoveredCancelButton(true)}
            onMouseLeave={() => setHoveredCancelButton(false)}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (nameToDelete) => {
    setShowConfirmation(true);
    setItemToDelete(nameToDelete);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete("http://localhost:3005/deletePackage", {
        data: { Name: itemToDelete },
      });
      console.log("Request sent successfully");
      setForceEffect(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setHoveredCancelButton(false);
    setHoveredConfirmButton(false);
  };
  const handleToggleEdit = (name) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [name]: !prevEditMode[name],
    }));
  };

  const handleUpdate = async (p) => {
    try {
      console.log(p.NewdiscountDoctor);
      await axios.put("http://localhost:3005/updatePackage", {
        Name: p.Name,
        NewName: p.NewName,
        Price: p.Price,
        discountDoctor: p.discountDoctor,
        discountMedicin: p.discountMedicin,
        discountFamily: p.discountFamily,
      });
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [p.Name]: false,
      }));
      console.log("Update request sent successfully");
      setForceEffect(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCancel = async (name) => {
    try {
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [name]: false,
      }));
      setForceEffect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (packages === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="Bootstrap PatientHome tailwind">
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll nav-color-bg">
          <div className="container">
            <Link to="/adminHome" className="logo-link">
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
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      setIsModalSetAdminOpen(true);
                    }}
                  >
                    Add Admin
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      setIsModalRemoveUserOpen(true);
                    }}
                  >
                    Remove User
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/updatePackage"
                  >
                    Update Packages
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={() => {
                      setIsModalCreatePackageOpen(true);
                    }}
                  >
                    Add Packages
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
        <br />
        <br />
        <br />
        <br />
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 font-bold text-blue-gray-600"
                  >
                    {head}
                  </th>
                ))}
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 font-bold text-blue-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {packages.data.map((p, index) => {
                const isLast = index === packages.data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const isEditing = editMode[p.Name] || false;

                return (
                  <tr key={p.Name}>
                    <td className={classes}>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={p.Name}
                          onChange={(e) => {
                            p.NewName = e.target.value;
                          }}
                        />
                      ) : (
                        <Typography
                          color="blue-gray"
                          className="font-normal"
                          style={{ width: "180px", textAlign: "center" }}
                        >
                          {p.Name}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={p.discountDoctor}
                          onChange={(e) => {
                            p.NewdiscountDoctor = p.discountDoctor;
                            p.discountDoctor = e.target.value;
                          }}
                        />
                      ) : (
                        <Typography
                          color="blue-gray"
                          className="font-normal"
                          style={{ width: "180px", textAlign: "center" }}
                        >
                          {p.discountDoctor}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={p.discountMedicin}
                          onChange={(e) => {
                            p.NewdiscountMedicin = p.discountMedicin;
                            p.discountMedicin = e.target.value;
                          }}
                        />
                      ) : (
                        <Typography
                          color="blue-gray"
                          className="font-normal"
                          style={{ width: "180px", textAlign: "center" }}
                        >
                          {p.discountMedicin}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={p.discountFamily}
                          onChange={(e) => {
                            p.NewdiscountFamily = p.discountFamily;
                            p.discountFamily = e.target.value;
                          }}
                        />
                      ) : (
                        <Typography
                          color="blue-gray"
                          className="font-normal "
                          style={{ width: "180px", textAlign: "center" }}
                        >
                          {p.discountFamily}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={p.Price}
                          onChange={(e) => {
                            p.NewPrice = p.Price;
                            p.Price = e.target.value;
                          }}
                        />
                      ) : (
                        <Typography
                          color="blue-gray"
                          className="font-normal"
                          style={{ width: "180px", textAlign: "center" }}
                        >
                          {p.Price}
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      <div className="flex space-x-2">
                        {isEditing ? (
                          <button
                            onClick={() => {
                              handleUpdate(p);
                            }}
                            className="updateButton px-4 py-2 bg-green-500 text-white rounded"
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleEdit(p.Name)}
                            className="editButton px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Edit
                          </button>
                        )}

                        {isEditing ? (
                          <button
                            onClick={() => {
                              handleCancel(p.Name);
                            }}
                            className="deleteButton px-4 py-2 bg-red-500 text-white rounded packagesHoverButton"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              await handleDelete(p.Name);
                            }}
                            className="deleteButton  px-4 py-2 bg-red-500 text-white rounded "
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        {showConfirmation && (
          <ConfirmationDialog
            message={`Are you sure you want to delete the package "${itemToDelete}"?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        {isModalSetAdminOpen ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setIsModalSetAdminOpen(false);
              }}
            />
            <SetAdmin />
            {/*<div>Test component</div>*/}
          </FilterModal>
        ) : null}
        {isModalRemoveUserOpen ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setIsModalRemoveUserOpen(false);
              }}
            />
            <RemoveUser />
            {/*<div>Test component</div>*/}
          </FilterModal>
        ) : null}
        {isModalCreatePackageOpen ? (
          <FilterModal>
            <FontAwesomeIcon
              className="circleXmark"
              icon={faCircleXmark}
              onClick={() => {
                setIsModalCreatePackageOpen(false);
              }}
            />
            <CreatePackage />
            {/*<div>Test component</div>*/}
          </FilterModal>
        ) : null}
        <br />
        <Footer></Footer>
      </div>
    );
  }
}
