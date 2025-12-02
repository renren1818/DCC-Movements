import { useEffect, useMemo, useState } from "react";
import { GridPaginationModel, GridRowClassNameParams } from "@mui/x-data-grid";
import { CreateTeam } from "@/interfaces/enrollment/Teams/Teams";
import { useTeams } from "@/hooks/Enrollment/Teams/useTeams";
import { TeamTabKey } from "@/interfaces/enrollment/Common/Tabkey";
import { IPagination } from "@/interfaces/enrollment/Common/Pagination";

export function useTeamTable() {
  const teamsData = useTeams();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [query, setQuery] = useState("");
  const [selectTeam, setSelectTeam] = useState<CreateTeam | undefined>();
  const [selectTeamId, setSelectTeamId] = useState<number | null>(null);
  const [loadingTeam, setLoadingTeam] = useState(false);

  const [pagination, setPagination] = useState<IPagination>({
    PageNumber: 0,
    OrderBy: "asc",
    ColumnToSort: "Name",
    PageSize: 10,
    SearchQuery: "",
  } as IPagination);

  const [tab, setTab] = useState<TeamTabKey>("all");

  const handleDelete = async () => {
    if (!selectTeamId) return setDeleteModal(false);

    await teamsData.removeTeam(selectTeamId);
    teamsData.setData(teamsData.data.filter((x) => x.TeamId !== selectTeamId));
    setDeleteModal(false);
  };

  const handleOpen = async (action: "Open" | "Modify" | "Delete") => {
    if (action === "Open") {
      if (!selectTeamId) {
        setOpenAddModal(true);
      }
    }

    if (action === "Modify" && selectTeamId) {
      setLoadingTeam(true);
      try {
        const team = await teamsData.fetchTeamId(selectTeamId);
        if (team) {
          setSelectTeam(team);
          setOpenAddModal(true);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoadingTeam(false);
      }
    }

    if (action === "Delete" && selectTeamId) setDeleteModal(true);
  };

  const handleClose = () => {
    setOpenAddModal(false);
    setSelectTeam(undefined);
    setDeleteModal(false);
    setSelectTeamId(null);
  };

  const handleSave = async (team: CreateTeam) => {
    try {
      if (!team.TeamId) {
        await teamsData.addTeams(team);
      } else {
        await teamsData.updateTeam(team);
      }
      setOpenAddModal(false);
      setSelectTeam(undefined);
    } catch (error) {
      console.error("Error saving team", error);
    }
  };

  const handeleColumnHeaderClick = (col: string) => {
    setPagination((prev) => ({
      ...prev,
      ColumnToSort: col,
      OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
    }));
  };

  const handleSetPageSize = (data: GridPaginationModel) => {
    setPagination((prev) => ({
      ...prev,
      PageSize: data.pageSize,
      PageNumber: data.page,
    }));
  };
  const getRowClassName = (params: GridRowClassNameParams) => (params.indexRelativeToCurrentPage % 2 === 0 ? "row-alt-gray" : "");

  const rows = () => {
    switch (tab) {
      case "Team":
        setPagination((prev) => ({
          ...prev,
          ColumnToSort: "Name",
          OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
        }));
        break;

      case "Shift":
        setPagination((prev) => ({
          ...prev,
          ColumnToSort: "Shift",
          OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
        }));
        break;
      case "Location":
        setPagination((prev) => ({
          ...prev,
          ColumnToSort: "Location",
          OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
        }));
        break;
      default:
        setPagination((prev) => ({
          ...prev,
          ColumnToSort: "Name",
          OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
        }));
    }
  };
  useEffect(() => {
    rows();
  }, [tab]);

  useEffect(() => {
    teamsData.fetchTeams(pagination.SearchQuery, pagination.PageNumber, pagination.PageSize, pagination.ColumnToSort);
  }, [pagination]);

  return {
    tab,
    setTab,
    query,
    setQuery,
    rows,
    selectTeam,
    selectTeamId,
    setSelectTeamId,
    openAddModal,
    deleteModal,
    loadingTeam,
    pagination,
    // handlers
    handleOpen,
    handleClose,
    handleSave,
    handleDelete,
    handeleColumnHeaderClick,
    handleSetPageSize,
    getRowClassName,
    // external data
    teamsData,
  };
}
