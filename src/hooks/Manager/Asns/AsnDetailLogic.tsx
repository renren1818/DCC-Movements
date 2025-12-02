"use client";

import { useDialogBoxContext } from "@/contexts/DialogBox";
import { useManagerAsnQueueContext } from "@/contexts/ManagerAsnQueue";
import { useFetcher } from "@/hooks/Fetcher";
import { IAsnResponse } from "@/interfaces/Asns/AsnQueue";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAsnDetailLogic() {
    const { GET, POST } = useFetcher();
    const params = useParams();
    const asnNumber = params.container as string;
    const { handleRemoveAsn } = useManagerAsnQueueContext();

    const { openDialog } = useDialogBoxContext();

    const [asnDetail, setAsnDetail] = useState<IAsnResponse>({} as IAsnResponse);

    const fetchAsnDetails = async () => {
        try {
            const response = await GET(`/asn/GetAsnPageDetails?asn=${asnNumber}`);
            if (response.data) {
                setAsnDetail(response.data);
            }
        } catch (error) {
            console.error("Error fetching ASN Details:", error);
        }
    };

    const completeAsn = async (asn: string) => {
        try {
            const res = await POST(`asn/CompleteAsn?asn=${asn}`, {});

            if (res.data.Success) {
                openDialog(201);
            }
        } catch {
            openDialog(202);
        }
        handleRemoveAsn();
    };

    useEffect(() => {
        if (asnNumber) {
            fetchAsnDetails();
        }
    }, [asnNumber]);

    return { asnDetail, completeAsn };
}
