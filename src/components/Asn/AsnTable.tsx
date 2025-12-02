"use client";
import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ActionButtons from "../Common/ActionButtons";
import DeleteModal from "../Common/DeleteModal";
import { StyledTab, TabNavigationList, TabNavigationPanel } from "@/styles/TabNavigation";
import { TabContext } from "@mui/lab";
import { EnrollmentDataGrid } from "@/styles/EnrollmentDataGrid";
import { column } from "./Columns";
import useAsnTable from "@/hooks/AsnList/useAsnTable";
import DialogAsn from "./DialogAsn";

export default function AsnTable() {
    const {
        openDialog,
        deleteModal,
        tab,
        rows,
        searchTerm,
        setTab,
        setSearchTerm,
        filteredSkuItems,
        selectAsn,
        handleOpen,
        handleClose,
        handleDelete,
        handleSave,

        setSelectAsnId,
        setSelectAsnNumber,
        selectAsnNumber,
        handleAddRemovePoId,
        handleFieldChange,
        selectAsnId,
        sharedGridProps,
        pagination,
        handleSetPageSize,
        handleSearch,
        handeleColumnHeaderClick,
    } = useAsnTable();

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "rgb(33, 44, 94)", fontWeight: "bold" }}>
                    ASN List
                </Typography>
            </Box>

            <Stack sx={{ width: "100%" }}>
                <TabContext value={tab}>
                    <ActionButtons
                        onAdd={() => {
                            handleOpen("Open");
                        }}
                        onModify={() => handleOpen("Modify")}
                        onDelete={() => handleOpen("Delete")}
                        onTextChange={handleSearch}
                        textValue={pagination.SearchQuery}
                        disableAdd={!!selectAsnId}
                        disableModify={!selectAsnId}
                        disableDelete={!selectAsnId}
                        search={"Asn"}
                        hideLink={false}
                    />

                    <Stack direction="row" justifyContent="flex-end">
                        <TabNavigationList onChange={(_, v) => setTab(v)}>
                            <StyledTab label="SHOW ALL" value="all" />
                            <StyledTab label="GROUP BY ASN" value="asn" />
                            <StyledTab label="GROUP BY CONTAINER NUMBER" value="containernumber" />
                        </TabNavigationList>
                    </Stack>

                    <TabNavigationPanel value={tab}>
                        <EnrollmentDataGrid
                            {...sharedGridProps}
                            rows={rows}
                            columns={column}
                            getRowId={(row) => row.AsnId}
                            onRowSelectionModelChange={(a) => {
                                const id = a.ids.values().next().value as number | null;
                                setSelectAsnId(id);

                                const selectedRow = rows.find((r) => r.AsnId === id);
                                if (selectedRow) {
                                    setSelectAsnNumber(selectedRow.AsnNumber ?? "");
                                }
                            }}
                            disableMultipleRowSelection
                            checkboxSelection
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

            <DialogAsn
                asnData={selectAsn}
                openModal={openDialog}
                closeModal={handleClose}
                onSave={handleSave}
                poData={filteredSkuItems}
                searchTerm={searchTerm}
                onSearchChange={(term) => setSearchTerm(term)}
                handleAddRemovePoId={handleAddRemovePoId}
                handleFieldChange={handleFieldChange}
            />

            <DeleteModal
                open={deleteModal}
                close={handleClose}
                dataInfo={"Asn"}
                id={selectAsnNumber ?? 0}
                removeData={handleDelete}
                cancelData={handleClose}
            />
        </>
    );
}
