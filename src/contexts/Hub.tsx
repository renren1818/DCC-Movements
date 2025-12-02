"use client";

import React, { useState } from "react";
import { useFetcher } from "@/hooks/Fetcher";
import { IMyQueue } from "@/interfaces/Hub/MyQueue";
import { useSession } from "./Session";
import { useSignalRContext } from "./SignalR";
import { ISku } from "@/interfaces/Hub/Sku";

interface IHubContextProps {
  children: React.ReactNode;
}

interface IHubContext {
  team: string;
  doors: IMyQueue[];
  currentDoor?: IMyQueue;
  changeDoor: (asn: string) => void;

  refreshTime: number;
  refresh: () => void;

  currentSku: ISku | undefined;
  setCurrentSku: React.Dispatch<React.SetStateAction<ISku | undefined>>;
}

const HubContext = React.createContext<IHubContext>({} as IHubContext);

export const useHubContext = () => {
  return React.useContext(HubContext);
};

export default function BlocksContextProvider({ children }: IHubContextProps) {
  const session = useSession();
  const fetcher = useFetcher();
  const signalr = useSignalRContext();

  const [team, setTeam] = React.useState("");
  const [doors, setDoors] = React.useState<IMyQueue[]>([]);
  const [currentDoor, setCurrentDoor] = React.useState<IMyQueue>();
  const [currentSku, setCurrentSku] = React.useState<ISku>();
  const [refreshTime, setRefreshTime] = React.useState<number>(0); // for refreshing components

  React.useEffect(() => {
    if (signalr.getMessage(["GETCURRENTSUPERVISORPANEL", "SEAL_NUMBER_UPDATED"])) refresh();
  }, [signalr.messages]);

  React.useEffect(() => {
    fetcher.GET(`DoorTeam/CurrentSupervisorPanel?userId=${session.user?.UserId}`).then((result) => {
      setTeam(session.user!.TeamColor);
      setDoors(result.data.data);
      if (currentDoor) setCurrentDoor((prev) => result.data.data.find((d: any) => d.Asn === prev?.Asn));
    });
  }, [refreshTime]); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = () => {
    setRefreshTime(Date.now());
  };

  const changeDoor = (asn: string) => {
    setCurrentDoor(doors.find((door) => door.Asn === asn));
    refresh();
  };

  return (
    <HubContext.Provider
      value={{
        team,
        doors,
        currentDoor,
        changeDoor,
        refresh,
        refreshTime,
        currentSku,
        setCurrentSku,
      }}
    >
      {children}
    </HubContext.Provider>
  );
}
