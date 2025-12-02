"use client";

import { styled } from "@mui/material/styles";
import { TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";

export const TabNavigationList = styled(TabList)(({ theme }) => ({
  backgroundColor: "#e0e0e0",
  borderRadius: "4px",
  padding: "4px 8px",
  width: "fit-content",
  marginBottom: "5px",
  display: "flex",

  "& .MuiTab-root": {
    marginRight: theme.spacing(0.5),

    "&.Mui-selected": {
      backgroundColor: "#565657ff",
      color: "white",
    },
  },

  "& .MuiTab-root:last-of-type": {
    marginRight: 0,
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  borderRadius: 4,
  minHeight: "auto",
  transition: "all 0.2s ease",
  backgroundColor: "#a8a8a8ff", // light background for unselected
  color: "#212121",

  "&.Mui-selected": {
    backgroundColor: "#494a4bff", // dark background
    color: "white",
  },

  "&:hover": {
    backgroundColor: "#777575ff",
  },
}));

export const TabNavigationPanel = styled(TabPanel)(({ theme }) => ({
  padding: "0px",
  backgroundColor: "#fafafa",
  width: "100%",
}));
