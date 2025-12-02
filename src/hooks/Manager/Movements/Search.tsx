import React from "react";
import { useBlocksContext } from "@/contexts/Blocks";
import { ISearchLocation } from "@/interfaces/BlocksContext";

export default function useSearch() {

    const { setSearchParameters } = useBlocksContext();

    const [currentTab, setCurrentTab] = React.useState(0);
    const [sku, setSku] = React.useState('');
    const [location, setLocation] = React.useState<ISearchLocation>();
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };
    
    const handleSkuSearch = () => setSearchParameters({ sku });
    const handleLocationSearch = () => setSearchParameters({ location });
    
    const clearSkuSearch = () => {
        setSku('');
        setSearchParameters({ sku: '' });
    } 

    return  {
        currentTab, 
        handleTabChange,
        sku, setSku,
        location, setLocation,
        handleSkuSearch,
        clearSkuSearch,
        handleLocationSearch
    };

}