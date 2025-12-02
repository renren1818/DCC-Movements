'use client';

import React from 'react';
import * as signalR from "@microsoft/signalr";

interface SignalRContextProps { children: React.ReactNode };

interface ISignalRMessage {

    action: string;
    userRoles: string;

}

interface ISignalRContext {

    connection?: signalR.HubConnection;
    messages: ISignalRMessage[];
    getMessage: (actions?: string[]) => ISignalRMessage | undefined;

}

const SignalRContext = React.createContext<ISignalRContext>({} as ISignalRContext);

export const useSignalRContext = () => {

    return React.useContext(SignalRContext);

}

export default function SignalRContextProvider({ children }: SignalRContextProps) {
    
    const [connection, setConnection] = React.useState<signalR.HubConnection>();
    const [messages, setMessages] = React.useState<ISignalRMessage[]>([]);
    const connectionRef = React.useRef(connection);
    
    React.useEffect(() => {
    
        const connect = async () => {

            const hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hub`)
                .withAutomaticReconnect()
                .build();

            connectionRef.current = hubConnection;

            hubConnection.on("signalReceived", (message) => setMessages((prevMessages) => [...prevMessages, message]));
            
            try {
                await hubConnection.start();
                setConnection(hubConnection);
            } catch (error) {
                console.error("SignalR Connection Error:", error);
            }
            
        };

        connect();

        return () => {
            if (connectionRef.current) connectionRef.current.stop();
        };

    }, []);
    

    const getMessage = (actions: string[] = []) => {

        if (messages.length === 0)  return;

        const message = messages.shift() as ISignalRMessage;

        console.log('MESSAGE =>', message, actions, actions.includes(message.action));

        if (actions.length === 0 || actions.includes(message.action)) return message;
        
    }

    return (
        <SignalRContext.Provider
            value={{
                connection, 
                messages,
                getMessage
            }}
        >
            {children}
        </SignalRContext.Provider>
    );

}
