import Cookies from "js-cookie";

export default function Home() {
  const name = JSON.parse(Cookies.get("user") || "{}").name;
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <h1 className="text-blue-500 text-4xl font-semibold">RBAC</h1>
      <p>Welcome to the Home page, {name} </p>
    </div>
  );
}
