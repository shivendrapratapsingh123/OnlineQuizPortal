import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/login";
import Register from "./pages/common/register";
import ProtectedRoute from "./components/protectedRoutes";
import Home from "./pages/common/home";
import Exams from "./pages/admin/exams";
import AddEditExam from "./pages/admin/exams/AddEditExam";
import Loader from "./components/Loader.js";
import { useSelector } from "react-redux";

function App() {

  const {loading} = useSelector(state =>state.loader);


  return (
    <>
    {loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          {/*common routes*/}

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          {/*user routes*/}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/*admin routes */}

          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
