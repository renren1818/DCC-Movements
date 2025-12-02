import { useBlocksContext } from "@/contexts/Blocks";
import { BlockModes, BlockTypes } from "@/enums/Blocks";
import { usePathname, useRouter } from "next/navigation";

export default function useActions() {

    const router = useRouter();
    const path = usePathname();
    const paths = path.split('/');

    const { blocks, currentMode, toggleMode } = useBlocksContext();

    const isActive = (id: BlockModes) => currentMode === id;
    const isDisabled = () => paths.length < 6;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

        switch (event.currentTarget.id) {

            case 'back':

                if ([BlockModes.SLOT_CONTROL, BlockModes.SLOT_SKU].includes(currentMode)) toggleMode(BlockModes.SEARCH);

                if (paths.length < 5) return;

                const block = blocks.find((b) => +b.Code! === +paths[4]);

                if ([BlockTypes.HIGH, BlockTypes.HIGH_MINI].includes(block?.BlockType ?? BlockTypes.SALVAGE)) {

                    router.push(`/manager/movements/blocks`);

                } else {

                    router.push(path.substring(0, path.lastIndexOf('/')));

                }

                break;

            default:

                toggleMode(+event.currentTarget.id as BlockModes);

        }

    }

    return {
        currentMode,
        isActive,
        isDisabled,
        handleClick
    }

}