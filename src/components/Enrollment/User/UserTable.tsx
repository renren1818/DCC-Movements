"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { TabContext } from "@mui/lab";
import { EnrollmentDataGrid } from "@/styles/EnrollmentDataGrid";
import { StyledTab, TabNavigationList, TabNavigationPanel } from "@/styles/TabNavigation";

import ActionButtons from "../../Common/ActionButtons";
import AddModifiedDialog from "./AddModifiedDialog";
import DeleteModal from "@/components/Common/DeleteModal";
import { columns } from "./Columns";
import useUserTable from "@/hooks/Enrollment/Employee/useUserTable";
import { GridFeatureMode } from "@mui/x-data-grid";

export default function UserTable() {
    const {
        tab,
        setTab,
        query,
        setQuery,
        openAddModal,
        deleteModal,
        selectedUser,
        selectUserId,
        setSelectUserId,
        handleOpen,
        handleClose,
        handleDelete,
        handleSave,
        getRowClassName,
        sharedGridProps,
        peopleEnrollment,
        handeleColumnHeaderClick,
        handleSearch,
        pagination,
        handleSetPageSize,
    } = useUserTable();

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "rgb(33, 44, 94)", fontWeight: "bold" }}>
                    Employee Masterlist
                </Typography>
            </Box>

            <Stack sx={{ width: "100%" }}>
                <TabContext value={tab}>
                    <ActionButtons
                        onAdd={() => handleOpen("add")}
                        onDelete={() => handleOpen("delete")}
                        onModify={() => handleOpen("modify")}
                        onTextChange={handleSearch}
                        textValue={pagination.SearchQuery}
                        disableAdd={!!selectUserId}
                        disableModify={!selectUserId}
                        disableDelete={!selectUserId}
                        search="Employee"
                        change="Team"
                        link="/enrollment/teams"
                        hideLink={false}
                    />

                    <Stack direction="row" justifyContent="flex-end">
                        <TabNavigationList onChange={(_, v) => setTab(v)}>
                            <StyledTab label="SHOW ALL" value="all" />
                            <StyledTab label="GROUP BY TEAM" value="Team" />
                            <StyledTab label="GROUP BY RANK" value="Rank" />
                            <StyledTab label="GROUP BY LOCATION" value="Location" />
                        </TabNavigationList>
                    </Stack>

                    <TabNavigationPanel value={tab}>
                        <EnrollmentDataGrid
                            {...sharedGridProps}
                            columns={columns}
                            getRowClassName={getRowClassName}
                            disableMultipleRowSelection
                            onRowSelectionModelChange={(a) => {
                                const id = a.ids.values().next().value as number | null;
                                setSelectUserId(id);
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

            <AddModifiedDialog
                userData={selectedUser ?? undefined}
                openModal={openAddModal}
                closeModal={handleClose}
                onSaved={handleSave}
                team={peopleEnrollment.populateTeam}
                designation={peopleEnrollment.designation}
                location={peopleEnrollment.location}
                roles={peopleEnrollment.roles}
                skills={peopleEnrollment.skills}
            />

            <DeleteModal
                open={deleteModal}
                close={handleClose}
                dataInfo="User "
                id={selectUserId ?? 0}
                removeData={handleDelete}
                cancelData={handleClose}
            />
        </>
    );
}
