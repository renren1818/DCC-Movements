import { Box, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)({
    height: '30px',
    borderRadius: '10px', 
    padding: '10px'
});

export const TabPanel = styled(Box)((props: { index: number, value : number }) => (({
    display: props.index !== props.value ? 'none' : 'block',
    paddingTop: 10
})));

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: 15
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.error.main
  },
}));
