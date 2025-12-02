import {useFetcher} from "@/hooks/Fetcher";
import {ITeamDataResponse} from "@/interfaces/Asns/Queue";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export function useQueueLogic() {
    const router = useRouter();
    const {GET} = useFetcher();
    const [activeTeams, setActiveTeans] = useState<string[]>([]);
    const [selectedAsn, setSelectedAsn] = useState<string>();
    const [teamDataResponse, setTeamDataResponse] = useState<ITeamDataResponse>({} as ITeamDataResponse);

    const fetchAsnQueue = async () => {
        try {
            const response = await GET("/asn/GetAsnQueue");

            if (response.data) {
                setTeamDataResponse(response.data);
            }
        } catch (error) {
            console.error("Error fetching ASN Queue:", error);
        }
    };

    useEffect(() => {
        fetchAsnQueue();
    }, []);

    const handleSelectAsn = (asn: string) => {
        setSelectedAsn(asn);

        router.push(`/manager/asns/${asn}`);
    };

    const addRemoveActiveParent = (asn: string) => {
        setActiveTeans((prevActiveParents) => {
            if (prevActiveParents.includes(asn)) {
                return prevActiveParents.filter((activeAsn) => activeAsn !== asn);
            } else {
                return [...prevActiveParents, asn];
            }
        });
    };

    return {activeTeams, addRemoveActiveParent, handleSelectAsn, teamDataResponse, selectedAsn};
}
