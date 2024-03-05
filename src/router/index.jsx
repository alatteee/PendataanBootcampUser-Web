// Router.jsx
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SecureRoute from "@/components/SecureRoute";
import AuthorizeLayout from "@/components/Layout/AuthorizeLayout";
import NoAuthorizeLayout from "@/components/Layout/NoAuthorizeLayout";

// Anonymous Route
import Login from "@/pages/Auth/Login";

// Logged In Route
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Report from "@/pages/Report";
import EditProfile from "@/pages/EditProfile";
import Certificate from "@/pages/Certificate";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Route untuk halaman yang sudah punya token/sudah login */}
      <Route
        element={
          <SecureRoute>
            <AuthorizeLayout />
          </SecureRoute>
        }
      >
        {/* Route-routenya */}
        <Route index element={<Dashboard />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/report"} element={<Report />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/certificate" element={<Certificate/>} />
      </Route>

      {/* Route untuk halaman yang belum login */}
      <Route element={<NoAuthorizeLayout />}>
        <Route path={"/login"} element={<Login />} />
      </Route>
    </>
  )
);
export default Router;
