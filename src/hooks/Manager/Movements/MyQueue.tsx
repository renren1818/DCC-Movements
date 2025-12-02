import { useBlocksContext } from "@/contexts/Blocks";
import { useSession } from "@/contexts/Session";
import { useFetcher } from "@/hooks/Fetcher";
import React from "react";

export default function useMyQueue() {

    const { refreshTime } = useBlocksContext();
    const fetcher = useFetcher();
    const session = useSession();

    const [items, setItems] = React.useState<IMyQueue[]>([]);

    React.useEffect(() => {
        fetcher.GET(`OutboundMovement/GetMovementQueues`).then((result) => {
            console.log("Fetched Movement Queues:", result.data.data);

            setItems(result.data.data);
        });
    }, [refreshTime, session.user?.UserId]);
    return {
        items
    }
}