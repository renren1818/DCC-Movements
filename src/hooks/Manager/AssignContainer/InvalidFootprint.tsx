import { useSession } from "@/contexts/Session";
import { ReportAction } from "@/enums/ReportAction";
import { useFetcher } from "@/hooks/Fetcher";
import { IGetInboundReport } from "@/interfaces/Doors";
import { use, useState } from "react";
import { set } from "zod";

interface IInvalidFootprintReport {
    footprintData: string;
    asnNumber: string;
    action: ReportAction;
    inboundReportId: number;
    upc: string;
    sku: number;
    createdBy: number;
}

interface IFootprintUpdate {
    High: number;
    Tie: number;
    CasePerPallet: number;
    UnitQuantuty: number;
}

interface IError {
    High: boolean;
    Tie: boolean;
}

export default function useInvalidFootprint() {
    const { POST } = useFetcher();
    const session = useSession();
    const [footprintReport, setFootprintReport] = useState<IFootprintUpdate>({} as IFootprintUpdate);
    const [toast, setToast] = useState({ open: false, message: "" });
    const [submitted, setSubmitted] = useState<IError>({ High: false, Tie: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setSubmitted((prev) => ({
            ...prev,
            [name]: false,
        }));

        setFootprintReport((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateFootprintReportLog = async (reportData: IGetInboundReport, action: ReportAction) => {
        try {
            const newErrors: IError = {
                High: !footprintReport.High,
                Tie: !footprintReport.Tie,
            };

            if ((newErrors.High || newErrors.Tie) && action == ReportAction.OVERRIDECONFIGURATION) {
                setSubmitted(newErrors);
                setToast({ open: true, message: "Please complete all fields." });
                return;
            }
            const stringData = JSON.stringify(footprintReport);
            const dummyData: IInvalidFootprintReport = {
                footprintData: stringData,
                asnNumber: reportData.AsnNumber,
                action: action,
                inboundReportId: reportData.Id,
                upc: reportData.UPC.toString(),
                sku: reportData.Sku,
                createdBy: session.user?.UserId || 0,
            };
            const response = await POST("/InboundOutboundReportLog", dummyData);
        } catch (error) {}
    };

    return { footprintReport, handleCreateFootprintReportLog, handleChange, toast, setToast, submitted };
}
