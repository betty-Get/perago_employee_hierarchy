import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-[150px] w-full p-8 flex space-x-96 border-b shadow-xl">
        <div>
          <Button
            className="bg-slate-700 hover:bg-slate-500 text-white ml-5 text-[20px]"
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
