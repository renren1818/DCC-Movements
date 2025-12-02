import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ──────────────────────────────── */
/* 🚪 Door Section                  */
/* ──────────────────────────────── */


interface DoorButtonProps {
  doorcolor?: string;
  isassigned?: boolean;
}

export const DoorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "doorcolor" && prop !== "isassigned",
})<DoorButtonProps>(({ doorcolor, isassigned }) => {
  let background = "linear-gradient(#ffffff, #f1f1f1)";
  let color = "#0a1a6a";

  if (!isassigned) {
    background = "#C6C6C6";
    color = "#0a1a6a";
  } else if (doorcolor) {
    background = doorcolor;
    color = "#ffffff";
  } else {
    background = "#ffffff";
    color = "#0a1a6a";
  }

  return {
    width: 90,
    height: 50,
    minWidth: 0,
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 30,
    color,
    background,
    border: "1px solid #d0d0d0",
    boxShadow: `
      1px 3px 6px rgba(0,0,0,0.25),
      inset -2px -2px 3px #848484ff,
      inset 2px 2px 5px #f9f9f9
    `,
    position: "relative",
    transition: "transform 0.2s ease, border 0.2s ease",
    "&:hover": {
      transform: "scale(1.08)",
      background: doorcolor || "linear-gradient(#f5f5f5, #e0e0e0)",
    },
    "&.Mui-disabled": {
      background: "#C6C6C6",
      color: "#0a1a6a",
      boxShadow: `
        1px 5px 7px rgba(0,0,0,0.25),
        inset -3px -3px 6px #9c9c9c,
        inset 2px 2px 5px #e0e0e0
      `,
      transform: "none",
    },
    "&.selected": {
      transform: "scale(1.05)",
    },
  };
});


// ✅ Red badge on active door
export const DoorBadge = styled(Box)(() => ({
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: "red",
  position: "absolute",
  top: -6,
  right: -6,
  border: "3px solid white",
}));

// ✅ Clock text (door timer)
export const DoorTime = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: "bold",
  color: "black",
  marginTop: 4,
}));

// ✅ Duration text (door open time)
export const DoorDuration = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: "bold",
  color: "#34aadc",
}));

// ✅ Section Title (e.g., "Doors")
export const AssignContainerTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "#130a8aff",
  textAlign: "left",
}));

