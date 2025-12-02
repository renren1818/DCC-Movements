"use client";
import ActionButtons from "@/components/Common/ActionButtons";
import { StyledTab, TabNavigationList, TabNavigationPanel } from "@/styles/TabNavigation";
import { TabContext } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { columns } from "./Columns";
import { EnrollmentDataGrid } from "@/styles/EnrollmentDataGrid";
import AddModifiedDialogTeam from "./AddModifiedDialogTeam";
import DeleteModal from "@/components/Common/DeleteModal";
import { useTeamTable } from "@/hooks/Enrollment/Teams/useTeamTable";

export default function TeamTable() {
  const {
    tab,
    setTab,
    query,
    setQuery,
    rows,
    selectTeam,
    selectTeamId,
    openAddModal,
    deleteModal,
    loadingTeam,
    setSelectTeamId,
    handleOpen,
    handleClose,
    handleSave,
    handleDelete,
    handleSetPageSize,
    getRowClassName,
    teamsData,
    handeleColumnHeaderClick,
    pagination,
  } = useTeamTable();

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "rgb(33, 44, 94)", fontWeight: "bold" }}>
          Team Masterlist
        </Typography>
      </Box>

      <Stack sx={{ width: "100%" }}>
        <TabContext value={tab}>
          <ActionButtons
            onAdd={() => handleOpen("Open")}
            onDelete={() => handleOpen("Delete")}
            onModify={() => handleOpen("Modify")}
            disableAdd={!!selectTeamId}
            disableModify={!selectTeamId || loadingTeam}
            disableDelete={!selectTeamId}
            onTextChange={setQuery}
            textValue={query}
            search="Team"
            change="Employee"
            link="/enrollment/employee"
            hideLink={false}
          />

          <Stack direction="row" justifyContent="flex-end">
            <TabNavigationList onChange={(_, v) => setTab(v)}>
              <StyledTab label="SHOW ALL" value="all" />
              <StyledTab label="GROUP BY TEAM" value="Name" />
              <StyledTab label="GROUP BY SHIFT" value="Shift" />
              <StyledTab label="GROUP BY LOCATION" value="Location" />
            </TabNavigationList>
          </Stack>

          <TabNavigationPanel value={tab}>
            <EnrollmentDataGrid
              rows={teamsData.data}
              columns={columns}
              checkboxSelection
              getRowClassName={getRowClassName}
              disableMultipleRowSelection
              onRowSelectionModelChange={(a) => {
                const id = a.ids.values().next().value as number | null;
                setSelectTeamId(id);
              }}
              pageSizeOptions={[5, 10, 25]}
              onColumnHeaderClick={(params, _) => {
                handeleColumnHeaderClick(params.colDef.field);
              }}
              paginationModel={{ pageSize: pagination.PageSize, page: pagination.PageNumber }}
              onPaginationModelChange={(model) => handleSetPageSize(model)}
              paginationMode={"server" as const}
              rowCount={teamsData.totalCount * pagination.PageSize}
            />
          </TabNavigationPanel>
        </TabContext>
      </Stack>

      <AddModifiedDialogTeam
        openModal={openAddModal}
        closeModal={handleClose}
        scheduleData={teamsData.schedule}
        distriCenter={teamsData.distriCenter}
        teamData={selectTeam}
        onSave={handleSave}
      />
      <DeleteModal
        open={deleteModal}
        close={handleClose}
        dataInfo="Team"
        id={selectTeamId ?? 0}
        removeData={handleDelete}
        cancelData={handleClose}
      />
    </>
  );
}
