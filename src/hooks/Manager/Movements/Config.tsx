import React from "react";
import { useBlocksContext } from "@/contexts/Blocks";
import { useFetcher } from "@/hooks/Fetcher";
import { useDialogBoxContext } from "@/contexts/DialogBox";
import { IDialog } from "@/interfaces/DialogBoxContext";
import { BlockModes, BlockTypes } from "@/enums/Blocks";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";

export default function useConfig() {

    const { blocks, locations, toggleMode,  refresh } = useBlocksContext();
    const { openDialog } = useDialogBoxContext();

    const fetcher = useFetcher();
    const pathname = usePathname();

    const [currentTab, setCurrentTab] = React.useState(0);
    const [sku, setSku] = React.useState('');
    const [pallets, setPallets] = React.useState(40);
    const [editMode, setEditMode] = React.useState(false);
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSku('');
        toggleMode(newValue === 0 ? BlockModes.SLOT_SKU : BlockModes.SLOT_CONTROL);
        setCurrentTab(newValue);
    };
    
    const isHD = [BlockTypes.HIGH, BlockTypes.HIGH_MINI].includes(blocks.find((b) => b.Code === pathname.split('/')[4])!.BlockType);

    const handleToggleSlot = async () => {

        if (editMode) await fetcher.POST('location/update-max-pallet', { LocationId: locations.items.map((l) => l.id), MaxPallet: pallets });

        const result = await fetcher.PATCH(`location/UpdateLocationAvailability`, locations.items.map((location) => ({
            isAvailable: location.enabled,
            locationId: location.id,
            locationName: `${location.block.toString().padStart(2, '0')}-${location.side}-${location.row.toString().padStart(2, '0')}-${location.level}`,
            maxPallets: location.slots
        })));

        if (result.data.Success === true) {

            const disabledSlots = locations.items.filter((l) => l.enabled === false);
            const enabledSlots = locations.items.filter((l) => l.enabled === true);
            const adjustedSlots = locations.items.filter((l) => l.slots !== pallets);

            const disabledMessage = 
                disabledSlots.length === 0
                ?
                undefined
                :
                disabledSlots.length <= 2
                ?
                <Typography paddingBottom={2}>Slots {disabledSlots.map((s) => `${s.block.toString().padStart(2, '0')}-${s.side}-${s.row.toString().padStart(2, '0')}-${s.level}`).join(', ')} have been successfully disabled.</Typography>
                :
                <Typography paddingBottom={2}>Slots {disabledSlots.slice(0, 2).map((s) => `${s.block.toString().padStart(2, '0')}-${s.side}-${s.row.toString().padStart(2, '0')}-${s.level}`).join(', ')}, and {disabledSlots.length - 2} others have been successfully disabled.</Typography>

            const enabledMessage = 
                enabledSlots.length === 0
                ?
                undefined
                :
                enabledSlots.length <= 2
                ?
                <Typography paddingBottom={2}>Slots {enabledSlots.map((s) => `${s.block.toString().padStart(2, '0')}-${s.side}-${s.row.toString().padStart(2, '0')}-${s.level}`).join(', ')} have been successfully enabled.</Typography>
                :
                <Typography paddingBottom={2}>Slots {enabledSlots.slice(0, 2).map((s) => `${s.block.toString().padStart(2, '0')}-${s.side}-${s.row.toString().padStart(2, '0')}-${s.level}`).join(', ')}, and {enabledSlots.length - 2} others have been successfully enabled.</Typography>

            const adjustedMessage = 
                adjustedSlots.length === 0 || !editMode
                ?
                undefined
                :
                adjustedSlots.length <= 2
                ?
                <Typography paddingBottom={2}>Slots {adjustedSlots.map((s) => `${s.block.toString().padStart(2, '0')}-${s.side}-${s.row.toString().padStart(2, '0')}-${s.level}`).join(', ')} have been successfully updated from {Math.min(...adjustedSlots.map((s) => s.slots))} to {pallets} slots.</Typography>
                :
                <Typography paddingBottom={2}>Slots {adjustedSlots.slice(0, 2).map((s) => `${s.block.toString().padStart(2, '0')}-${s.side}-${s.row.toString().padStart(2, '0')}-${s.level}`).join(', ')}, and {adjustedSlots.length - 2} others have been successfully updated from {Math.min(...adjustedSlots.map((s) => s.slots))} to {pallets} slots.</Typography>


            openDialog({ 
                type: 'success', 
                title: 'Success', 
                message: 
                <>
                    { disabledMessage }
                    { enabledMessage }
                    { adjustedMessage }
                </>

                
            } as IDialog);

            refresh();
            
        } else {

            openDialog({ type: 'error', title: 'Unexpected Error', message: result.data.ErrorMessage } as IDialog);

        }

    }

    const toggleEditMode = () => setEditMode((prev) => !prev);

    const handleAssignSku = async () =>  {
     
        const result = await fetcher.POST(`location/AssignSkuToLocation`, { 
            LocationIds: locations.items.map((location) => location.id),
            Sku: sku,
            SlotCount: locations.items.length > 0 ? locations.items[0].slots : 0
        });

        if (result.data.Success === true) {

            refresh();

            openDialog({ 
                type: 'success', 
                title: 'Success', 
                message: `SKU ${sku} has been successfully mapped to locations ${locations.items[0].block.toString().padStart(2, '0')} — ${locations.items[0].side} — ${locations.rowMin.padStart(2, '0')}-${locations.rowMax.padStart(2, '0')} — ${locations.levelMin}-${locations.levelMax}`
            } as IDialog);
            
        } else {

            openDialog({ type: 'error', title: 'Unexpected Error', message: result.data.ErrorMessage } as IDialog);

        }

    }

    const clearSku = () => setSku('');
    
    return  {
        currentTab, 
        handleTabChange,
        sku, setSku,
        pallets, setPallets,
        editMode, setEditMode,
        locations,
        handleAssignSku,
        handleToggleSlot,
        clearSku,
        toggleEditMode,
        isHD
    };

}