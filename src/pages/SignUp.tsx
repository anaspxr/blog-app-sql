import { useAppSelector } from "@/lib/store/hooks";
import RegisterForm from "../components/RegisterForm";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const { user } = useAppSelector((state) => state.user);

  if (user) return <Navigate to="/" />;
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
