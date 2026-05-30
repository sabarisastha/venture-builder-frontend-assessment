'use client';

import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === 'unauthenticated' || pathname === '/login') {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              StudyAbroad<span style={{ color: '#EC4899' }}>.</span>
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/dashboard" sx={{ mr: 1 }}>Dashboard</Button>
          <Button color="inherit" component={Link} href="/users" sx={{ mr: 1 }}>Users</Button>
          <Button color="inherit" component={Link} href="/products" sx={{ mr: 2 }}>Products</Button>
          <Button variant="contained" color="primary" onClick={() => signOut()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
