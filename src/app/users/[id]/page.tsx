'use client';

import { useEffect, useState, use } from 'react';
import { Container, Typography, Paper, Button, Box, Avatar } from '@mui/material';
import Link from 'next/link';

export default function SingleUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <Container sx={{ mt: 4 }}><Typography>Loading...</Typography></Container>;
  if (!user) return <Container sx={{ mt: 4 }}><Typography>User not found.</Typography></Container>;

  return (
    <Container sx={{ mt: 4, maxWidth: 600 }}>

      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={user.image} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
        <Typography variant="body1" color="textSecondary">{user.email}</Typography>
        
        <Box sx={{ mt: 3, width: '100%' }}>
          <Typography variant="h6">Details</Typography>
          <Typography><strong>Gender:</strong> {user.gender}</Typography>
          <Typography><strong>Phone:</strong> {user.phone}</Typography>
          <Typography><strong>Company:</strong> {user.company?.name}</Typography>
          <Typography><strong>Department:</strong> {user.company?.department}</Typography>
          <Typography><strong>Title:</strong> {user.company?.title}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
