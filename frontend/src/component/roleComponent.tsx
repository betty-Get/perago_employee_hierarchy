import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";

function RoleComponent(role: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const params = useParams();
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

  let roleId: string = "";
  const openModal = (_id: string) => {
    roleId = _id;
    return open;
  };
  const deleteRole = async () => {
    console.log(`inside delete role ${roleId}`);
    try {
      await axios.delete(
        `http://localhost:5000/api/treeStructure/deleteEmployeeRole/${params.roleId}`
      );
      return close;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-8">
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <button onClick={deleteRole}>Yes</button>
        <button onClick={close}>No</button>
      </Modal>
      {role.child.length > 0 && <span>+</span>}
      {role._id} {role.name} <span>+</span>
      <span>
        <button onClick={editRole}>edit</button>
      </span>{" "}
      <span>
        {" "}
        <button onClick={openModal(role._id)}>delete</button>
      </span>
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
