"use client";

import { createCustomer, CustomerState, updateCustomer } from "@/app/lib/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Button } from "../button";
import { Customer } from "@/app/lib/definitions";

const initialState: CustomerState = { errors: {}, message: null };

const Form = ({ customer }: { customer: Customer }) => {
  const [state, formAction, isPending] = useActionState(updateCustomer,initialState)
  return (
    <form
      action={formAction}
      className="rounded-md bg-gray-50 p-4 md:p-6 space-y-4"
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          required
          aria-describedby="username-error"
          id="username"
          name="username"
          className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          type="text"
          placeholder="Name"
          defaultValue={customer.name}
        />
        <div id="username-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error, index) => (
              <p key={index} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          required
          aria-describedby="email-error"
          name="email"
          id="email"
          className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          type="email"
          placeholder="Email"
          defaultValue={customer.email}
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error, index) => (
              <p key={index} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </div>
      <div>
        <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
          Image URL
        </label>
        <input
          required
          aria-describedby="image-error"
          name="image_url"
          id="image_url"
          className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          type="text"
          placeholder="Image URL"
          defaultValue={customer.image_url}
        />
        <div id="image-error" aria-live="polite" aria-atomic="true">
          {state.errors?.image_url &&
            state.errors.image_url.map((error, index) => (
              <p key={index} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button disabled={isPending} type="submit">
          {isPending ? "Loading..." : "Create Customer"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
