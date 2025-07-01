"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Drawer } from '@mui/material';
import MenuLateral from '@/app/menu/page';
import { useState } from 'react';
export default function ButtonAppBar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
     
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button onClick={toggleDrawer(true)} color="inherit">Menu</Button>
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

            <Drawer open={open} onClose={toggleDrawer(false)}>
       <MenuLateral />
      </Drawer>
    </Box>
  );
}
