import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import CustomNavbar from "./components/CustomNavbar";
import AddMenu from "./pages/AddMenu";
import ViewChoices from "./pages/ViewChoices";
import SignUp from "./pages/SignUp";
import ChooseItems from "./pages/ChooseItems";

const App = () => {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/choose-items" element={<ChooseItems />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/view-choices" element={<ViewChoices />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
