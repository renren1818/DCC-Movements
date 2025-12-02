'use client';

import useActions from "@/hooks/Manager/Movements/Actions";

import { Stack } from "@mui/material";
import { ActionButton } from "./Styles";

import PackageIcon from "/src/assets/images/movements/actions/PackageIcon.svg";
import ArrowIcon from "/src/assets/images/movements/actions/ArrowIcon.svg";
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { BlockModes } from "@/enums/Blocks";

export default function Actions() {

    const actions = useActions();

    return (

        <Stack width={'100%'} spacing={1}>
            <ActionButton 
                id={`${BlockModes.SEARCH}`}
                active={`${actions.isActive(BlockModes.SEARCH)}`}
                onClick={actions.handleClick}
            >
                <SearchIcon color="inherit" fontSize='inherit' />
            </ActionButton>
            <ActionButton 
                id={`${BlockModes.MOVE}`}
                active={`${actions.isActive(BlockModes.MOVE)}`}
                onClick={actions.handleClick}
            >
                <img src={PackageIcon.src} />
            </ActionButton>
            <ActionButton 
                id={`${BlockModes.SLOT_SKU}`}
                active={`${actions.isActive(BlockModes.SLOT_CONTROL) || actions.isActive(BlockModes.SLOT_SKU)}`}
                onClick={actions.handleClick}
                disabled={actions.isDisabled()}
            >
                <SettingsIcon color="inherit" fontSize='inherit' />
            </ActionButton>
            <ActionButton 
                id={'back'}
                active={`false`} 
                onClick={actions.handleClick}
            >
                <img src={ArrowIcon.src} />
            </ActionButton>
        </Stack>

    )

}