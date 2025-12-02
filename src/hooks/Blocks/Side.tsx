import React from "react";
import { useFetcher } from "../Fetcher";
import { IBlockHook, ILevelLocation, ISide } from "@/interfaces/Blocks/Blocks";
import { useBlocksContext } from "@/contexts/Blocks";

import movementLocation from "/src/assets/images/movements/locationIcon.svg";
import movementPackage from "/src/assets/images/movements/packageIcon.svg";
import Image from "next/image";

import { useDialogBoxContext } from "@/contexts/DialogBox";
import { IDialog } from "@/interfaces/DialogBoxContext";
import { BlockModes } from "@/enums/Blocks";

export default function useSide(hook: IBlockHook) {

    const fetcher = useFetcher();

    const { currentMode, locations, toggleLocations, searchParams, currentQueue, refreshTime } = useBlocksContext();
    const { getDialog, openDialog } = useDialogBoxContext();

    const [levels, setLevels] = React.useState<ISide[]>([]);

    React.useEffect(() => {

        fetcher.POST("OutboundBlock/GetBlockLowDensitySideViewListPerLevel", {
            blockCode: hook.block?.Code,
            side: hook.location[1] ?? 1
        }).then((result) => setLevels((result.data.data as ISide[])));

    }, [refreshTime, hook.block?.Code, hook.location]); // eslint-disable-line react-hooks/exhaustive-deps

    const clickSlot = (location: string[], row: ILevelLocation) => {

        if (currentMode === BlockModes.SLOT_CONTROL) return;

        const error = IsNotAvailable(row);

        if (!error) {

            toggleLocations({
                id: row.LocationId,
                block: +location[0],
                side: +location[1],
                row: row.Row,
                level: row.Level,
                slots: 1,
                enabled: row.IsAvailable
            });

        } else {

            openDialog(error);

        }

    }

    const toggleSlot = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const targetId = +event.currentTarget.id;
        const location = levels.map((l) => l.Locations).flat().find((ll) => ll.LocationId === targetId);

        setLevels((prev) => {

            return prev.map((l) => {
                return {
                    BlockType: l.BlockType,
                    Locations: l.Locations.map((ll) => {

                        return {
                            ...ll,
                            IsAvailable: ll.LocationId === targetId ? !ll.IsAvailable : ll.IsAvailable
                        }
                    }),
                    PercentByRow: l.PercentByRow
                }
            })

        });

        toggleLocations({
            id: location!.LocationId,
            block: +hook.location[0],
            side: +hook.location[1],
            row: location!.Row,
            level: location!.Level,
            slots: 1,
            enabled: !location?.IsAvailable
        });

        event.stopPropagation();


    }

    const isSelected = (locationId: number) => locations.items.find((l) => l.id === locationId);

    const IsNotAvailable = (slot: ILevelLocation) => {

        let error = 0;

        if (!slot.IsAvailable) error = 105;
        else if (slot.Sku && currentQueue?.SKU && slot.Sku !== currentQueue?.SKU) error = 106;
        else if (slot.HasMovement || slot.IsOccupied || slot.HasAssignedSku) error = 107;

        const dialog = getDialog(error);

        return error === 106 ? { ...dialog, message: `${dialog?.message} ${slot.Sku}` } as IDialog : dialog;

    }

    const indicators = (row: ILevelLocation) =>
        <>
            {
                row.HasAssignedSku
                &&
                <Image src={movementPackage.src} width={18} height={18} alt="" style={{ animation: row.HasMovement ? 'heartbeatAnim 0.8s infinite' : '' }} />
            }
            {
                (
                    (searchParams.sku && row.Sku === searchParams.sku)
                    ||
                    (
                        (hook.block && +hook.block.Code! === searchParams.location?.block)
                        &&
                        +hook.location[1] === searchParams.location?.side
                        &&
                        (row.Row >= searchParams.location?.rowFrom && row.Row <= searchParams.location?.rowTo)
                        &&
                        (row.Level >= searchParams.location?.levelFrom && row.Level <= searchParams.location?.levelTo)
                    )
                )
                &&
                <Image src={movementLocation.src} width={18} height={18} alt="" style={{ animation: 'heartbeatAnim 0.8s infinite' }} />
            }
        </>

    return {
        currentMode,
        clickSlot,
        toggleSlot,
        levels,
        toggleLocations,
        isSelected,
        IsNotAvailable,
        searchParams,
        indicators
    };

}