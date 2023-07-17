import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import AddEmployeeRole from "./pages/addEmployeeRole";

function App() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/addEmployeeForm" element={<AddEmployeeRole />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
