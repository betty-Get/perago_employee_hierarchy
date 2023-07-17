import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-[150px] w-full p-8 flex space-x-96">
        <div>
          <Button
            type="submit"
            className="bg-slate-500 hover:bg-slate-300 hover:text-lime-600 ml-5"
            radius="md"
            size="lg"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
        <div className="">
          <img src="/perago.jpg" alt="image" className="h-[80px] w-[200px]" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
