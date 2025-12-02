'use client';

import React from "react";
import { useCallback } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "@/contexts/Session";
import { IUser } from "@/interfaces/SessionContext";

import { ManagerMenu, SupervisorMenu, SuperuserMenu } from "./AppMenu";
import { IMenu } from "@/interfaces/AppBar";

export default function useAppBar() {

    const router = useRouter();
    const session = useSession();

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [user, setUser] = React.useState<IUser>();
    const [role, setRole] = React.useState('');
    const [menu, setMenu] = React.useState<IMenu[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {

        const currentRole = session.getCurrentRole() ?? session.user?.Roles[0];

        setUser(session.user);
        setRole(currentRole);

        switch (currentRole) {

            case 'System Administrator':

                setMenu(SuperuserMenu);
                break;

            case 'Manager': 

                setMenu(ManagerMenu);
                break;

            case 'Supervisor': 

                setMenu(SupervisorMenu);
                break;

            default:

                setMenu([]);

        }

    }, [role, session]);

    const toggleDrawer = useCallback(() => {
        setDrawerOpen(prev => !prev);
    }, []);

    const menuClick = useCallback((route: string) => {
        toggleDrawer();
        router.push(route);
    }, [router, toggleDrawer]);

    const toggleAccount = (event: React.MouseEvent<HTMLElement>) => setAnchorEl((prev) => prev ? null : event.currentTarget);

    const changeRole = (newRole: string) => {

        session.setCurrentRole(newRole);
        setRole(newRole);
        router.push('/');

    }

    return {
        user,
        menu,
        drawerOpen,
        toggleDrawer,
        menuClick,
        isTablet: session.isTablet,
        anchorEl, 
        toggleAccount,
        role,
        changeRole,
        doLogout: session.logout
    };

}