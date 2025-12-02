'use client';

import { use } from "react";
import Block from "@/components/Blocks/Block";

export default function Page({ params }: { params: Promise<{ location: string[] }>}) {

    const { location } = use(params);
    
    return <Block location={location} />

}