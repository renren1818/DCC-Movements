import {Box, Button, type ButtonOwnProps, styled} from "@mui/material";

interface ParentQueButtonProps extends ButtonOwnProps {
    active?: boolean;
    backgroundColor?: string;
}

interface StyledButtonProps {
    active?: boolean;
    activeColor?: string;
    hoverColor?: string;
}

export const AsnParentQueueButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active" && prop !== "backgroundColor",
})<ParentQueButtonProps>(({theme, backgroundColor}) => ({
    width: 170,
    height: 42,
    borderRadius: 8,
    padding: theme.spacing(1, 2),
    paddingLeft: theme.spacing(7.5),
    textTransform: "none",
    fontWeight: 550,
    fontSize: 14,
    marginTop: 7,
    position: "relative",
    justifyContent: "space-between",

    color: theme.palette.common.white,
    backgroundColor: backgroundColor ?? "#f0f0f0",

    boxShadow: theme.shadows[3],
    transition: "all 0.3s ease",

    "&:hover": {
        boxShadow: theme.shadows[6],
        transform: "translateY(-2px)",
        color: theme.palette.common.white,
    },
}));

export const BlackBadge = styled(Box)<{color: string}>(({theme, color}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 22,
    backgroundColor: color,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Segoe UI, sans-serif",
    borderRadius: 6,
    marginTop: theme.spacing(2),
}));

export const ChildQueButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active",
})<{active?: boolean}>(({theme, active}) => ({
    width: 130,
    height: 30,
    borderRadius: 8,
    padding: theme.spacing(1, 1),
    textTransform: "none",
    fontWeight: 550,
    fontSize: 11,

    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(1),

    // Dynamic styling when active
    color: active ? theme.palette.grey[900] : theme.palette.grey[700],
    backgroundColor: active ? theme.palette.grey[300] : theme.palette.common.white,

    boxShadow: theme.shadows[3],
    transition: "all 0.3s ease",

    "&:hover": {
        boxShadow: theme.shadows[6],
        transform: "translateY(-2px)",
        color: theme.palette.grey[900],
    },
}));

export const ParentConnector = styled(Box)(({theme}) => ({
    width: 8,
    height: 25,
    borderLeft: `2px solid ${theme.palette.grey[400]}`,
    borderBottom: `2px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(-4.5),
    marginLeft: 5,
}));

export const ChildConnector = styled(Box)(({theme}) => ({
    width: 8,
    height: 37,
    borderLeft: `2px solid ${theme.palette.grey[400]}`,
    borderBottom: `2px solid ${theme.palette.grey[400]}`,
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(-4),
    marginLeft: 5,
}));

export const MixedStatusStyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "active" && prop !== "activeColor" && prop !== "hoverColor",
})<StyledButtonProps>(({active, activeColor, hoverColor}) => ({
    minWidth: "36px",
    width: "36px",
    height: "36px",
    padding: 0,
    // marginRight: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    borderRadius: "4px",
    backgroundColor: active ? activeColor : "#D3D3D3",
    "&:hover": {
        backgroundColor: active ? hoverColor : "#C0C0C0",
    },
}));
