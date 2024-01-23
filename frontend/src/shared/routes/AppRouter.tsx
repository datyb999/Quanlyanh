import Login from "../../pages/login";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import { ProtectedRouteDashboardAdmin } from "./ProtectRoute.jsx";
import AccountManagement from "@/pages/admin/account";
import ImageManagement from "@/pages/admin/image";
import ForgotPassword from "@/pages/forgotPassword";
import FolderManagement from "@/pages/admin/folder";
import ImageManagementUser from "@/pages/user/image";
import FolderManagementUser from "@/pages/user/folder";
import UserPage from "@/pages/user";

export const AppRouter = () => {
  return (
    <>
      <Helmet>
        <title>Media Management</title>
        <meta name="description" content="Media Management" />
        <link rel="icon" type="image/x-icon" href={"logo"} />
      </Helmet>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin/account"
          element={
            <ProtectedRouteDashboardAdmin>
              <AccountManagement />
            </ProtectedRouteDashboardAdmin>
          }
        />
        <Route
          path="/admin/image"
          element={
            <ProtectedRouteDashboardAdmin>
              <ImageManagement />
            </ProtectedRouteDashboardAdmin>
          }
        />

        <Route
          path="/admin/folder"
          element={
            <ProtectedRouteDashboardAdmin>
              <FolderManagement />
            </ProtectedRouteDashboardAdmin>
          }
        />

         <Route
          path="/user/"
          element={
            <ProtectedRouteDashboardAdmin>
              <UserPage />
            </ProtectedRouteDashboardAdmin>
          }
        />

        <Route
          path="/user/image"
          element={
            <ProtectedRouteDashboardAdmin>
              <ImageManagementUser />
            </ProtectedRouteDashboardAdmin>
          }
        />

        <Route
          path="/user/folder"
          element={
            <ProtectedRouteDashboardAdmin>
              <FolderManagementUser />
            </ProtectedRouteDashboardAdmin>
          }
        />
      </Routes>
    </>
  );
};
