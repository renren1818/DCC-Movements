import { Button, Dialog, ToggleButton, toggleButtonClasses, ToggleButtonGroup, toggleButtonGroupClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DoorButton = styled(Button)(({ theme }) => ({
    height: '40px',
    borderRadius: '20px',
    boxShadow: "0px 5px 12px rgb(0, 0, 0, 0.38)",
    fontWeight: 'bold',
    textTransform: 'none',
    color: theme.palette.primary.main,
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: '1rem',
    [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
        {
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
    [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
        {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
    [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
        {
        borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
        },
}));


export const StyledToggleButton = styled(ToggleButton)(({ theme, value }) => ({
    minWidth: 50,
    minHeight: 50,
    fontWeight: 'bold',
    backgroundColor: !(value as string).startsWith(':') ? theme.palette.primary.main : theme.palette.grey[600],
    color: 'white',
    '&:hover': {
        backgroundColor: theme.palette.grey[600],
        color: 'white'
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.success.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: 'white'
        }
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[600],
    }
}));
