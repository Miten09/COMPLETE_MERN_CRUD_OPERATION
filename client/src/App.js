import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateForm from "./components/CreateForm";
import BookDetails from "./components/BookDetails";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/form-fill" element={<CreateForm />} />
        <Route path="/book-details" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
