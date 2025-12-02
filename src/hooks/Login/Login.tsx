import React, { ChangeEvent } from "react";
import { useSession } from "@/contexts/Session";
import { useRouter } from "next/navigation";

export function useLogin() {

    const session = useSession();
    const router = useRouter();
    
    const [username, setUsername]= React.useState('');
    const [password, setPassword]= React.useState('');
    const [revealPassword, setRevealPassword] = React.useState(false);

    const [usernameError, setUsernameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const doLogin = async () => {

        const result = await session.login(username, password);

        switch (result) {

            case "Login Successfull":

                router.push("/");

                break;

            case "Invalid Credentials.":

                setPasswordError('Invalid password.')
                break;

            case "No user found.":

                setUsernameError('Username not found.')
                break;

        }

    }

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        setUsernameError('');
        setUsername(event.currentTarget.value);

    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        setPasswordError('');
        setPassword(event.currentTarget.value);

    }

    return {
        username, setUsername,
        password, setPassword,
        revealPassword, setRevealPassword,
        usernameError, setUsernameError,
        passwordError, setPasswordError,
        doLogin,
        handleUsernameChange,
        handlePasswordChange
    }

}