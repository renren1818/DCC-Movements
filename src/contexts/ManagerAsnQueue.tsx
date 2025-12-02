import { useFetcher } from "@/hooks/Fetcher";
import { IAsnQueue, IselectedAsn, ITeamDataResponse } from "@/interfaces/Asns/Queue";
import { useRouter } from "next/navigation";
import React from "react";

interface ManagerAsnQueueContextProps {
    children: React.ReactNode;
}

interface IManagerAsnQueueContext {
    activeTeams: string[];
    selectedAsn: IselectedAsn | undefined;
    teamDataResponse: ITeamDataResponse;
    handleSelectAsn: (asn: IAsnQueue) => void;
    addRemoveActiveParent: (asn: string) => void;
    handleRemoveAsn: () => void;
}

const ManagerAsnQueueContext = React.createContext<IManagerAsnQueueContext>({} as IManagerAsnQueueContext);

export const useManagerAsnQueueContext = () => {
    return React.useContext(ManagerAsnQueueContext);
};

export default function ManagerAsnQueueContextProvider({ children }: ManagerAsnQueueContextProps) {
    const router = useRouter();
    const { GET } = useFetcher();

    const [activeTeams, setActiveTeans] = React.useState<string[]>([]);
    const [activeTeam, setActiveTeam] = React.useState<string>();

    const [selectedAsn, setSelectedAsn] = React.useState<IselectedAsn>();
    const [teamDataResponse, setTeamDataResponse] = React.useState<ITeamDataResponse>({} as ITeamDataResponse);

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

    React.useEffect(() => {
        fetchAsnQueue();
    }, []);

    const handleSelectAsn = (asn: IAsnQueue) => {
        const select: IselectedAsn = {
            Asn: asn,
            ColorCode: activeTeam as string,
        };
        setSelectedAsn(select);

        router.push(`/manager/asns/${asn.AsnNumber}`);
    };

    const handleRemoveAsn = async () => {
        const parent = teamDataResponse.data.find((x) => x.ColorCode == selectedAsn?.ColorCode);

        setTeamDataResponse((prev) => {
            const updated = { ...prev };

            updated.data = prev.data.map((team) => {
                const filtered = team.Details.filter((d) => d.AsnNumber !== selectedAsn?.Asn.AsnNumber);

                return {
                    ...team,
                    Details: filtered,
                };

                return team;
            });

            return updated;
        });

        if (selectedAsn?.Asn && parent && parent?.Details.length > 1) {
            addRemoveActiveParent(selectedAsn.ColorCode);
        }

        router.replace(`/manager/asns`);
        setSelectedAsn(undefined);
    };

    const addRemoveActiveParent = (asn: string) => {
        setActiveTeans((prevActiveParents) => {
            if (prevActiveParents.includes(asn)) {
                return prevActiveParents.filter((activeAsn) => activeAsn !== asn);
            } else {
                setActiveTeam(asn);
                return [...prevActiveParents, asn];
            }
        });
    };

    return (
        <ManagerAsnQueueContext.Provider
            value={{
                activeTeams,
                addRemoveActiveParent,
                handleSelectAsn,
                teamDataResponse,
                selectedAsn,
                handleRemoveAsn,
            }}
        >
            {children}
        </ManagerAsnQueueContext.Provider>
    );
}
