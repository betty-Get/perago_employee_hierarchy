import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roleProvider from "../service/roleProvider";

function RoleComponent(role: any) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const response = await roleProvider.getRoles();
      setRoles(response);
      //   console.log(response);
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
      </span>
      {role.child.length > 0 &&
        role.child.map((r: any) => {
          return (
            <div>
              <RoleComponent
                _id={r["_id"]}
                name={r["name"]}
                child={roles.filter((k: any) => k["parentId"] == r["_id"])}
              />
            </div>
          );
        })}
    </div>
  );
}

export default RoleComponent;
