'use client';

import React from "react";

import { Box, Button, Grid, IconButton, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import SnrLogo from "@/assets/images/snr-white.png";
import CornerImage from "@/assets/images/corner.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "@/hooks/Login/Login";

export default function Login() {

    const login = useLogin();

    return (

        <Box
            sx={{
                backgroundColor: "#002060",
                height: "auto",
            }}
            display={"flex"}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Box
                    position='absolute'
                    top={0}
                    right={0}
                    py={0}
                    component='img'
                    src={CornerImage.src}
                    alt='curve'
                    sx={{
                        transform: "rotate(180deg)",
                        width: 500,
                    }}
                />
                <Box
                    display={"flex"}
                    position='absolute'
                    bottom={0}
                    left={0}
                    p={0}
                    component='img'
                    src={CornerImage.src}
                    alt='S&R'
                    sx={{
                        width: 500,
                        marginX: -5,
                    }}
                />
                <Grid
                    container
                    spacing={2}
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    sx={{ minHeight: "100vh" }}
                >
                    <Grid
                        size={{ sm: 5, md: 5, lg: 4 }}
                        sx={{
                        marginTop: useMediaQuery("(orientation: portrait)")
                            ? { xs: -10, sm: -50, md: -25 }
                            : { xs: -10, sm: -15, md: -25 },
                        }}
                    >
                        <Box display={"flex"} flexDirection={"column"}>
                        <Box
                            component='img'
                            src={SnrLogo.src}
                            alt='curve'
                            sx={{
                            width: 150,
                            }}
                        />
                        <Box
                            component={"h1"}
                            color={"white"}
                            width={10}
                            fontSize={{ sm: 40, md: 60 }}
                        >
                            Distribution Center System
                        </Box>
                        </Box>
                    </Grid>
                    <Grid
                        size={{ sm: 6, md: 5, lg: 4 }}
                        sx={{
                            marginTop: { xs: 5, sm: 6, md: 5 },
                        }}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#002060",
                                padding: 2,
                                border: "solid white .5px",
                                borderRadius: 10,
                                color: "#FFFFFF",
                                zIndex: 3,
                                "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: -1,
                                borderRadius: "inherit", // Ensures the border and content share the same radius
                                padding: "10px", // Thickness of the border
                                background: "linear-gradient(360deg, #021232, #02256b)",
                                // "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                // "-webkit-mask-composite": "xor",
                                maskComposite: "exclude",
                                },
                            }}
                            position={"absolute"}
                            component={"h2"}
                            width={120}
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            Hello
                        </Box>
                        <Box
                        sx={{
                            marginTop: 5,
                            position: "relative",
                            padding: 5,
                            width: 320,
                            maxHeight: 500,
                            height: 350,
                            borderRadius: 10, // Adjust for your preference
                            backgroundColor: "#FFFFFF",
                            zIndex: 1,
                            // Inner content styles
                            "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: -1,
                            borderRadius: "inherit", // Ensures the border and content share the same radius
                            padding: "10px", // Thickness of the border
                            background: "linear-gradient(360deg, gray, lightgray)",
                            // "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            // "-webkit-mask-composite": "xor",
                            maskComposite: "exclude",
                            },
                        }}
                        >
                            <Box display={"flex"} flexDirection={"column"}>
                                <TextField
                                    autoComplete='off'
                                    label='Username'
                                    value={login.username}
                                    onChange={login.handleUsernameChange}
                                    onKeyUp={(e) => { if (e.key === 'Enter') login.doLogin() }}
                                    error={login.usernameError !== ''}
                                    helperText={login.usernameError}
                                    sx={{ marginY: "2rem" }}
                                />
                                <TextField
                                    autoComplete='off'
                                    value={login.password}
                                    onChange={login.handlePasswordChange}
                                    onKeyUp={(e) => { if (e.key === 'Enter') login.doLogin() }}
                                    error={login.passwordError !== ''}
                                    helperText={login.passwordError}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                '& ::-ms-reveal': { display: 'none' }
                                            },
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={() => login.setRevealPassword((prev) => !prev)}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        tabIndex={-1}
                                                    >
                                                        { login.revealPassword ? <VisibilityOff /> : <Visibility /> }
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    label='Password'
                                    variant='outlined'
                                    fullWidth
                                    type={ login.revealPassword ? "text" : "password"}
                                    sx={{
                                        marginBottom: "1.5rem",
                                    }}
                                />
                                { 
                                    /* 
                                    <Box display='flex' justifyContent='flex-end'>
                                        <Link href='#'>Forgot Password?</Link>
                                    </Box>
                                    */ 
                                }
                                <Button
                                    color='primary'
                                    type='submit'
                                    sx={{ marginTop: 9, fontSize: 20, borderRadius: 10 }}
                                    variant='contained'
                                    onClick={login.doLogin}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );

}