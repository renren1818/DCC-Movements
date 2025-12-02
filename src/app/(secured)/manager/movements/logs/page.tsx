import Logs from "@/components/Manager/Movements/Logs";
import { use } from "react";

export default function Page({ searchParams }: { searchParams: Promise<{ back?: string }> }) {

    const { back } = use(searchParams);

    return <Logs back={back} />;

}