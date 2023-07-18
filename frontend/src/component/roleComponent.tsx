import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roleProvider from "../service/roleProvider";
import { Group, Avatar, Text, Accordion } from "@mantine/core";

function RoleComponent(role: any) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);

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
    <div className="ml-4 ">
      <div className="border-2 w-[300px]">
        {role.child.length > 0 && (
          <span className="pr-2">
            <button onClick={() => setShow(!show)}>+</button>
          </span>
        )}
        {role.name} <span className=" pl-10 pr-2">+</span>
        <span>
          <button onClick={editRole}>edit</button>
        </span>
      </div>

      <div className={`${show ? "flex" : "hidden"} flex-col`}>
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
    </div>
  );
}

export default RoleComponent;
