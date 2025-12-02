import { IManagerPanelNotification } from "@/interfaces/ManagerPanelNotification";
import { useEffect, useState } from "react";
import { useFetcher } from "../Fetcher";
import { useSignalRContext } from "@/contexts/SignalR";

export default function useTeamProfile() {
    const { GET } = useFetcher();
    const signal = useSignalRContext();

    const [notifications, setNotifications] = useState<IManagerPanelNotification>({
        HasAsn: false,
        HasAssignContainer: false,
        HasMovement: false,
    } as IManagerPanelNotification);

    // const fetchNotifications = async () => {
    //     try {
    //         const res = await GET(`asn/notification`);

    //         setNotifications(res.data);
    //     } catch (error) {
    //         console.error("Error fetching notifications:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchNotifications();
    // }, []);

    // useEffect(() => {
    //     if (signal.getMessage(["GETINBOUNDREPORTS", "FETCHDOORS", "REFRESHLOCATION", "COMPLETEASN", "GETCURRENTSUPERVISORPANEL"])) {
    //         fetchNotifications();
    //     }
    // }, [signal.messages]);

    // const getNotificationPerFeature = (feature: string) => {
    //     let isInvisible = false;

    //     switch (feature) {
    //         case "Assign Container":
    //             isInvisible = notifications.HasAssignContainer;

    //             break;

    //         case "Movements":
    //             isInvisible = notifications.HasMovement;

    //             break;

    //         case "ASN":
    //             isInvisible = notifications.HasAsn;

    //             break;

    //         default:
    //             isInvisible = false;
    //             break;
    //     }

    //     return isInvisible;
    // };

    // return { notifications, fetchNotifications, getNotificationPerFeature };
}
