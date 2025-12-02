import React from "react";
import { useBlocksContext } from "@/contexts/Blocks";
import { BlockTypes, BlockColors, BlockFullnessColors } from "@/enums/Blocks";
import { useFetcher } from "../Fetcher";
import { redirect } from "next/navigation";
import { ICommonRow, ICommonSide, IHDRow } from "@/interfaces/Blocks/Blocks";

export default function useBlock(location: string[]) {

  const { blocks, toggleLocations, refreshTime } = useBlocksContext();
  const fetcher = useFetcher();

  const [items, setItems] = React.useState<IHDRow[] | ICommonSide[]>([]);

  const block = blocks.find((b) => b.Code === location[0]);

  const blockType = Object.keys(BlockTypes)[Object.values(BlockTypes).indexOf(block?.BlockType as BlockTypes)];
  const colors = {
    block: BlockColors[blockType as keyof typeof BlockColors],
    fullness: BlockFullnessColors[blockType as keyof typeof BlockFullnessColors]
  };

  React.useEffect(() => {

    if (!block) return;

    if ([BlockTypes.HIGH, BlockTypes.HIGH_MINI].includes(block?.BlockType as BlockTypes)) {

      fetcher.POST("OutboundBlock/GetBlockHighDensitySideViewList", {
        blockCode: block?.Code,
        side: location[1] ?? 1
      }).then((result) => setItems((result.data.data as IHDRow[]).reverse()));
    } else {
      fetcher.GET(`OutboundLocation/GetLocationListByBlock?code=${block?.Code}`).then((result) => {
        const rows = result.data.data.map((d: { RowLocations: ICommonRow[] }, index: number) => {
          return {
            side: index + 1,
            rows: d.RowLocations
          } as ICommonSide
        });

        setItems(rows);
      });
    }
  }, [blocks, block, location, refreshTime]); // eslint-disable-line react-hooks/exhaustive-deps

  if ([BlockTypes.HIGH, BlockTypes.HIGH_MINI].includes(block?.BlockType as BlockTypes) && location.length === 1) redirect(`${location[0]}/1`);

  return {
    location,
    block,
    items,
    colors,
    toggleLocations
  };

}