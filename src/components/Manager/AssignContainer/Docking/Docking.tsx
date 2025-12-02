import { Stack, MenuItem, FormControl, RadioGroup } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import {
    CustomDropDown,
    CustomBlackRadio,
    CustomColorBox,
    CustomFormLabel,
    CustomMenuItem,
    CustomDelegateButton,
    CustomDisabledTextField,
    CustomContainer,
    CustomTitleLabel,
    CustomStandardDropDown,
    CustomFieldLabel,
    CustomResetButton,
    CustomTextField,
} from "@/styles/AssignContainer/StyledDocking/StyledDocking";

import type { IDoorWithTeam, InboundDoor, IPopulateStaging } from "@/interfaces/Doors";
import { useDockingLogic } from "@/hooks/Manager/AssignContainer/DockingLogic";

type DockingProps = {
    door: InboundDoor;
    team?: IDoorWithTeam;
    staging: IPopulateStaging[];
    onClose?: () => void;
    onRefresh?: () => void; 
};


export default function Docking(props: DockingProps) {
    const { door, team, onClose } = props;
    const {
        teamOptions,
        stagingOptions,
        sealNumber,
        setSealNumber,
        selectedTeam,
        setSelectedTeam,
        selectedStaging,
        setSelectedStaging,
        isDelegated,
        isDoorOpen,
        handleDelegate,
        resetFields,
        isAllDisabled,
        handleSaveDocking,
        isDelegating,
        isSealed,
    } = useDockingLogic(door, team);

    const handleDelegateAndClose = async () => {
    await handleDelegate();       // delegate first

    props.onRefresh?.();          // refresh door state

    props.onClose?.();            // close Docking
};

    const handleSaveAndClose = async () => {
    await handleSaveDocking();

    props.onRefresh?.();

    props.onClose?.();
};

    const hasAnyData = !!team?.TeamId || !!team?.StagingId || !!door?.SealNumber;

    return (
        <Stack sx={{ mb: 8 }}>
            <CustomContainer sx={{ mt: 6, ml: 0, mr: "auto" }}>
                <CustomTitleLabel>{hasAnyData ? `Door ${door.DoorCode}` : `Dock At Door ${door.DoorCode}`}</CustomTitleLabel>

                <Stack spacing={2}>
                    {/* Container Number + Radio */}
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                        <Stack>
                            <CustomFieldLabel>Container Number</CustomFieldLabel>
                            <CustomDisabledTextField fullWidth disabled value={door.ContainerNumber ?? "N/A"} />
                        </Stack>

                        <FormControl>
                            <RadioGroup defaultValue="Asn">
                                {["Asn", "Transfer", "Rtv"].map((value) => (
                                    <CustomFormLabel key={value} value={value} control={<CustomBlackRadio />} label={value} disabled />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>

                    {/* Assign Team + ASN Number */}
                    <Stack direction="row" spacing={4}>
                        <Stack flex={1}>
                            <CustomFieldLabel>Assign Team</CustomFieldLabel>
                            <CustomDropDown
                                fullWidth
                                key={door.DoorCode}
                                value={team?.TeamId || selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value === "" ? "" : Number(e.target.value))}
                                disabled={!!team?.TeamId || isDelegated}
                            >
                                {teamOptions.map(({ Label, ColorCode, Disabled, Value }) => (
                                    <MenuItem key={Value} value={Value} disabled={Disabled}>
                                        <CustomColorBox bgcolor={ColorCode} /> {Label}
                                    </MenuItem>
                                ))}
                            </CustomDropDown>
                        </Stack>

                        <Stack flex={1}>
                            <CustomFieldLabel>ASN Number</CustomFieldLabel>
                            <CustomDisabledTextField fullWidth disabled value={door.Asn ?? "N/A"} />
                        </Stack>
                    </Stack>

                    {/* Staging Area + Seal Number */}
                    <Stack direction="row" spacing={4}>
                        <Stack flex={1}>
                            <CustomFieldLabel>Assign Staging Area</CustomFieldLabel>
                            <CustomStandardDropDown
                                fullWidth
                                key={door.DoorCode + "-staging"}
                                value={team?.StagingId || selectedStaging}
                                onChange={(e) => setSelectedStaging(e.target.value === "" ? "" : Number(e.target.value))}
                                disabled={!!team?.StagingId || isDelegated}
                            >
                                {stagingOptions.map(({ Label, Disabled, Value }) => (
                                    <CustomMenuItem key={Value} value={Value} disabled={Disabled}>
                                        {Label}
                                    </CustomMenuItem>
                                ))}
                            </CustomStandardDropDown>
                        </Stack>

                        <Stack flex={1}>
                            <CustomFieldLabel>Seal Number</CustomFieldLabel>
                            <CustomTextField
                                fullWidth
                                key={door.DoorCode}
                                value={sealNumber}
                                disabled={!team?.IsOpen || !!door?.SealNumber || !team?.StagingId || !team?.TeamId || isDelegated}
                                onChange={(e) => setSealNumber(e.target.value)}
                            />
                        </Stack>
                    </Stack>

                    {/* Buttons */}
                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                        <CustomResetButton variant="outlined" startIcon={<ReplayIcon />} onClick={resetFields} disabled={isAllDisabled}>
                            Reset
                        </CustomResetButton>

                        <CustomDelegateButton
                            variant="contained"
                            disabled={
                                isDelegating ||
                                isDelegated ||
                                isSealed ||
                                (isDoorOpen && !!door.SealNumber) ||
                                (!isDoorOpen && (!selectedTeam || !selectedStaging))
                            }

                            onClick={isDoorOpen ? handleSaveAndClose : handleDelegateAndClose}
                        >
                            {isSealed
                                ? "DELEGATED"
                                : isDelegated
                                    ? "SEALED"
                                    : isDoorOpen
                                        ? "SAVE"
                                        : isDelegating
                                            ? "DELEGATING..."
                                            : "DELEGATE"}
                        </CustomDelegateButton>
                    </Stack>
                </Stack>
            </CustomContainer>
        </Stack>
    );
}
