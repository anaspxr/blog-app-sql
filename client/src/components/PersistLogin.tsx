import { useAppDispatch } from "@/lib/store/hooks";
import { reLoginUser } from "@/lib/store/thunks/userThunks";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function PersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) dispatch(reLoginUser());
  });
  return <>{children}</>;
}
