/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginValidationSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { ColorRing } from "react-loader-spinner";

export const LoginForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [click, setClick] = useState(false);

  const form = useForm<LoginValidationSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setClick(false), 2000);
    return () => clearTimeout(timer);
  });

  const handleLogin = useCallback(
    async (formValues: { name: string; password: string }) => {
      try {
        const loginResponse = await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          ...formValues,
        });

        if (loginResponse && loginResponse?.status > 300) {
          toast.error("RSVP logged.");
        } else {
          toast("Hello!");
        }
      } catch (e) {
        toast.error("Incorrect login info.");
      }
    },
    []
  );

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-center text-[#5c1d1e]">
                  Please enter your name below to submit your RSVP.
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your First and Last Name"
                    className="text-[#5c1d1e]"
                    {...field}
                  />
                  {/* TODO: need to add something for ppl not on guest list already */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="hidden">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <div className="relative">
                    <Input
                      placeholder="Password"
                      type={visiblePassword ? "text" : "password"}
                      className="text-[#954f36] bg-[#fef6ed]"
                      {...field}
                    />
                    {visiblePassword ? (
                      <EyeIcon
                        className="absolute right-4 top-2 z-10 cursor-pointer text-[#954f36]"
                        onClick={() => setVisiblePassword(false)}
                      />
                    ) : (
                      <EyeClosedIcon
                        className="absolute right-4 top-2 z-10 cursor-pointer text-[#954f36]"
                        onClick={() => setVisiblePassword(true)}
                      />
                    )}
                  </div> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#5c1d1e] text-[#ffc521]"
            onClick={() => {
              setClick(true);
            }}
          >
            {click ? <ColorRing /> : <p>Enter</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};
