import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import AddForm from "./pages/addForm";

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
          <Route path="/addTree" element={<AddForm />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
