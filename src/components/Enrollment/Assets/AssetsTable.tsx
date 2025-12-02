"use client";

import ActionButtons from "@/components/Common/ActionButtons";
import useAssetsTable from "@/hooks/Enrollment/Assets/useAssetsTable";
import { EnrollmentDataGrid } from "@/styles/EnrollmentDataGrid";
import { StyledTab, TabNavigationList, TabNavigationPanel } from "@/styles/TabNavigation";
import { TabContext } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { columns } from "./Column";
import AddModifiedDialogAsset from "./AddModifiedDialogAsset";
import DeleteModal from "@/components/Common/DeleteModal";

export default function AssetsTable() {
    const {
        handleAction,
        handleDelete,
        handleSave,
        handleClose,
        setQuery,
        setTab,
        setSelectAssetsId,
        getRowClassName,
        tab,
        query,
        handleSearch,
        openModal,
        assets,
        selectAssets,
        selectAssetsId,
        deleteModal,
        pagination,
        sharedGridProps,
        handeleColumnHeaderClick,
        handleSetPageSize,
    } = useAssetsTable();
    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "rgb(33, 44, 94)", fontWeight: "bold" }}>
                    Assets List
                </Typography>
            </Box>

            <Stack sx={{ width: "100%" }}>
                <TabContext value={tab}>
                    <ActionButtons
                        onAdd={() => handleAction("Open")}
                        onModify={() => handleAction("Modify")}
                        onDelete={() => handleAction("Delete")}
                        onTextChange={handleSearch}
                        textValue={pagination.SearchQuery}
                        disableAdd={!!selectAssetsId}
                        disableModify={!selectAssetsId}
                        disableDelete={!selectAssetsId}
                        search={"Asset"}
                        hideLink={true}
                    />

                    <Stack direction="row" justifyContent="flex-end">
                        <TabNavigationList onChange={(_, v) => setTab(v)}>
                            <StyledTab label="SHOW ALL" value="all" />
                            <StyledTab label="GROUP BY TYPE" value="type" />
                            <StyledTab label="GROUP BY CONDITION" value="condition" />
                            <StyledTab label="GROUP BY LOCATION" value="location" />
                        </TabNavigationList>
                    </Stack>

                    <TabNavigationPanel value={tab}>
                        <EnrollmentDataGrid
                            {...sharedGridProps}
                            rows={assets.data}
                            columns={columns}
                            getRowClassName={getRowClassName}
                            checkboxSelection
                            disableMultipleRowSelection
                            onRowSelectionModelChange={(a) => {
                                const id = a.ids.values().next().value as number | null;
                                setSelectAssetsId(id);
                            }}
                            onColumnHeaderClick={(params, _) => {
                                handeleColumnHeaderClick(params.colDef.field);
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            paginationModel={{ pageSize: pagination.PageSize, page: pagination.PageNumber }}
                            onPaginationModelChange={(model) => handleSetPageSize(model)}
                        />
                    </TabNavigationPanel>
                </TabContext>
            </Stack>

            <AddModifiedDialogAsset
                equipmentData={selectAssets}
                closeModal={handleClose}
                openModal={openModal}
                equipmentType={assets.equipmentType}
                distriCenter={assets.location}
                onSaved={handleSave}
            />

            <DeleteModal
                open={deleteModal}
                close={handleClose}
                dataInfo={"Equipment"}
                id={selectAssetsId ?? 0}
                removeData={handleDelete}
                cancelData={handleClose}
            />
        </>
    );
}
