import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ActionButton = styled(Button)<{ active: string }>(({ theme, active }) => ({
    height: '56px',
    borderRadius: '10px',
    color: 'white',
    backgroundColor: active === 'true' ? theme.palette.success.light : theme.palette.primary.main,
    fontSize: 50,
    '&:hover': {
        backgroundColor: theme.palette.success.dark
    },
    ':disabled': {
        backgroundColor: theme.palette.grey[300]
    }
}));

export const StyledGrid = styled(Grid, { shouldForwardProp: (prop) => prop !== 'header' })<{ header?: boolean, disabled?: boolean}>(({ theme, header, disabled }) => ({
    alignContent:'center',
    height: 'calc(100vh / 18)', 
    color: Boolean(header) ? 'white' : theme.palette.primary.main, 
    backgroundColor: Boolean(header) ? theme.palette.primary.main : Boolean(disabled) ? theme.palette.divider : 'white', 
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '8px', 
    boxShadow: "0px 5px 5px rgb(0, 0, 0, 0.38)",
    padding: 1, 
    fontWeight: Boolean(header) ? 'bold' : 'normal'
}));