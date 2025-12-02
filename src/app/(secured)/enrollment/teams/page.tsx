import TeamTable from "@/components/Enrollment/Team/TeamTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Team Masterlist | WMS | S&R Shopping (Distribution Calamba)",
  other: {
    author:
      "Clark Leovison Rey, Joemar John Era, Aries Capistrano, Roland Manimtim, Warren Magsino, Jerry Bayoneta Jr., Bel De Leon, Vanessa Bantong, ALec Gealone",
  },
};

export default function page() {
  return (
    <>
      <TeamTable />
    </>
  );
}
