// DoorStyles.tsx
// Centralized styled components for the Docking/Doors UI
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Box, Button, Stack, Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";



/* ──────────────────────────────── */
/* 📦 Shipment Section (Stack-based)*/
/* ──────────────────────────────── */

// ✅ Card wrapper
export const ShipmentCard = styled(Stack)(() => ({
  position: "relative",
  borderRadius: "4px",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.6)",
  background: "#fff",
  height: "155px",
  width: "450px",
  display: "flex",            // ⬅️ flex container
  flexDirection: "column",    // ⬅️ vertical stacking
  justifyContent: "space-between", // ⬅️ pushes last child to bottom
}));

// ✅ Wrapper for whole section
export const ShipmentHeader = styled(Stack)(() => ({
  marginTop: "20px",
  marginLeft: "20px",
  flexDirection: "column",
  gap: "2px",        
  backgroundColor: "#ffffffff",
  height: "90px",
}));

export const ShipmentTitle = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#000",
  textAlign: "left", // Align text to the left
}));

export const ShipmentLink = styled("a")(() => ({
  color: "#0a6fc4",
  fontWeight: "normal",
  fontSize: "16px",
  fontFamily: "helvetica, arial, sans-serif",
  textDecoration: "none",
  textAlign: "left", // Align text to the left
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const ShipmentSku = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "left", // Align text to the left
}));

// ✅ Error popup
export const ErrorStack = styled(Stack)(() => ({
  background: "#fff",
  borderRadius: "6px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
  padding: "10px 18px",
  alignItems: "flex-start",
  maxWidth: "220px",
  position: "absolute",
  top: "10px",
  right: "10px",
  marginTop: "3px",
  marginRight: "8px",
  
}));

// Instead of using Typography, use div or another element directly
export const ErrorTitle = styled('div')(() => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#f06157ff",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: "Roboto, Arial, sans-serif",
  marginTop: "16px",
}));

export const ErrorMessage = styled(Typography)(() => ({
  fontSize: "13px",
  fontFamily:"Sogoe UI, Arial, sans-serif",
  color: "#333",
  marginLeft: "29px",
  marginBottom: "8px",
}));

// ✅ Buttons
export const ShipmentButton = styled(Button)(() => ({
  flex: 1,
  borderRadius: 0,
  fontWeight: "bold",
  padding: "6px 0",
  fontSize: "15px",
}));


export const ErrorIcon = styled(ReportGmailerrorredIcon)(() => ({
  fontSize: 28,
  color: "#d93025", // red
}));

export const OctagonIcon = styled(Box)(() => ({
  width: 24,
  height: 24,
  background: "#d93025",
  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
}));

// styled components
export const TriangleIcon = styled(Box)(() => ({
  width: 28,
  height: 24,
  background: "#f57c00",
  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
  position: "relative",      // needed for absolute child
  display: "inline-block",
  marginTop: "-2px",    
}));

export const TriangleMark = styled("span")(() => ({
  position: "absolute",
  left: "50%",
  top: "68%",                // tweak this number to nudge down/up
  transform: "translate(-50%, -50%)",
  color: "#fff",
  fontSize: 14,
  lineHeight: 1,
  fontWeight: 700,
         // tweak this number to nudge down/up
}));

export const AcknowledgeButton = styled(ShipmentButton)(() => ({
  borderTop: "1px solid #c3c3c3ff",
  backgroundColor: "#ffffffff",
  color: "#398bd3ff",
  borderRight: "1px solid #ccc",
  "&:hover": {
    backgroundColor: "#dcecff",
  },
}));

export const ErrorAcknowledgeTitle = styled((props: TypographyProps) => (
  <Typography component="div" {...props} />
))(() => ({
  fontSize: "13px",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  fontFamily: "roboto, Arial, sans-serif",
  height: "50px",
}));

export const InvestigationLabel = styled(Box)(() => ({
  backgroundColor: "#d93025",
  color: "#fff",
  fontWeight: 700,
  fontSize: "18px",
  padding: "12px 8px",
  borderRadius: "4px",
  display: "inline-block",
  textAlign: "center",    // align text left
  width: "180px",       // adjust width as needed
  marginTop: "10px",
}));