import { ReportAction } from "@/enums/ReportAction";
import useInvalidFootprint from "@/hooks/Manager/AssignContainer/InvalidFootprint";
import { IGetInboundReport } from "@/interfaces/Doors";
import { Button, Divider, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";

export interface IFootprintReportFormProps {
    report: IGetInboundReport;
    onSubmit?: () => void;
    onDismiss?: () => void;
}

function FootprintReportForm({ report }: IFootprintReportFormProps) {
    const invalidFootprint = useInvalidFootprint();

    return (
        <Stack
            sx={{
                borderRadius: 2,
                boxShadow: 2,
                border: "1px solid #e0e0e0",
            }}
            direction="column"
            spacing={2}
            alignItems="flex-start"
            padding={2}
            paddingBottom={0}
            marginBottom={2}
            width={"30%"}
        >
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                <Typography color="primary" variant="h6">
                    Configuration Override
                </Typography>

                <Typography color="primary" variant="h6">
                    SKU: {report.Sku}
                </Typography>
            </Stack>

            <Grid container direction={"column"}>
                <Grid container direction="row" spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="High"
                            name="High"
                            fullWidth
                            type="number"
                            variant="outlined"
                            value={invalidFootprint.footprintReport.High ?? ""}
                            onChange={invalidFootprint.handleChange}
                            error={invalidFootprint.submitted.High}
                            helperText={invalidFootprint.submitted.High ? "High is Required" : ""}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Tie"
                            name="Tie"
                            fullWidth
                            type="number"
                            variant="outlined"
                            value={invalidFootprint.footprintReport.Tie ?? ""}
                            onChange={invalidFootprint.handleChange}
                            error={invalidFootprint.submitted.Tie && !invalidFootprint.footprintReport.Tie}
                            helperText={invalidFootprint.submitted.Tie ? "Tie is Required" : ""}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={2} marginTop={2} marginBottom={1}>
                    <Grid size={6}>
                        <TextField
                            label="Unit Per Case"
                            value={report.Footprint.UnitQuantity || ""}
                            disabled
                            fullWidth
                            type="number"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Case per Pallet"
                            disabled
                            fullWidth
                            value={invalidFootprint.footprintReport.Tie * invalidFootprint.footprintReport.High || ""}
                            type="number"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={2} sx={{ margin: 0 }}>
                    <Grid size={12} sx={{ margin: 0 }}>
                        <Divider sx={{ marginLeft: -2, marginRight: -2, marginTop: 1 }} />
                    </Grid>
                </Grid>
                <Grid container direction="row" size={12}>
                    <Grid
                        size={6}
                        sx={{
                            borderRight: "1px solid lightgrey",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant="text"
                            color="primary"
                            sx={{
                                fontWeight: 600,
                                width: "120%",
                                height: "100%",
                                padding: 1,
                                marginLeft: -2,
                            }}
                            onClick={() => invalidFootprint.handleCreateFootprintReportLog(report, ReportAction.OVERRIDECONFIGURATION)}
                        >
                            Submit Override
                        </Button>
                    </Grid>
                    <Grid
                        size={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant="text"
                            color="info"
                            sx={{
                                fontWeight: 600,
                                width: "120%",
                                height: "100%",
                                padding: 1,
                                marginRight: -2,
                            }}
                            onClick={() => invalidFootprint.handleCreateFootprintReportLog(report, ReportAction.DISMISSCONFIGURATION)}
                        >
                            Dismiss
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={invalidFootprint.toast.open}
                autoHideDuration={3000}
                onClose={() => invalidFootprint.setToast({ ...invalidFootprint.toast, open: false })}
                message={invalidFootprint.toast.message}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                ContentProps={{
                    sx: {
                        background: "red",
                    },
                }}
            />
        </Stack>
    );
}

export default FootprintReportForm;
