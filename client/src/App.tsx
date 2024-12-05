import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import AdminContainer from "./components/admin/AdminContainer";
import AdminUsers from "./pages/admin-pages/AdminUsers";
import { Toaster } from "./components/ui/toaster";
import PersistLogin from "./components/PersistLogin";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/CreatePost";
import AdminPosts from "./pages/admin-pages/AdminPosts";
import AdminLogin from "./pages/admin-pages/AdminLogin";

function App() {
  return (
    <div>
      <PersistLogin>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Outlet />
              </div>
            }>
            <Route index element={<Home />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/createpost" element={<CreatePost />} />
            </Route>

            <Route path="/login" element={<SignIn />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<PrivateRoute isAdminRoute />}>
            <Route path="/admin" element={<AdminContainer />}>
              <Route index element={<Navigate to="/admin/users" />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="posts" element={<AdminPosts />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </PersistLogin>
    </div>
  );
}

export default App;
