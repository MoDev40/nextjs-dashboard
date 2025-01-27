"use client";
import { lusitana } from "@/app/ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useActionState, useEffect } from "react";
import { signUp, SignUpState } from "../lib/actions";
import { Button } from "./button";

const initialState: SignUpState = { message: null, errors: {} };
export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  useEffect(()=>{
    console.log(state.errors)
  },[state])
  return (
    <form
      aria-describedby="sign-up-error"
      action={formAction}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please sign up in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button aria-disabled={isPending} className="mt-4 w-full">
          {isPending ? "signing...." : "Sign up"}{" "}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          id="sign-up-error"
          aria-atomic="true"
          aria-live="polite"
          className="flex h-8 my-10 p-2 space-x-1"
        >
          {state && (
            <>
              <div className="flex flex-row space-x-2 justify-start">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                {
                    state.errors?.email?.map((error) =>(
                        <p className="text-sm text-red-400" key={error}>{error}</p>
                    ))
                }
              </div>
              <div className="flex flex-row space-x-2 justify-end">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                {
                    state.errors?.password?.map((error) =>(
                        <p className="text-sm text-red-400" key={error}>{error}</p>
                    ))
                }
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
