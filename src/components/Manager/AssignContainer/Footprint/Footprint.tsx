import { IInvalidFootprintProps } from "@/interfaces/AssignContainer/InvalidFootprint";
import FootprintHeader from "./FootprintHeader";
import FootprintReportForm from "./FootprintReportForm";
import { Box } from "@mui/material";

function Footprint({ ContainerNumber, DoorCode, reports }: IInvalidFootprintProps) {
    return (
        <>
            <FootprintHeader DoorCode={DoorCode} ContainerNumber={ContainerNumber} />

            {reports.length > 0 && (
                <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2} mt={2}>
                    {reports.map((report) => (
                        <FootprintReportForm key={report.Id} report={report} />
                    ))}
                </Box>
            )}
        </>
    );
}

export default Footprint;
