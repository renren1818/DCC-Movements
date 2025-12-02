import { useBlocksContext } from "@/contexts/Blocks";
import { IBlockHook, IHDRow } from "@/interfaces/Blocks/Blocks";

import movementLocation from "/src/assets/images/movements/locationIcon.svg";
import movementPackage from "/src/assets/images/movements/packageIcon.svg";
import Image from "next/image";

import { useDialogBoxContext } from "@/contexts/DialogBox";
import { IDialog } from "@/interfaces/DialogBoxContext";
import React from "react";
import { BlockModes } from "@/enums/Blocks";

export default function useHighDensity(hook: IBlockHook) {

    const { currentMode, locations, toggleLocations, searchParams, currentQueue } = useBlocksContext();
    const { getDialog, openDialog } = useDialogBoxContext();
    const [slots, setSlots] = React.useState<IHDRow[]>(hook.items as IHDRow[]);

    React.useEffect(() => { setSlots(hook.items as IHDRow[]) }, [hook.items])

    const clickRow = (row: IHDRow) => {

        if (currentMode === BlockModes.SLOT_CONTROL) return;
        
        const error = IsNotAvailable(row);

        if (!error) {

            const reversedRows = slots.map((r) => r).reverse();
            const rowsToSelect = [];

            if (locations.items.length > 0 && row.Row < +locations.rowMin) {

                for (let i = +locations.rowMin - 1; i >= row.Row; --i) {
                    const thisRow = reversedRows[i-1];
                    if (!IsNotAvailable(thisRow)) rowsToSelect.push(thisRow);
                }

            } else if (locations.items.length > 0 && row.Row > +locations.rowMax) {

                for (let i = +locations.rowMax; i < row.Row; ++i) {
                    const thisRow = reversedRows[i];
                    if (!IsNotAvailable(thisRow)) rowsToSelect.push(thisRow);
                }

            } else {

                rowsToSelect.push(row);

            }

            rowsToSelect.map((item) => {
                toggleLocations({
                    id: item.LocationId,
                    block: +hook.location[0],
                    side: +hook.location[1],
                    row: item.Row,
                    level: 0,
                    slots: item.MaxPallet - item.Occupied,
                    enabled: item.IsAvailable
                })
            });

        } else {

            openDialog(error);

        }

    }

    const toggleSlot = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
        const targetId = +event.currentTarget.id;
        const location = slots.find((s) => s.LocationId === targetId);

        setSlots((prev) => {
            
            return prev.map((slot) => { return {
                ...slot,
                IsAvailable: slot.LocationId === targetId ? !slot.IsAvailable : slot.IsAvailable
            }})

        });

        toggleLocations({
            id: location!.LocationId,
            block: +hook.location[0],
            side: +hook.location[1],
            row: location!.Row,
            level: 0,
            slots: location!.MaxPallet ?? 40,
            enabled: !location!.IsAvailable
        });
        
        event.stopPropagation();

        
    }

    const indicators = (row: IHDRow) => 
        <>
            { 
                row.HasAssignedSku 
                && 
                <Image src={movementPackage.src} width={18} height={18} alt="" style={{ animation: row.HasMovement ? 'heartbeatAnim 0.8s infinite' : '' }} /> 
            }
            {   
                (
                    (searchParams.sku !== '' && searchParams.sku === row.Sku) 
                    || 
                    (
                        +row.BlockCode === searchParams.location?.block
                        &&
                        row.Side === searchParams.location?.side
                        && 
                        row.Row >= searchParams.location?.rowFrom && row.Row <= searchParams.location?.rowTo
                    )
                )
                && 
                <Image src={movementLocation.src} width={18} height={18} alt="" style={{ animation: 'heartbeatAnim 0.8s infinite' }} /> 
            }
        </>

    const isSelected = (locationId: number) => locations.items.find((l) => l.id === locationId);

    const IsNotAvailable = (slot: IHDRow) => {
    
        let error = 0;

        if (!slot.IsAvailable) error = 105;
        else if (slot.Sku && currentQueue?.Sku && slot.Sku !== currentQueue?.Sku) error = 106;
        else if (slot.AssignmentCount || (slot.Occupied == slot.MaxPallet) || slot.HasAssignedSku) error = 107;
        
        const dialog = getDialog(error);

        return error === 106 ? {...dialog, message: `${dialog?.message} ${slot.Sku}`} as IDialog : dialog;

    }

    return {
        currentMode,
        slots,
        clickRow,
        toggleSlot,
        isSelected,
        IsNotAvailable,
        searchParams,
        indicators
    }

}
