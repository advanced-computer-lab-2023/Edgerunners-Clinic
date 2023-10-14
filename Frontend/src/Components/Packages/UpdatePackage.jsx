import { Card, Typography } from "@material-tailwind/react";
import GetPackages,  {DeletePackages} from "./getPackages";
import axios from "axios";
import React, { useState, useEffect , useCallback  } from 'react';
import Logo from "../../UI/UX/Logo";


const handleSubmit = async (e) => 
    e.preventDefault();
    async function DeletePackage(p) {
      await axios.delete("http://localhost:3001/deletePackage", p);
    }
 
const TABLE_HEAD = ["Name","Doctor Discount","Medicin Discount","Family Discount","Price"];
 
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


 
export default function DefaultTable() {
 
  const [packages, setPackages] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [forceEffect, setForceEffect] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getPackage");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
    fetchData();
    setForceEffect(false);
  }, [forceEffect]); 
  const handleDelete = async (nameToDelete) => {
    try {
      await axios.delete("http://localhost:3001/deletePackage", {
        data: { Name: nameToDelete }, 
      });
      setPackages((prevPackages) => {
        return {
          ...prevPackages,
          data: prevPackages.data.filter((p) => p.Name !== nameToDelete),
        };
      });

      console.log("Request sent successfully");
    } catch (error) {
      console.error("Error:", error);
    }
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
      await axios.put("http://localhost:3001/updatePackage", {
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
      console.log(error)
    }
  };

  if (packages === null) {
    return <div>Loading...</div>; 
  } else if (packages.data.length === 0) {
    return <div>No data available.</div>; 
  }else{
    return (
      <div className="tailwind">
        <a href="/AdminHome">
        <Logo />
      </a>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                    {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
               {packages.data.map((p, index) => {
              const isLast = index === packages.data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              const isEditing = editMode[p.Name] || false;
              return (
                <tr key={p.Name}>
                  <td className={classes}>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={p.Name}
                      onChange={(e) => {
                        p.NewName=e.target.value;
                      }}
                    />
                  ) :(
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {p.Name}
                    </Typography>)}
                  </td>
                  <td className={classes}>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={p.discountDoctor}
                      onChange={(e) => {
                        p.NewdiscountDoctor = p.discountDoctor
                        p.discountDoctor = e.target.value
                      }}
                    />
                  ) :(
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                    {p.discountDoctor}
                    </Typography>)}
                  </td>
                  <td className={classes}>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={p.discountMedicin}
                      onChange={(e) => {
                        
                        p.NewdiscountMedicin= p.discountMedicin
                        p.discountMedicin= e.target.value
                      }}
                    />
                  ) :(
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                    {p.discountMedicin}
                    </Typography>)}
                  </td>
                  <td className={classes}>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={p.discountFamily}
                      onChange={(e) => {
                        p.NewdiscountFamily= p.discountFamily;
                        p.discountFamily= e.target.value;
                      }}
                    />
                  ) :(
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                    {p.discountFamily}
                    </Typography>)}
                  </td>
                  <td className={classes}>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={p.Price}
                      onChange={(e) => {
                        p.NewPrice= p.Price;
                        p.Price= e.target.value;
                      }}
                    />
                  ) :(
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                    {p.Price}
                    </Typography>)}
                  </td>
  
                  <td className={classes}>
                  {isEditing ? (
                    <button
                      onClick={() => {
                        handleUpdate(p);
                        
                      }}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      as="a"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => handleToggleEdit(p.Name)}
                    >
                      Edit
                    </button>
                  )}
                  </td>
                  <td className={classes}>
                    
                    {isEditing ? (
                      <button
                      onClick={() =>{
                        handleCancel(p.Name)
                        
                      }} 
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                      as="a"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={ async()=>{
                        console.log(p);
                  
                        await handleDelete(p.Name);
                      }}
                    >
                      Delete
                    </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      </div>
    );
  }
  

  
}
