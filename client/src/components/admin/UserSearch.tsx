import { useSearchParams } from "react-router-dom";

export default function UserSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (!query) {
      searchParams.delete("search");
      setSearchParams(searchParams);
    } else {
      searchParams.set("search", query);
      setSearchParams(searchParams);
    }
  };
  return (
    <input
      onChange={handleChange}
      type="text"
      placeholder="Search User"
      className="border rounded-md h-8 border-zinc-500 p-4"
    />
  );
}
