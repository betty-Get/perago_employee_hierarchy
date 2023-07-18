import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import AddEmployeeRole from "./pages/addEmployeeRole";
import EditEmployeeRole from "./pages/editEmployeeRole";
import Footer from "./component/footer";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route
            path="/addEmployeeRole/:parentId"
            element={<AddEmployeeRole />}
          />
          <Route
            path="/editEmployeeRole/:roleId"
            element={<EditEmployeeRole />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
