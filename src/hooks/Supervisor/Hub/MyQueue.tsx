import { useHubContext } from "@/contexts/Hub";

export default function useMyQueue() {

    const { team, doors, changeDoor} = useHubContext();
    
    return {
        team,
        doors,
        changeDoor,
     
    }
}