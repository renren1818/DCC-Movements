import { useHubContext } from "@/contexts/Hub";
import { useSession } from "@/contexts/Session";
import { useFetcher } from "@/hooks/Fetcher";
import { ILpn, ILpnDialog, ILpnExpiry, ILpnParams } from "@/interfaces/Hub/Receiving"
import React from "react";

import  jsPDF from "jspdf";
import JsBarcode from 'jsbarcode';
import axios from "axios";

export default function useLpn(lpnDialog: ILpnDialog, lpns: ILpnExpiry[], params: ILpnParams) {

    const { user } = useSession();
    const { currentDoor } = useHubContext();

    const fetcher = useFetcher();

    const [ printers, setPrinters ] = React.useState<string[]>([]);
    const [ currentExpiry, setCurrentExpiry ] = React.useState('');
    const [ currentLpn, setCurrentLpn ] = React.useState<ILpnExpiry>();
    const [ currentPrinter, setCurrentPrinter ] = React.useState('');

    React.useEffect(() => {
        fetch('/settings/printers.json')
            .then((result) => result.json())
            .then((data) => setPrinters(data));
    }, []);

    React.useEffect(() => {
        setCurrentExpiry('');
        setCurrentLpn(undefined);
    }, [lpns]);

    const formattedExpiryDate = (dateObj: Date) => `${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}-${dateObj.getFullYear()}`;

    const handleExpiryChange = (value: string) => {

        const targetLpn = lpns.find((lpn) => formattedExpiryDate(lpn.ExpiryDate) === value);

        setCurrentExpiry(value);
        setCurrentLpn(targetLpn);

    }

    const printLpns = async (lpns: ILpn[]) => {

        lpns.map(async (lpn) => {

            await axios({
                method: 'post',
                url: printers[+currentPrinter],
                data: `^XA^FO30,30^GB750,1150,5^FS^FB1150,1,0,C,0^FO680,50^A0R,60,75^FDDC CALAMBA\\&^FS^FB1150,1,0,C,0^FO360,70^BY6^BCR,300,N,N,N,N^FD${lpn.LpnCode}^FS^FB1150,1,0,C,0^FO210,50^A0R,120,150^FD${lpn.LpnCode}\\&^FS^FB1150,1,0,C,0^FO150,50^A0R,60,75^FDEXPIRATION DATE: ${formattedExpiryDate(lpn.ExpiryDate)}\\&^FS^FB1150,1,0,C,0^FO80,50^A0R,60,75^FDSKU: ${lpn.SKU}\\&^FS^FB1150,1,0,R,0^FO35,15^A0R,30,35^FDQTY: ${lpn.Quantity}${lpn.IsNonConformingPallets ? ' - NON CONFORMING PALLET' : ''}^FS^XZ`,
            });

        });

    }

    const generatePdf = async (lpns: ILpn[]) => {

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [101.6, 152.4], // Set format to 4x6 inches (101.6mm x 152.4mm)
            putOnlyUsedFonts: true,
            floatPrecision: 16,
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const borderMargin = 5;

        const labelYSpacing = 2; // Y position for the label relative to the page
        const labelToBarcodeSpacing = 1; // Space between label and barcode
        const barcodeHeight = 50; // Height for each barcode image
        const textYPosition = 120; // Position where text will start
        const spacing = -90; // Space between the barcodes on the same page

        const processedExpiryDates = new Set<Date>();
        let itemCount = 0;

        for (const lpn of lpns) {
            // Add a new page after every two items (two barcodes per page)
            if (itemCount === 1) {
                pdf.addPage();
                itemCount = 0; // Reset the count
            }

            pdf.setDrawColor(0); // Set draw color to black
            pdf.setLineWidth(0.5); // Set line width (adjust as needed)
            pdf.rect(
                borderMargin, // Start X position
                borderMargin, // Start Y position
                pageWidth - borderMargin * 2, // Width with margin on both sides
                pageHeight - borderMargin * 2, // Height with margin on both sides
            );

            const currentYPosition = margin + (barcodeHeight + textYPosition + spacing) * itemCount;

            pdf.setFontSize(16); // Adjust font size as needed
            
            const labelText = user!.DCName;
            const labelWidth = pdf.getTextWidth(labelText);
            const labelXPosition = (pageWidth - labelWidth) / 2;

            pdf.text(labelText, labelXPosition, currentYPosition);

            const canvas = document.createElement('canvas');
                JsBarcode(canvas, lpn.LpnCode, {
                format: "CODE128",
                width: 12,
                height: 400,
                displayValue: true,
                fontSize: 200,
                font: "Arial",
            });

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, currentYPosition + labelYSpacing + labelToBarcodeSpacing, pageWidth - margin * 2, barcodeHeight);

            pdf.setFontSize(25);

            const dateObj = new Date(lpn.ExpiryDate);
            const formattedExpiryDate = `${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}-${dateObj.getFullYear()}`;

            const text = `EXPIRATION DATE: ${formattedExpiryDate}`;
            const textWidth = pdf.getTextWidth(text);
            const xPosition = (pageWidth - textWidth) / 2;
            const topMargin = 5;

            pdf.text(
                text,
                xPosition,
                currentYPosition +
                labelYSpacing +
                labelToBarcodeSpacing +
                barcodeHeight +
                5 +
                topMargin,
            );

            pdf.setFontSize(25);
            const skuText = `SKU: ${lpn.SKU}`;
            const skuWidth = pdf.getTextWidth(skuText);
            const skuXPosition = (pageWidth - skuWidth) / 2;

            pdf.text(
                skuText,
                skuXPosition,
                currentYPosition +
                labelYSpacing +
                labelToBarcodeSpacing +
                barcodeHeight +
                21,
            );

            pdf.setTextColor("black"); // Set text color to red
            pdf.setFontSize(12);
            const status = `QTY: ${lpn.Quantity}${lpn.IsNonConformingPallets ? ' - NON CONFORMING PALLET' : ''}`;
            const asteriskWidth = pdf.getTextWidth(status);

            const asteriskXPosition = pageWidth - asteriskWidth - 10;

            const asteriskYPosition =
            currentYPosition + barcodeHeight + 10 + topMargin + 15;
            pdf.text(status, asteriskXPosition, asteriskYPosition);

            pdf.setTextColor("black");

            if (lpn.IsNonConformingPallets && !processedExpiryDates.has(lpn.ExpiryDate)) processedExpiryDates.add(lpn.ExpiryDate);    
                
            itemCount++;

        }

        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
        const formattedTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
        const fileName = `LPN_Barcodes_${currentDoor?.PurchaseOrderNumber}-${formattedDate}_${formattedTime}.pdf`;
        pdf.save(fileName);

    }

    const generateLpns = async () => {

        const result = await fetcher.POST('lpn/CreateBatchLpn', {
            AsnId: params.asnId,
            BuildingId: user?.LocationId,
            Data: [],
            DcName: user?.DCName,
            DoorCode: currentDoor?.DoorCode,
            ExpiryDate: currentExpiry,
            IsNonConformingPallets: currentLpn?.IsNonConformingPallets,
            PurchaseOrderNumber: params.purchaseOrderNumber,
            Quantity: currentLpn?.PalletCount,
            TotalCase: params.totalCase,
            Upc: params.upc,
            UserId: user?.UserId       
        });

        const lpnCodes = result.data.batchLpn.data as ILpn[];

        if (printers[+currentPrinter] === 'DEBUG') {
            generatePdf(lpnCodes);
        } else {
            printLpns(lpnCodes);
        }

        if (lpnDialog.full) await fetcher.PUT(`DoorTeamDetail/UpdateIsCompleted?doorTeamDetailId=${params.doorTeamDetailId}&upc=${params.upc}`, { isCompleted: true });

        const remainingLpns = lpns.filter((lpn) => formattedExpiryDate(lpn.ExpiryDate) !== currentExpiry);
        
        setCurrentExpiry('');
        setCurrentLpn(undefined);

        lpnDialog.onPrint(remainingLpns);
        if (remainingLpns.length === 0) lpnDialog.close();
        

    }

    return {

        printers,
        formattedExpiryDate,
        currentExpiry,
        currentLpn,
        handleExpiryChange,
        currentPrinter, setCurrentPrinter,
        generateLpns

    }

}