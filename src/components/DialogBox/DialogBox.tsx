import { Button, Dialog, Stack, Typography } from "@mui/material";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IDialogBoxParams } from "@/interfaces/DialogBoxContext";

export function DialogBox(props: IDialogBoxParams) {

    return (

        <Dialog keepMounted open={props.open!}>
            <Stack spacing={1} minWidth={300} maxWidth={300} color={props.type === 'success' ? 'primary.light' : 'error.main'} fontSize={60} alignItems={'center'} padding={2}>
                { props.type === 'success' ? <CheckCircleIcon fontSize='inherit' /> : <CancelIcon fontSize='inherit' /> }
                <Typography variant="h5" fontWeight={'bold'}>{props.title}</Typography>
                <Typography variant="subtitle1" color='textPrimary' paddingBottom={2} textAlign={'center'}>{props.message}</Typography>
                <Button variant='contained' color={props.type === 'success' ? 'primary' : 'error' } onClick={props.onClose}>{props.action}</Button>
            </Stack>
        </Dialog>

    );
    
}