import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RoleComponent(role: any) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/treeStructure/allTrees/"
      );
      setRoles(response.data);
      //   console.log(response.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const editRole = () => {
    navigate(`/EditEmployeeRole/${role._id}`);
  };

  return (
    <div className="ml-8">
      {role.child.length > 0 && <span>+</span>}
      {role._id} {role.name} <span>+</span>
      <span>
        <button onClick={editRole}>edit</button>
      </span>{" "}
      <span>delete</span>
      {role.child.length > 0 &&
        role.child.map((r: any) => {
          return (
            <div>
              {/* {childRole.map((r: any) => { */}
              {/* return ( */}
              <RoleComponent
                // orignId={r[0]}
                _id={r["_id"]}
                name={r["name"]}
                child={roles.filter((k: any) => k["parentId"] == r["_id"])}
              />
              {/* ); */}
              {/* })} */}
            </div>
          );
        })}
    </div>
  );
}

export default RoleComponent;