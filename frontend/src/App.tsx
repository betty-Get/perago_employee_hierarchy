import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";

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
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
