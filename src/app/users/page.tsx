'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppStore } from '@/store';
import { 
  Container, Typography, TextField, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Box
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const UserRow = React.memo(({ user, onClick }: { user: any, onClick: () => void }) => (
  <TableRow hover onClick={onClick} style={{ cursor: 'pointer' }}>
    <TableCell>{user.firstName} {user.lastName}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.gender}</TableCell>
    <TableCell>{user.phone}</TableCell>
    <TableCell>{user.company?.name}</TableCell>
  </TableRow>
));
UserRow.displayName = 'UserRow';

export default function UsersPage() {
  const { users, totalUsers, fetchUsers, loadingUsers } = useAppStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    // skip is page * rowsPerPage
    fetchUsers(rowsPerPage, page * rowsPerPage, debouncedSearch);
  }, [page, rowsPerPage, debouncedSearch, fetchUsers]);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  }, []);

  const userRows = useMemo(() => {
    return users.map((user) => (
      <UserRow 
        key={user.id} 
        user={user} 
        onClick={() => router.push(`/users/${user.id}`)} 
      />
    ));
  }, [users, router]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Users Directory</Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingUsers ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            ) : userRows}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}
