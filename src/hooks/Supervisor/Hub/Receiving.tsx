import { useDialogBoxContext } from "@/contexts/DialogBox";
import { useHubContext } from "@/contexts/Hub";
import { useSession } from "@/contexts/Session";
import { useSignalRContext } from "@/contexts/SignalR";
import { ReportStatus, UpcStatus } from "@/enums/Hub";
import { useFetcher } from "@/hooks/Fetcher";
import { IPoDetails, IPoItem } from "@/interfaces/Hub/Door";
import { IDoorTeamDetails, ILpnDialog, ILpnExpiry } from "@/interfaces/Hub/Receiving";
import { ISku } from "@/interfaces/Hub/Sku";
import React from "react";

export default function useReceiving(po: IPoDetails | undefined, sku: ISku) {

    const fetcher = useFetcher();
    const signalr = useSignalRContext();

    const { user } = useSession();
    const { currentDoor, refresh } = useHubContext();
    const { openDialog } = useDialogBoxContext();
    
    const [currentUPC, setCurrentUPC] = React.useState<IPoItem>();
    const [doorTeamDetails, setDoorTeamDetails] = React.useState<IDoorTeamDetails>();

    const [scannedUpc, setScannedUpc] = React.useState('');
    const [totalCases, setTotalCases] = React.useState(0);
    const [isConfigurationCorrect, setIsConfigurationCorrect] = React.useState('');
    const [isPalletized, setIsPalletized] = React.useState('');
    const [hasCaseCode, setHasCaseCode] = React.useState('');

    const [lpns, setLpns] = React.useState<ILpnExpiry[]>([]);
    const [lpnDialog, setlpnDialog] = React.useState<ILpnDialog>({
        open: false, 
        full: false, 
        nonConforming: false, 
        close: () => setlpnDialog((prev) => ({...prev, open: false})),
        onPrint: (lpns) => {
            if (lpns.length > 0) {
                setLpns(lpns);
            } else {
                refresh();
            }
        }
    });

    const fetchDetails = () => {

        fetcher.GET(`DoorTeamDetail/GetDoorTeamDetailsByIdSku?doorTeamId=${currentDoor?.DoorTeamId}&sku=${sku.Sku}&po=${sku.PurchaseOrderNumber}`).then((result) => {

            const doorTeam = result.data.data as IDoorTeamDetails;

            if (doorTeam) {
                
                setDoorTeamDetails(doorTeam);
                setCurrentUPC(po?.Items.find((i) => i.Upc === doorTeam.Upc));

                setTotalCases(doorTeam.TotalCase);
                setIsConfigurationCorrect(`${doorTeam.IsConfigurationCorrect ?? ''}`);
                setIsPalletized(`${doorTeam.IsPalletize ?? ''}`);
                setHasCaseCode(`${doorTeam.HasCaseCode ?? ''}`);

            }

        });

    }

    React.useEffect(() => fetchDetails(), [po, sku]);

    React.useEffect(() => {

        const message = signalr.getMessage(['GETINBOUNDREPORTS']);

        console.log('GETINBOUNDREPORTS', message);

        if (message) {

            setTimeout(() => {
                fetchDetails();    
            }, 500);
            
        }

    }, [signalr.messages])

    const createReport = (upc: string, description: string) => {

        fetcher.POST('InboundOutboundReport/CreateReport', {
            Upc: upc,
            asnNumber: currentDoor?.Asn,
            description: description,
            doorTeamId: currentDoor?.DoorTeamId,
            isInbound: true,
            itemId: sku.Sku,
            purchaseOrderNumber: sku.PurchaseOrderNumber,
            status: ReportStatus.OPEN,
            totalCases: totalCases,
            userId: user?.UserId
        }).then(fetchDetails);

    }


    const checkUpc = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter' && scannedUpc !== '') {

            fetcher.GET(`PurchaseOrder/CheckUPC?upc=${scannedUpc}&itemId=${sku.Sku}`).then((result) => {

                switch (result.data as UpcStatus) {

                    case UpcStatus.OK:

                        fetcher.POST('DoorTeamDetail/CreateDetails', {
                            DoorTeamlId: currentDoor?.DoorTeamId,
                            PurchaseOrderNumber: sku.PurchaseOrderNumber,
                            Upc: scannedUpc.trim()
                        }).then(() => fetchDetails());

                        break;

                    case UpcStatus.INVALID:

                        openDialog(301, () => createReport(scannedUpc, "Invalid UPC"));
                        
                        break;

                    case UpcStatus.MISMATCHED:

                        openDialog(302, () => createReport(scannedUpc, "UPC does not match"));
                        
                        break;

                }

                setScannedUpc('');

            });

        } 

    }

    const investigate = () => {

        openDialog(303, () => {
             createReport(currentUPC!.Upc, 'Case count does not match');
             fetchDetails();
        });

    }

    const toggleIsConfigurationCorrect = async (value: string) => {

        const toggle = value ? value.startsWith(":") ? value.substring(1) : value : 'false';

        if (toggle !== isConfigurationCorrect) {

            const result = await fetcher.PUT('DoorTeamDetail/Configuration', {
                TotalCase: totalCases,
                doorTeamDetailId: doorTeamDetails?.DoorTeamDetailId,
                doorTeamId: doorTeamDetails?.DoorTeamId,
                IsConfigurationCorrect: toggle === 'true'
            });

            if (result.status === 200) {
                setIsConfigurationCorrect(toggle);
                if (toggle === 'false') openDialog(306, () => createReport(currentUPC?.Upc!, "Invalid Configuration"));
            };

        }

    }

    const toggleIsPalletized = async (value: string) => {

        const toggle = value.startsWith(":") ? value.substring(1) : value;

        if (toggle !== isPalletized) {

            const result = await fetcher.PUT('DoorTeamDetail/UpdateIsPalletize', {
                TotalCase: totalCases,
                doorTeamDetailId: doorTeamDetails?.DoorTeamDetailId,
                doorTeamId: doorTeamDetails?.DoorTeamId,
                isPalletize: toggle === 'true'
            });

            if (result.data.Success === true) setIsPalletized(toggle);

        }

    }

    const toggleHasCaseCode = async (value: string) => {

        const toggle = value.startsWith(":") ? value.substring(1) : value;

        if (toggle !== hasCaseCode) {

            const result = await fetcher.PUT('DoorTeamDetail/UpdateHasCaseCode', {
                TotalCase: totalCases,
                doorTeamDetailId: doorTeamDetails?.DoorTeamDetailId,
                doorTeamId: doorTeamDetails?.DoorTeamId,
                hasCaseCode: toggle === 'true'
            });

            if (result.data.Success === true) setHasCaseCode(toggle);

        }

    }

    const addLpnExpiry = () => {

        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);

        console.log('DATE1 =>', today);
        while (lpns.some((lpn) => lpn.ExpiryDate.getTime() == today.getTime())) {
            today.setDate(today.getDate() + 1);
            console.log('DATE2 =>', today);
        }

        console.log('LPNS', lpns);

        setLpns([...lpns, { ExpiryDate: today, PalletCount: 0, IsNonConformingPallets: false }])

    }

    const toggleLpnDialog = (full?: boolean) => setlpnDialog((prev => ({...prev, open: !prev.open, full: full ?? prev.full })));

    const status = () => {

        switch (doorTeamDetails?.Status) {

            case ReportStatus.RECEIVE:

                return 'Receive';

            case ReportStatus.FORCERECEIVE:

                return 'Force Receive';

            case ReportStatus.MOVETOHOLDZONE:

                return 'Move to Hold zone';

            case ReportStatus.OVERRIDEFOOTPRINT:

                return 'Configuration Override';

            default:

                return doorTeamDetails?.Description && doorTeamDetails.Status !== ReportStatus.CLOSED ? `Reported to Manager: ${doorTeamDetails?.Description}` : '';

        }

    }

    const matchedCases = currentUPC && ((sku.POQuantity / currentUPC.UnitQuantity) === totalCases);

    const matchedUPC = doorTeamDetails && !['Invalid UPC', 'UPC does not match'].includes(doorTeamDetails?.Description);
    
    const enabledCases = doorTeamDetails;

    const lockedCases = doorTeamDetails && (
        [ ReportStatus.FORCERECEIVE, ReportStatus.MOVETOHOLDZONE].includes(doorTeamDetails.Status)
        ||
        status().startsWith("Reported")
        ||
        lpns.length > 0
        ||
        isConfigurationCorrect === ''
    );

    const canAddLpns = (
        isConfigurationCorrect !== '' && isPalletized !== '' && hasCaseCode !== '' && 
        enabledCases && 
        (matchedCases || (!matchedCases && lockedCases )) && 
        !status().startsWith("Reported")
    );

    const canReceive = lpns.length > 0 && !lpns.some(lpn => lpn.PalletCount < 1 );

    return {

        doorTeamDetails,
        currentUPC,
        scannedUpc, setScannedUpc,
        checkUpc,
        investigate,
        totalCases, setTotalCases,
        isConfigurationCorrect, toggleIsConfigurationCorrect,
        isPalletized, toggleIsPalletized,
        hasCaseCode, toggleHasCaseCode,
        addLpnExpiry,
        status: status(),
        matchedUPC,
        matchedCases,
        enabledCases,
        lockedCases,
        canAddLpns,
        canReceive,
        lpns, setLpns,
        lpnDialog, toggleLpnDialog
        
    }

}