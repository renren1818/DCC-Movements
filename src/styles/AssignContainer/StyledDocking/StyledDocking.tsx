import { Box, Button, Card, FormControlLabel, MenuItem, Radio, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ──────────────────────────────── */
/* 📦 Docking Container Section     */
/* ──────────────────────────────── */

// ✅ Container (card-like look for Docking form)
export const CustomContainer = styled(Box)(() => ({
    padding: "10px 10px",
    borderRadius: "10px",
    background: "#ffffff",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    maxWidth: "900px",
}));

// ✅ style stays the same
export const CustomTitleLabel = styled(Card)(() => ({
    backgroundColor: "#0a1a6a",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "bold",
    fontFamily: "Roboto, Arial, sans-serif",
    display: "block",
    width: "fit-content",
    padding: "18px 16px",
    marginBottom: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    fontSize: "18px",
}));

// ✅ Field Label (for form fields)
export const CustomFieldLabel = styled(Typography)(() => ({
    fontSize: "22px",
    marginBottom: "6px",
    color: "#0a1a6a",
    fontFamily: "Roboto, Arial, sans-serif",
}));

/* ──────────────────────────────── */
/* 📝 Form Inputs                   */
/* ──────────────────────────────── */

// ✅ Disabled Input with inner shadow
export const CustomDisabledTextField = styled(TextField)(() => ({
    width: 310,
    "& .MuiInputBase-root": {
        backgroundColor: "#d3d3d3",
        borderRadius: "12px",
        height: "57px",
        boxShadow: "inset 0 3px 3px #fff, inset 0 -2px 4px rgba(0,0,0,0.2)", // bevel shadow
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #b0b0b0",
    },
    "& .MuiInputBase-input.Mui-disabled": {
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#555",
        padding: 0,
        lineHeight: "44px",
        height: "100%",
        boxSizing: "border-box",
    },
}));

// ✅ Standard Dropdown (staging area) with outside shadow
export const CustomStandardDropDown = styled(Select)(() => ({
    width: 310,
    textAlign: "center",
    borderRadius: "12px",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "#fff",
    boxShadow: "0px 3px 4px rgba(0,0,0,0.15)",

    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #d0d0d0ff",
    },

    "& .MuiSelect-select": {
        padding: "14px 12px",
    },

    // ✅ Disabled dropdown -> dark gray background
    "&.Mui-disabled": {
        backgroundColor: "#d1d1d1ff", // dark gray
        color: "#444", // darker text
        fontWeight: "bold",
        boxShadow: "inset 0 3px 3px #fff, inset 0 -2px 4px rgba(0,0,0,0.2)", // bevel shadow
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0068C4",
        borderWidth: "2px",
    },
}));

// ✅ Assign Team Dropdown (with custom color box)
export const CustomDropDown = styled(Select)(() => ({
    background: "#fff",
    borderRadius: "12px",
    fontSize: 20,
    height: 59,
    width: 310,
    fontWeight: "bold",
    boxShadow: "0px 3px 4px rgba(0,0,0,0.15)",

    "& .MuiSelect-select": {
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0068C4",
        borderWidth: "2px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #d0d0d0ff",
    },

    // ✅ Disabled dropdown -> dark gray background
    "&.Mui-disabled": {
        backgroundColor: "#d1d1d1ff",
        color: "#444",
        fontWeight: "bold",
        boxShadow: "inset 0 3px 3px #fff, inset 0 -2px 4px rgba(0,0,0,0.2)", // bevel shadow
    },
}));

// ✅ Small color square inside dropdown
export const CustomColorBox = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
    width: 40,
    height: 25,
    borderRadius: 2,
    marginRight: 70,
    backgroundColor: bgcolor,
    border: "1px solid rgba(0,0,0,0.2)",
}));

/* ──────────────────────────────── */
/* 🎛 Controls (Buttons, Radios)    */
/* ──────────────────────────────── */

// ✅ Reset button (outlined style)
export const CustomResetButton = styled(Button)(() => ({
    fontSize: 16,
    borderRadius: "8px",
    padding: "10px 36px",
    border: "1px solid #c0c0c0",
    fontWeight: "bold",
    color: "#0a1a6a",
    boxShadow: "0px 3px 4px rgba(0,0,0,0.15)", // ✅ outside shadow
    "&:hover": {
        backgroundColor: "#f0f0f0",
    },
}));

// ✅ Delegate button (fixed width style)
export const CustomDelegateButton = styled(Button)(() => ({
    fontSize: 16,
    backgroundColor: "#0a1a6a",
    borderRadius: "8px",
    padding: "8px 32px",
    fontWeight: "bold",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    minWidth: "145px", // 👈 keeps consistent width for "SAVE" and "DELEGATE"
    "&:hover": {
        backgroundColor: "#ffffff",
        color: "#0a1a6a",
    },
}));

// ✅ Black Radio button (larger circle)
export const CustomBlackRadio = styled(Radio)(() => ({
    marginTop: -3,
    color: "#474747",
    "&.Mui-checked": {
        color: "#474747",
    },
    "& .MuiSvgIcon-root": {
        fontSize: 25, // Bigger circle size
    },
}));

// ✅ FormControlLabel with larger text
export const CustomFormLabel = styled(FormControlLabel)(() => ({
    "& .MuiFormControlLabel-label": {
        fontSize: "24px",
        color: "#474747",
    },
}));

export const CustomMenuItem = styled(MenuItem)(() => ({
    justifyContent: "center", // ✅ center menu text
    textAlign: "center",
}));

export const CustomTextField = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        boxShadow: "0px 3px 4px rgba(0,0,0,0.15)", // normal shadow when enabled
        backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-input": {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        height: 57,
        padding: "0 8px",
        boxSizing: "border-box",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#cfcfcf",
    },

    // ✅ Hover only if enabled
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0068C4",
    },

    // ✅ Focus only if enabled
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000",
        borderWidth: 2,
    },

    // ✅ Correct Disabled style (applies to MuiInputBase-root when disabled)
    "& .MuiOutlinedInput-root.Mui-disabled": {
        backgroundColor: "#d3d3d3",
        boxShadow: "inset 0 3px 3px #fff, inset 0 -2px 4px rgba(0,0,0,0.2)", // bevel shadow
    },
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input": {
        color: "#555",
        cursor: "default",
    },
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "#b0b0b0",
    },
}));

export const SelectedDoorLabelBlue = styled(Box)(() => ({
    backgroundColor: "#0a1a6a",
    color: "#fff",
    fontWeight: 700,
    fontSize: "18px",
    padding: "12px 8px",
    borderRadius: "4px",
    display: "inline-block",
    textAlign: "center", // align text left
    width: "100px", // adjust width as needed
    marginTop: "10px",
}));

/* ──────────────────────────────── */
/* 📦 Doors Container Section      */
/* ──────────────────────────────── */
