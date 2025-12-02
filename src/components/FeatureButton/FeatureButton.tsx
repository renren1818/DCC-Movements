import { styled } from "@mui/material/styles";
import { Box, Button, type ButtonOwnProps } from "@mui/material";

{
    /* Custom border color for the button, fontcolor, backcolor */
}
interface FeatureButtonProps extends ButtonOwnProps {
    active?: boolean; // new prop
    circleback?: string; // circle background color
    circlecolor?: string; // icon color inside circle
}

export const FeatureButton = styled(Button, {
    shouldForwardProp: (prop) => !["active", "circleback", "circlecolor"].includes(prop as string),
})<FeatureButtonProps>(({ theme, active, circleback, circlecolor }) => ({
    backgroundColor: active ? "#f8a34d" : "#ffffff",
    border: active ? "2px solid #ee8900" : "2px solid #e0e0e0",
    color: active ? "#ffffff" : "#003056",
    borderRadius: "6px",
    padding: "8px 8px",
    width: "192px",
    textTransform: "none",
    boxShadow: "0px 5px 12px rgb(0, 0, 0, 0.38)",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "bold",  // bold is usually 700
    fontSize: "15px",
    display: "flex",
    justifyContent: "flex-start",
    textWrap: "nowrap",
    transition: "all 0.2s ease",

    "&:hover": {
        border: "2px solid #ee8900",
    },

    // 🔹 Circle for startIcon
    "& .MuiButton-startIcon": {
        marginRight: "7px",
        backgroundColor: circleback || "#f0f0f0",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "5px solid #ff7c25ff",
        color: circlecolor || "#003056",
        "& svg": {
            color: circlecolor || "#003056",
            fontSize: "30px",
        },
    },

    [theme.breakpoints.down("xl")]: {
        zoom: 0.75,
    },
}));

export const ParentRedBadge = styled("div")`
    position: relative;
    display: inline-block;

    &::after {
        content: "";
        position: absolute;
        top: -5px; /* move up */
        right: -5px; /* move right */
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: red;
    }
`;
