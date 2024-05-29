"use client";

import React from "react";
import { RecoilRoot } from "recoil";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
