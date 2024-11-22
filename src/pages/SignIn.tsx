import { useAppSelector } from "@/lib/store/hooks";
import LoginForm from "../components/LoginForm";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const { user } = useAppSelector((state) => state.user);

  if (user) return <Navigate to="/" />;

  return (
    <div>
      <LoginForm />
    </div>
  );
}
