'use client';

import React from "react";

import { AppBar as MuiAppBar, Drawer as MuiDrawer, Toolbar, IconButton, Typography, Box, Stack, Grid, Badge, Divider, Icon, Avatar, Menu, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

import AppsIcon from '@mui/icons-material/Apps';
import useAppBar from "../../hooks/AppBar/AppBar";
import { AccountCircle, Logout, ManageAccounts } from "@mui/icons-material";
import { IMenu, ISubMenu } from "@/interfaces/AppBar";

export default function AppBar() {

  const appBar = useAppBar();

  return (
    <>

      <MuiAppBar position="fixed" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={appBar.toggleDrawer}
          >
            <AppsIcon />
          </IconButton>
          <img src='/images/snr.png' height={40} style={{ marginLeft: 10 }} alt={""} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Distribution Center System
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <Stack alignItems={'flex-end'} justifyContent={'center'}>
              <Typography variant="caption" fontWeight={'bold'}>{appBar.user?.DisplayName}</Typography>
              <Typography variant="caption">User {appBar.user?.EmployeeNumber}</Typography>
            </Stack>
            <IconButton
              size={'small'}
              onClick={appBar.toggleAccount}
            >
              <Avatar />
            </IconButton>
          </Stack>
          <Menu
            anchorEl={appBar.anchorEl}
            id="account-menu"
            open={Boolean(appBar.anchorEl)}
            onClose={appBar.toggleAccount}
            onClick={appBar.toggleAccount}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <AccountCircle sx={{ mr: 1 }} /> My Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ManageAccounts />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="role-select">Role</InputLabel>
                <Select
                  labelId="role-select"
                  value={appBar.role}
                  label="Age"
                  onChange={(e) => appBar.changeRole(e.target.value)}
                >
                  {
                    appBar.user?.Roles.map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </MenuItem>
            <Divider />
            <MenuItem onClick={appBar.doLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>

      <MuiDrawer open={appBar.drawerOpen} onClose={appBar.toggleDrawer} slotProps={{ paper: { sx: { height: 'calc(100% - 75px)', borderRadius: 2, margin: '70px 0px 0px 5px' } } }}>
        <Box sx={{ width: appBar.isTablet ? '50vw' : '33vw', zoom: appBar.isTablet ? 0.7 : 1 }}>
          <Stack>
            {
              appBar.menu.map((menu: IMenu) =>
                <Box key={menu.name} margin={2}>
                  <Typography variant="h5" color="primary" fontWeight={'bold'}>{menu.name}</Typography>
                  <Grid container sx={{ m: 5 }}>
                    {
                      menu.items.map((item: ISubMenu) =>
                        <Grid key={item.name} size={4} maxWidth={400}>

                          <Stack alignItems={'center'} textAlign={'center'} width={130}>
                            <Badge color="error" badgeContent={item.badge ? " " : undefined} overlap="circular">
                              <IconButton onClick={() => appBar.menuClick(item.route)}>
                                <Icon sx={{ marginBottom: 2, padding: 1, fontSize: 50, borderRadius: '50%', outline: `10px solid ${menu.color}` }}>
                                  {item.icon}
                                </Icon>
                              </IconButton>
                            </Badge>
                            <Typography>{item.name}</Typography>
                          </Stack>
                        </Grid>
                      )
                    }
                  </Grid>
                  <Divider />
                </Box>
              )

            }
          </Stack>
        </Box>
      </MuiDrawer>

    </>
  );

}