import AssetsTable from "@/components/Enrollment/Assets/AssetsTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Asset List | WMS | S&R Shopping (Distribution Calamba)",
  other: {
    author:
      "Clark Leovison Rey, Joemar John Era, Aries Capistrano, Roland Manimtim, Warren Magsino, Jerry Bayoneta Jr., Bel De Leon, Vanessa Bantong, Alec Gealone",
  },
};

export default function Page() {
  return (
    <>
      <AssetsTable />
    </>
  );
}
