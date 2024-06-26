import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

import App from "./App";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import DashBoard from "./components/DashBoard/DashBoard";
import ManageUser from "./components/ManageUser/ManageUser";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DetailQuiz from "./components/DetailQuiz/DetailQuiz";
import ManageQuiz from "./components/ManageQuiz/ManageQuiz";
import ManageQuestions from "./components/ManageQuestion/ManageQuestions";
import PrivateRoute from "./routes/PrivateRoute";

const NotFound = () => {
  return <div className="alert alert-danger">404. NotFound</div>;
};
function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admins"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<ManageQuestions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  );
}

export default Layout;
