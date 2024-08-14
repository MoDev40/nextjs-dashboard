"use client";

import Link from "next/link";
import { Button } from "../button";

// export type Customer = {
//     id: string;
//     name: string;
//     email: string;
//     image_url: string;
// };

const Form = () => {
  return (
    <form className="rounded-md bg-gray-50 p-4 md:p-6 space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
          type="text"
          placeholder="Name"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
          type="email"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="imageUrl">imageUrl</label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-2  text-sm outline-2 placeholder:text-gray-500"
          type="text"
          placeholder="ImageUrl"
          disabled
          value="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button disabled={true} type="submit">
          {true ? "Loading..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
