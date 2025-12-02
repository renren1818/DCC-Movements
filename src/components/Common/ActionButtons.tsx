import { Add, Create, Delete } from "@mui/icons-material";
import { Button, Stack, TextField, Typography, Link as MuiLink, Divider  } from "@mui/material";
import NextLink from "next/link"

type Props = {
  onAdd: () => void;
  onModify: () => void;
  onDelete: () => void;
  onTextChange: (value: any) => void;
  textValue : string,
  disableAdd : boolean,
  disableModify: boolean,
  disableDelete: boolean,
  search: string
  change?: string
  link?: string
  hideLink : boolean
};

export default function ActionButtons( {onAdd, onModify, onDelete, search, change, link, disableModify,disableDelete,disableAdd = false,onTextChange,textValue, hideLink} : Props) {

  return (
    <>
  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2} sx={{ width: "100%" }}>

    <Stack direction="row" spacing={2} alignItems="center" padding={1}>
      <Typography variant="h5" sx={{ whiteSpace: "nowrap", color: "rgb(33, 44, 94)", fontWeight: "550" }}>
        Search {search}
      </Typography>

      <TextField fullWidth size="medium" sx={{ flex: 2, width:"350px" }} value={textValue} onChange={(e) => onTextChange(e.target.value)} />

    {!hideLink && link && change && (
      <MuiLink component={NextLink} href={link} underline="none" sx={{ whiteSpace: "nowrap" }}>
          Switch to {change}
        </MuiLink>
    )}

    </Stack>

    <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", sm: "flex-end" }}>
        <Button startIcon={<Add />} onClick={onAdd} disabled={disableAdd} >Add</Button>
         <Divider orientation="vertical" flexItem />

        <Button startIcon={<Create />} onClick={onModify} disabled={disableModify}>Modify</Button>
         <Divider orientation="vertical" flexItem />

        <Button startIcon={<Delete />} onClick={onDelete} disabled={disableDelete}>Delete</Button>
    </Stack>

  </Stack>
    </>
  );
}
