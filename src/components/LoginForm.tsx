/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  LoginValidationSchemaType,
  newGuestsFormSchema,
  NewGuestsFormSchemaValidationSchemaType,
} from "@/types/types";
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
import { Textarea } from "./ui/textarea";
import axios from "axios";

interface LoginFormProps {
  rsvp: boolean;
  setRsvp: (rsvp: boolean) => void;
}

interface NewGuestsFormValues {
  name: string;
  guests: string;
}

export const LoginForm = ({ rsvp, setRsvp }: LoginFormProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [click, setClick] = useState(false);
  const [newInvitee, setNewInvitee] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<LoginValidationSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
  });

  const guestsForm = useForm<NewGuestsFormSchemaValidationSchemaType>({
    resolver: zodResolver(newGuestsFormSchema),
    defaultValues: {
      name: "",
      guests: "",
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
          toast("RSVP logged!");
          setRsvp(true);
          setNewInvitee(formValues.name);
        } else {
          toast("Hello!");
        }
      } catch (e) {
        toast.error("Incorrect login info.");
      }
    },
    [setRsvp]
  );

  const handleCreateNewGuests = useCallback(
    async (guestFormValues: NewGuestsFormValues) => {
      try {
        await axios.post("/api/newguests", {
          name: newInvitee,
          guests: guestFormValues.guests,
        });

        setSubmitted(!submitted);

        toast.info("Successfuly submitted!");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        toast.error("Not submitted.");
      }
    },
    [newInvitee, submitted]
  );

  return (
    <div className="p-4">
      {rsvp ? (
        submitted ? (
          <a
            href="https://www.amazon.com/baby-reg/james-yu-april-2025-baldwinsville/1ZAL4EE9D4LMN"
            target="_blank"
          >
            <Button className="w-full">
              Guests submitted. Feel free to check out our registry!
            </Button>
          </a>
        ) : (
          <div>
            <Form {...guestsForm}>
              <form
                onSubmit={guestsForm.handleSubmit(handleCreateNewGuests)}
                className="space-y-2"
              >
                <FormField
                  control={guestsForm.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="RSVP logged! (Optional) Please write the name(s) of your guests."
                          className="text-[#5c1d1e] italic"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        )
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
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
      )}
    </div>
  );
};
