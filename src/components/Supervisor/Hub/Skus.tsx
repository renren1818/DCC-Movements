import { ISku } from "@/interfaces/Hub/Sku";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";

export default function Skus(props: { skus?: ISku[], onClickSku: (sku: ISku) => void; onComplete: () => void; onAssign: (sku: ISku) => void; }) {

    return (

        <>
            <Paper elevation={8} sx={{ padding: 5, minHeight: 200 }}>
                <Stack spacing={2}>                       
                    {
                        props.skus?.map((sku) => (                 
                            <Paper key={sku.Sku} elevation={2} sx={{ padding: 2 }}>
                                <Grid container textAlign={'left'} alignItems={'center'}>
                                    <Grid size={3}>
                                        <Typography>SKU Number: <b color="primary">{sku.Sku}</b></Typography>
                                    </Grid>
                                    <Grid size={7}>
                                        <Typography>SKU Description: <b color="primary">{sku.Description}</b></Typography>
                                    </Grid>
                                    <Grid size={2} textAlign={'right'}>
                                        <Button 
                                            variant="contained" 
                                            color='inherit' 
                                            disabled={sku.IsCompleted} 
                                            onClick={() => props.onClickSku(sku)}
                                            sx={{ backgroundColor: 'white', fontWeight: 'bold', textDecoration: 'underline' }}
                                        >
                                            Show More
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Stack direction={'row'} justifyContent={'center'} spacing={2} marginTop={2}>
                                    { 
                                        sku.IsAssign && 
                                        <Button 
                                            variant="contained" 
                                            color="success"
                                            onClick={() => props.onAssign(sku)}
                                        >
                                                Assign To Forklift
                                        </Button> }
                                    { 
                                        sku.HavePartial && 
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            onClick={() => props.onClickSku(sku)}
                                        >
                                            Resume Receiving
                                        </Button> }
                                </Stack>
                                
                            </Paper>
                        ))

                    }
                </Stack>
            </Paper>
            <Button 
                variant="contained" 
                disabled={!props.skus || props.skus?.some((sku) => !sku.IsCompleted || sku.IsAssign)}
                onClick={props.onComplete}
                sx={{ width: 200, marginTop: 2, alignSelf: 'flex-end' }}
            >
                Complete Receiving
            </Button>
        </>
    );

}