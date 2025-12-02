import AsnTable from "@/components/Asn/AsnTable";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ASN List | WMS | S&R Shopping (Distribution Calamba)",
};

export default function page() {
  return (
    <>
      <AsnTable />
    </>
  );
}
