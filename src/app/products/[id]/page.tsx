'use client';

import { useEffect, useState, use } from 'react';
import { Container, Typography, Paper, Button, Box, Grid } from '@mui/material';
import Link from 'next/link';

export default function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Container sx={{ mt: 4 }}><Typography>Loading...</Typography></Container>;
  if (!product) return <Container sx={{ mt: 4 }}><Typography>Product not found.</Typography></Container>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }} 
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, overflow: 'auto' }}>
              {product.images.map((img: string, idx: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  style={{ 
                    width: 60, 
                    height: 60, 
                    cursor: 'pointer',
                    border: activeImage === idx ? '2px solid #1976d2' : 'none'
                  }}
                  onClick={() => setActiveImage(idx)}
                />
              ))}
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="h5" color="primary" gutterBottom>${product.price}</Typography>
            <Typography variant="subtitle1" gutterBottom>Category: {product.category}</Typography>
            <Typography variant="subtitle1" gutterBottom>Rating: {product.rating} / 5</Typography>
            <Typography variant="subtitle1" gutterBottom>Stock: {product.stock}</Typography>
            <Typography variant="subtitle1" gutterBottom>Brand: {product.brand}</Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
