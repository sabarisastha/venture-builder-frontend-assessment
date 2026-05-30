'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppStore } from '@/store';
import { 
  Container, Typography, TextField, Grid, Card, CardContent, CardMedia,
  TablePagination, Button, Box, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const ProductCard = React.memo(({ product, onClick }: { product: any, onClick: () => void }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={onClick}>
    <CardMedia
      component="img"
      height="200"
      image={product.images[0]}
      alt={product.title}
      sx={{ objectFit: 'contain' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="div">
        {product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Category: {product.category}
      </Typography>
      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
        ${product.price}
      </Typography>
      <Typography variant="body2">
        Rating: {product.rating} / 5
      </Typography>
    </CardContent>
  </Card>
));
ProductCard.displayName = 'ProductCard';

export default function ProductsPage() {
  const { products, totalProducts, fetchProducts, loadingProducts } = useAppStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const catList = data.map((c: any) => typeof c === 'string' ? c : c.slug);
        setCategories(catList);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProducts(rowsPerPage, page * rowsPerPage, debouncedSearch, category);
  }, [page, rowsPerPage, debouncedSearch, category, fetchProducts]);

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
    setCategory('all'); // Usually search overrides category in simple implementations
  }, []);

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setCategory(e.target.value);
    setPage(0);
    setSearch('');
  }, []);

  const productCards = useMemo(() => {
    return products.map((product) => (
      <Grid key={product.id} xs={12} sm={6} md={4}>
        <ProductCard 
          product={product} 
          onClick={() => router.push(`/products/${product.id}`)} 
        />
      </Grid>
    ));
  }, [products, router]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Products Catalog</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} sm={8}>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loadingProducts ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {productCards}
          </Grid>
          <TablePagination
            component="div"
            count={totalProducts}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 30]}
          />
        </>
      )}
    </Container>
  );
}
