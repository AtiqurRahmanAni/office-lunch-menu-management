import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CustomNavbar from "./components/CustomNavbar";
import AddMenu from "./pages/AddMenu";
import ViewChoices from "./pages/ViewChoices";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <>
      <CustomNavbar />
      <div className="font-roboto">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-menu" element={<AddMenu />} />
            <Route path="/view-choices" element={<ViewChoices />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
