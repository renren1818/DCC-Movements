'use client';

import GridLayout from "react-grid-layout";

import { IGridLayout } from "@/interfaces/Blocks/Blocks";
import useMap from "@/hooks/Blocks/Map";
import { useSession } from "@/contexts/Session";
import { useBlocksContext } from "@/contexts/Blocks";
import { redirect } from "next/navigation";

export default function Map() {

    const session = useSession();
    const { searchParams } = useBlocksContext();
    const map = useMap();

    return (
        <GridLayout
            className='layout'
            layout={map.items}
            cols={40}
            rowHeight={session.isTablet ? 48 : 42 }
            width={ session.isTablet ? 1500 : 1500 }
            verticalCompact={false}
            isResizable={false}
            isDraggable={false}
            style={{ margin: '10px 85px' /* margin: session.isTablet ? '10px 120px' : '10px 80px', zoom: session.isTablet ? 0.6 : 1 */ }}
        >
            { 
                map.items.map((block: IGridLayout) => map.renderBlock(
                    {
                        skuBlocks: searchParams.blocks!,
                        onClick: (block) => redirect(`blocks/${block.Code}`)
                    }, 
                    block
                )) 
            }
        </GridLayout>

    );

}

