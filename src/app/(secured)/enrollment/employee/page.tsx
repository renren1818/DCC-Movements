import UserTable from "@/components/Enrollment/User/UserTable";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Employee Masterlist | WMS | S&R Shopping (Distribution Calamba)",
  other: {
    author:
      "Clark Leovison Rey, Joemar John Era, Aries Capistrano, Roland Manimtim, Warren Magsino, Jerry Bayoneta Jr., Bel De Leon, Vanessa Bantong, Alec Gealone",
  },
};

export default function page() {
  return (
    <>
      <UserTable />
    </>
  );
}
