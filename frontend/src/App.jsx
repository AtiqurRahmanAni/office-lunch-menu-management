import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SigUp";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddMenu from "./pages/AddMenu";
import ViewChoices from "./pages/ViewChoices";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="font-roboto">
        <Routes>
          <Route element={<Navbar />} path="" />
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
