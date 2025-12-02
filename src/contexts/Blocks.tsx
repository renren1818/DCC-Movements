'use client';

import React from 'react';
import { IBlock, IGridLayout, ILocation } from '@/interfaces/Blocks/Blocks';
import { useFetcher } from '@/hooks/Fetcher';
import { ILocations, ISearchParams } from '@/interfaces/BlocksContext';
import { BlockModes } from '@/enums/Blocks';
// import { IQueueDetail } from '@/interfaces/Movements/MyQueue';
import { useSignalRContext } from './SignalR';

interface BlocksContextProps { children: React.ReactNode };

interface IBlocksContext {

    currentMode: BlockModes;
    toggleMode: (mode: BlockModes) => void;

    currentQueue?: IQueueDetail;
    setQueue: (queue: IQueueDetail) => void;

    blocks: IGridLayout[];
    locations: ILocations;
    toggleLocations: (location: ILocation) => void;

    searchParams: ISearchParams;
    setSearchParameters: (params: ISearchParams) => void;

    refreshTime: number;
    refresh: () => void;

}

const BlocksContext = React.createContext<IBlocksContext>({} as IBlocksContext);

export const useBlocksContext = () => {

    return React.useContext(BlocksContext);

}

export default function BlocksContextProvider({ children }: BlocksContextProps) {

    const fetcher = useFetcher();
    const signalr = useSignalRContext();

    const [currentMode, setCurrentMode] = React.useState<BlockModes>(BlockModes.SEARCH);
    const [currentQueue, setCurrentQueue] = React.useState<IQueueDetail>();
    const [blocks, setBlocks] = React.useState<IGridLayout[]>([]);
    const [locations, setLocations] = React.useState<ILocations>({ items: [], rowMin: '', rowMax: '', levelMin: '', levelMax: '' });
    const [searchParams, setSearchParams] = React.useState<ISearchParams>({ sku: '', location: undefined, blocks: [] });
    const [refreshTime, setRefreshTime] = React.useState<number>(0); // for refreshing components

    const fetchBloocks = () => {

        fetcher.GET("OutboundBlock/GetBlockList").then((result) => {

            setBlocks([
                ...result.data.data.data
                    .filter((d: IBlock) => d.Layout)
                    .map((block: IBlock) => {
                        return {
                            ...block,
                            i: block.Code,
                            x: block.Layout?.GridX,
                            y: block.Layout?.GridY,
                            w: block.Layout?.ColumnSpan,
                            h: block.Layout?.RowSpan,
                        };
                    }),
            ]);

        });

    }

    React.useEffect(() => fetchBloocks(), [refreshTime]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {

        if (signalr.getMessage(['REFRESHLOCATION'])) fetchBloocks();

    }, [signalr.messages]);

    const toggleMode = (mode: BlockModes) => setCurrentMode(mode);

    const setQueue = (queue: IQueueDetail) => setCurrentQueue(queue);

    const toggleLocations = (location: ILocation) => {

        setLocations(prevLocations => {

            const filteredItems = prevLocations.items.filter((i) => i.block === location.block && i.side === location.side);
            const exists = filteredItems.find((l) => l.id === location.id);
            const toggledEnabled = exists?.enabled !== location.enabled;
            const locations: ILocation[] =
                exists && !toggledEnabled ?
                    filteredItems.filter((l) => l.id !== location.id)
                    :
                    [...filteredItems.filter((fi) => fi.id !== location.id), location];

            const rows = locations.map((l) => l.row);
            const levels = locations.map((l) => l.level);

            return {
                items: locations,
                rowMin: rows.length > 0 ? Math.min(...rows).toString() : '',
                rowMax: rows.length > 0 ? Math.max(...rows).toString() : '',
                levelMin: levels.length > 0 ? Math.min(...levels).toString() : '',
                levelMax: levels.length > 0 ? Math.max(...levels).toString() : ''
            }

        });

    }

    const setSearchParameters = async (params: ISearchParams) => {

        setSearchParams({
            sku: params.sku!,
            location: params.location!,
            blocks: params.sku ? (await fetcher.GET(`OutboundLocation/SearchLocationBySKU?sku=${params.sku}`)).data : []
        });

    }

    const refresh = () => {
        setLocations({ items: [], rowMin: '', rowMax: '', levelMin: '', levelMax: '' });
        setCurrentQueue(undefined);
        setRefreshTime(Date.now());
    }

    return (
        <BlocksContext.Provider
            value={{
                currentMode,
                toggleMode,
                blocks,
                locations,
                toggleLocations,
                searchParams,
                setSearchParameters,
                currentQueue,
                setQueue,
                refresh,
                refreshTime
            }}
        >
            {children}
        </BlocksContext.Provider>
    );

}
