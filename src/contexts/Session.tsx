'use client';

import { useFetcher } from '@/hooks/Fetcher';
import { IUser } from '@/interfaces/SessionContext';
import { useMediaQuery, useTheme } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useContext } from 'react';

import Cookies from 'js-cookie';

interface SessionProps { children: ReactNode };

interface ISession {

    isTablet: boolean;
    user: IUser | undefined;
    login: (username: string, password: string) => Promise<string>;
    logout: () => void;
    getCurrentRole: () => string;
    setCurrentRole: (role: string) => void;

}

const SessionContext = createContext<ISession>({} as ISession);

export const useSession = () => {

    return useContext(SessionContext);

}

export default function SessionProvider({ children }: SessionProps) {
   
    const theme = useTheme();
    const router = useRouter();
    const fetcher = useFetcher();

    const login = async (username: string, password: string) => {

        const result = await fetcher.POST('login/Login', {
            Username: username,
            Password: password
        });

        if (result.data.Message === 'Login Successfull') { 

            const token = jwtDecode<IUser>(result.data.Token);

            Cookies.set('token', result.data.Token);
            Cookies.set('role', btoa(token.Roles[0]));
            
        }


        return result.data.Message;

    }

    const logout = () => {
        
        Cookies.remove('token');
        router.push('/login');
        
    }
    
    const getCurrentUser = () => Cookies.get('token') ? jwtDecode<IUser>(Cookies.get('token')!) : undefined;

    const getCurrentRole = () => atob(Cookies.get('role')!);

    const setCurrentRole = (role: string) => Cookies.set('role', btoa(role));

    return (
        <SessionContext.Provider 
            value={{ 
                isTablet: useMediaQuery(theme.breakpoints.down('xl')), 
                user: getCurrentUser(), 
                login,
                logout,
                getCurrentRole,
                setCurrentRole
            }}
        >
            {children}
        </SessionContext.Provider>
    );

}
