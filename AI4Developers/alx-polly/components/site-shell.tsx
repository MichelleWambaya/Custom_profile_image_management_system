"use client";
import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  );
}


