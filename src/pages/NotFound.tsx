import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-[70vh] w-screen flex justify-center items-center flex-col">
      <h1 className="text-7xl text-red-500">404</h1>
      <h2 className="text-lg">Page Not Found!!</h2>
      <Link to="/" className="text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
}
