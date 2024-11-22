import { reLoginUser } from "@/api/actions/authActions";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/slices/userSlice";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function PersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // to prevent multiple calls and re-renders
    if (loading) {
      if (user.id) {
        // updating the user state in the store before fetching the user data
        dispatch(loginUser(user));

        reLoginUser(user.id)
          .then((user) => {
            // updating the user state after fetching
            dispatch(loginUser(user));
          })
          .catch((err) => {
            toast({
              title: "Error while logging in!!",
              description: err?.message,
            });
          });
      }
      setLoading(false);
    }
  }, [dispatch, loading, user]);

  if (loading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return <>{children}</>;
}
