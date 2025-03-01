"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
};
