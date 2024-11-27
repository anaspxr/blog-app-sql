import { ChevronDown } from "lucide-react";

import { Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const initialValues = {
  role: {
    admins: true,
    users: true,
    authors: true,
  },
  status: {
    blocked: true,
    unblocked: true,
  },
};

export default function UserFilter() {
  const setSearchParams = useSearchParams()[1];
  const [values, setValues] = useState(initialValues);

  const handleSave = () => {
    const query = Object.values(values)
      .map((value) =>
        Object.entries(value)
          .map(([k, v]) => `${k}=${v}`)
          .join("&")
      )
      .join("&");

    setSearchParams(query);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-white px-4 border rounded-md flex items-center gap-2">
          Filter <ChevronDown size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>By Role</DropdownMenuLabel>
        <DropdownMenuGroup>
          {Object.entries(values.role).map(([key, value]) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setValues((prev) => ({
                  ...prev,
                  role: {
                    ...prev.role,
                    [key]: !value,
                  },
                }));
              }}
              key={key}
              className={`flex justify-between cursor-pointer ${
                value && "bg-gray-200 my-1"
              }`}>
              <span>{key}</span>
              {value && <Check />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>By Status</DropdownMenuLabel>
        <DropdownMenuGroup>
          {Object.entries(values.status).map(([key, value]) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setValues((prev) => ({
                  ...prev,
                  status: {
                    ...prev.status,
                    [key]: !value,
                  },
                }));
              }}
              key={key}
              className={`flex justify-between cursor-pointer ${
                value && "bg-gray-200 my-1"
              }`}>
              <span>{key}</span>
              {value && <Check />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSave}
          className="cursor-pointer  bg-zinc-900 text-zinc-200 hover:bg-zinc-800 focus:bg-zinc-800 focus:text-zinc-200">
          <span className="w-full text-center">Save</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
