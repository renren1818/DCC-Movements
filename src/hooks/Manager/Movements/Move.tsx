import React from "react";
import { useBlocksContext } from "@/contexts/Blocks";
import { ISearchLocation } from "@/interfaces/BlocksContext";
import { useFetcher } from "@/hooks/Fetcher";
import { useSession } from "@/contexts/Session";
import { useDialogBoxContext } from "@/contexts/DialogBox";
import { IDialog } from "@/interfaces/DialogBoxContext";
import { IAdvanceMovementAssignment, IMovementAssigment } from "@/interfaces/Movements/Move";

export default function useMove() {

    const { currentQueue, locations, refresh } = useBlocksContext();
    const { openDialog } = useDialogBoxContext();

    const fetcher = useFetcher();
    const session = useSession();

    const [currentTab, setCurrentTab] = React.useState(0);
    const [sku, setSku] = React.useState('');
    const [pickup, setPickup] = React.useState('');
    const [location, setLocation] = React.useState<ISearchLocation>();
    const [quantity, setQuantity] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const isNumber = !isNaN(+event.target.value);

        if (!isNumber) return;

        setQuantity(isNumber ? +event.target.value : 0);

    }

    const validateMove = () => {

        if (!currentQueue) openDialog(101);
        else if (!locations || locations.items.length === 0) openDialog(102);
        else if (quantity > currentQueue.Qty) openDialog(103);
        else if (quantity > locations.items.reduce((i, loc) => i = i + loc.slots, 0)) openDialog(104);
        else return true;

        return false;

    }

    const handleMove = async () => {

        if (!validateMove()) return;

        const locationIds = locations.items
            .sort((a, b) => a.slots > b.slots ? 1 : -1)
            .map((l) => Array(l.slots).fill(l.id))
            .flat();

        if (currentQueue?.SKU) {
            const result = await fetcher.POST('OutboundMovementAssignment/CreateMovementAssignment', {
                ASN: currentQueue.ASN!,
                StagingCode: currentQueue.StagingCode,
                UserId: session.user?.UserId,
                Upc: "68505",
                SKU: currentQueue.SKU!,
                // UpdatedBy: session.user?.UserId,
                PurchaseOrderNumber: currentQueue.PurchaseOrderNumber!,
                Movement: locationIds.slice(0, quantity).map((locationId) => {
                    return {
                        AislelId: 0,
                        CreatedBy: session.user?.UserId,
                        EquipmentId: 0,
                        From: 0,
                        LpnUpcId: 0,
                        MoveBy: session.user?.UserId,
                        To: locationId
                    }
                })
            } as IMovementAssigment);

            if (result.data.createMovement.Success === true) {
                openDialog(100);
            } else {
                openDialog({ type: 'error', title: 'Unexpected Error', message: result.data.ErrorMessage } as IDialog);
            }

        } else {

            const result = await fetcher.POST('OutboundMovementAssignment/CreateAdvanceMovementAssignment', {
                // AsnId: currentQueue?.AsnId,
                // UPC: currentQueue?.Upc,
                CreatedBy: session.user?.UserId,
                UpdatedBy: session.user?.UserId,
                // PurchaseOrderNumber: `${currentQueue?.PurchaseOrderNumber}`,
                To: locationIds.slice(0, quantity)
            } as IAdvanceMovementAssignment);

            if (result.data.Success === true) {

                openDialog(100);

            } else {

                openDialog({ type: 'error', title: 'Unexpected Error', message: result.data.ErrorMessage } as IDialog);

            }

        }

        refresh();

    };

    React.useEffect(() => {

        setSku(currentQueue?.SKU ?? '');
        setPickup(!currentQueue ? '' : currentQueue.StagingCode! === '' ? 'TBD' : `Staging ${currentQueue.StagingCode}`);

    }, [currentQueue]);

    React.useEffect(() => {

        if (locations.items.length > quantity) setQuantity(locations.items.length);

        setLocation({
            block: locations.items[0]?.block,
            side: locations.items[0]?.side,
            rowFrom: +locations.rowMin,
            rowTo: +locations.rowMax,
            levelFrom: +locations.levelMin,
            levelTo: +locations.levelMax
        } as ISearchLocation);

    }, [locations, quantity]);

    return {
        currentTab,
        handleTabChange,
        locations,
        sku,
        pickup,
        location, setLocation,
        quantity, handleQuantityChange,
        handleMove
    };

}