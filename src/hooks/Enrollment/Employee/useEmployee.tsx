import { useEffect, useState } from "react";
import { useFetcher } from "../../Fetcher";

import { TimeConvertion } from "@/utils/TimeConvertion";
import { AddUser, User } from "@/interfaces/enrollment/Employee/User";
import { EmploymentDetails, RolesAndSkills } from "@/interfaces/enrollment/Employee/UserDialog";

export default function useEmployee() {
    const fetcher = useFetcher();

    const [data, setData] = useState<User[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const [populateTeam, setPopulateTeam] = useState<EmploymentDetails[]>([]);
    const [designation, setDesignation] = useState<EmploymentDetails[]>([]);
    const [location, setLocation] = useState<EmploymentDetails[]>([]);
    const [roles, setRoles] = useState<RolesAndSkills[]>([]);
    const [skills, setSkills] = useState<RolesAndSkills[]>([]);

    const fetchTeams = async () => {
        try {
            const response = await fetcher.GET("/team/PopulateTeams");
            const teams = response.data.data ?? response.data;
            const fetchTeam: EmploymentDetails[] = teams.map((detail: EmploymentDetails, index: number) => ({
                Value: detail.Value || index,
                Label: detail.Label,
                Disabled: detail.Disabled,
            }));
            setPopulateTeam(fetchTeam);
        } catch (error) {
            console.log("There are no existing team", error);
        }
    };

    const fetchUsers = async (query: string = "", pageNumber: number = 0, pageSize: number, tab?: string) => {
        try {
            console.log(pageSize);
            const response = await fetcher.POST("/User/GetUsersList", {
                searchQuery: query,
                pageNumber: pageNumber + 1,
                pageSize,
                pageCount: 0,
                columnToSort: tab ?? "",
                orderBy: "asc",
            });

            const payload = response.data.data ?? response.data;
            const users = Array.isArray(payload.data) ? payload.data : payload.data ?? payload;

            const fetchedUsers: User[] = users.map((emp: User) => ({
                id: emp.UserId,
                UserId: emp.UserId,
                EmployeeNumber: emp.EmployeeNumber,
                FullName: emp.FullName,
                Designation: emp.Designation,
                Ranks: emp.Ranks,
                Location: emp.Location,
                Skills: emp.Skills,
                Team: emp.Team,
                TeamColorCode: emp.TeamColorCode,
                Shift: `${TimeConvertion(emp.StartTime)} - ${TimeConvertion(emp.EndTime)}`,
            }));

            setData(fetchedUsers);
            setTotalCount(response.data.data.count);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const fetchDesignation = async () => {
        try {
            const response = await fetcher.GET("/UserDesignation/GetUserDesignationSelect");
            const teams = response.data.data ?? response.data;
            const fetchTeam: EmploymentDetails[] = teams.map((detail: EmploymentDetails, index: number) => ({
                Value: detail.Value || index,
                Label: detail.Label,
                Disabled: detail.Disabled,
            }));
            setDesignation(fetchTeam);
        } catch (error) {
            console.log("There are no existing designation", error);
        }
    };

    const fetchLocation = async () => {
        try {
            const response = await fetcher.GET("/Building/SelectBuilding");
            const teams = response.data.data ?? response.data;
            const fetchTeam: EmploymentDetails[] = teams.map((detail: EmploymentDetails, index: number) => ({
                Value: detail.Value || index,
                Label: detail.Label,
                Disabled: detail.Disabled,
            }));
            setLocation(fetchTeam);
        } catch (error) {
            console.log("There are no existing location", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetcher.GET("/role/GetRolesCheckbox");
            const role = response.data.data ?? response.data;
            const fetchRoles: RolesAndSkills[] = role.map((roles: RolesAndSkills) => ({
                Id: roles.Id,
                Name: roles.Name,
            }));
            setRoles(fetchRoles);
        } catch (error) {
            console.log("The Role doesn't exist", error);
        }
    };

    const fetchSkills = async () => {
        try {
            const response = await fetcher.GET("/Skill/GetSkillSelect");
            const skill = response.data.data ?? response.data;
            const fetchSkills: RolesAndSkills[] = skill.map((roles: RolesAndSkills, index: number) => ({
                Id: roles.Id || index,
                Name: roles.Name,
            }));
            setSkills(fetchSkills);
        } catch (error) {
            console.log("The Skill doesn't exist", error);
        }
    };

    const fetchUpdateUser = async (userId: number) => {
        try {
            const response = await fetcher.POST("/User/GetUserUpdateDto", userId);
            return response.data.data;
        } catch (error) {
            console.log("There are some missing fields", error);
        }
    };

    const fetchDeleteUser = async (userId: number) => {
        try {
            const response = await fetcher.POST("/User/DeleteUserAsync", userId);
            return response.data.data;
        } catch (error) {
            console.log("The user doesn't exist", error);
        }
    };

    const addUser = async (user: AddUser): Promise<User> => {
        const status = 1;
        const response = await fetcher.POST("/User/Enrollement", {
            id: user.UserId,
            UserId: user.UserId,
            EmployeeNumber: user.EmployeeNumber,
            EmploymentStatus: status.toString(),
            FirstName: user.FirstName,
            LastName: user.LastName,
            MiddleName: user.MiddleName,
            LocationId: parseInt(user.LocationId.toString()),
            RoleIds: user.RoleIds,
            SkillIds: user.SkillIds,
            TeamId: parseInt(user.TeamId.toString()),
            DesignationId: user.DesignationId,
        });

        // Normalize into User shape
        const emp = response.data.data ?? response.data;
        const saved: User = {
            UserId: emp.UserId,
            EmployeeNumber: emp.EmployeeNumber,
            FullName: emp.FullName,
            Designation: emp.Designation,
            Ranks: emp.Ranks,
            Location: emp.Location,
            Skills: emp.Skills,
            Team: emp.Team,
            TeamColorCode: emp.TeamColorCode,
            StartTime: emp.StartTime, // ✅ add this
            EndTime: emp.EndTime, // ✅ add this
            Shift: `${TimeConvertion(emp.StartTime)} - ${TimeConvertion(emp.EndTime)}`,
        };
        return saved;
    };

    const setUserUpdate = async (user: AddUser): Promise<User> => {
        const response = await fetcher.POST("/User/UpdateUserAsync", {
            ...user,
            EmploymentStatus: user.EmploymentStatus,
        });

        const emp = response.data.data ?? response.data;

        const updated: User = {
            UserId: emp.UserId,
            EmployeeNumber: emp.EmployeeNumber,
            FullName: emp.FullName,
            Designation: emp.Designation,
            Ranks: emp.Ranks,
            Location: emp.Location,
            Skills: emp.Skills,
            Team: emp.Team,
            TeamColorCode: emp.TeamColorCode,
            StartTime: emp.StartTime,
            EndTime: emp.EndTime,
            Shift: `${TimeConvertion(emp.StartTime)} - ${TimeConvertion(emp.EndTime)}`,
        };

        return updated;
    };

    const resetUser = (): AddUser => ({
        UserId: 0,
        EmployeeNumber: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        LocationId: 0,
        DesignationId: 0,
        TeamId: 0,
        EmploymentStatus: "active",
        SkillIds: [],
        RoleIds: [],
        ActiveStatus: true,
        IsLogIn: false,
        IsPasswordReset: false,
    });

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchTeams(), fetchUsers("", 0, 10), fetchDesignation(), fetchLocation(), fetchRoles(), fetchSkills()]);
        };
        fetchAll();
    }, []);

    return {
        data,
        totalCount,
        populateTeam,
        designation,
        location,
        roles,
        skills,
        resetUser,
        addUser,
        fetchUpdateUser,
        fetchDeleteUser,
        fetchUsers,
        setUserUpdate,
        setData,
    };
}
