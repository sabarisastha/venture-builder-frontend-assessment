'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Dashboard Overview</Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Users Management</Typography>
            <Button variant="contained" component={Link} href="/users">View Users</Button>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Products Management</Typography>
            <Button variant="contained" component={Link} href="/products">View Products</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
