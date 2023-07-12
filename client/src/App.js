import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css"; 
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/common/login";
import Register from "./pages/common/register";
import ProtectedRoute from "./components/protectedRoutes";
import Home from "./pages/common/home"

function App() {
  return (
   <BrowserRouter>
    <Routes>
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/register" element={<Register/>} ></Route>
     <Route path="/" element = {<ProtectedRoute>
      <Home/>
     </ProtectedRoute>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
