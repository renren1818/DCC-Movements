import React from "react";
import * as signalR from "@microsoft/signalr";

export function useSignalR(group: string | undefined) {

    const [connection, setConnection] = React.useState<signalR.HubConnection>();
    const [messages, setMessages] = React.useState<string[]>([]);
    const connectionRef = React.useRef(connection);

    React.useEffect(() => {

        const connect = async () => {

            // const session = await getSession();

            const hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/hubs/wms/?group=${group}`,
                    {
                        accessTokenFactory: () => "" // session?.user.token.accessToken
                    }
                )
                .withAutomaticReconnect()
                .build();

            connectionRef.current = hubConnection;

            hubConnection.on("ReceiveMessage", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            try {
                await hubConnection.start();
                setConnection(hubConnection);
            } catch (error) {
                console.error("SignalR Connection Error:", error);
            }
            
        };

        if (group) connect();

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop();
            }
        };

    }, [group]);

    return { connection, messages };

};