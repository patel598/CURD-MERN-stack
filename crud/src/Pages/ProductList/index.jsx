import { Button, Card, CardContent, CardMedia, Grid, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './index.css';
import ToastMessage from '../../Utils/Toaster';
import BaseUrl, { GET_ALL_PRODUCTS, PRODUCT } from '../../API/BaseUrl';
import { getImagePath } from '../../Utils/localImage';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';




const ProductList = () => {

  const [product, setProduct] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams()
  const navigate = useNavigate()




  const getProductData = async () => {
    try {
      const { data } = await BaseUrl.get(`${GET_ALL_PRODUCTS}/${user?._id}`)
      if (data?.status) {
        setProduct(data?.products)
      } else {
        setProduct([])
        ToastMessage("error", data?.message)
      }
    } catch (error) {
      ToastMessage("error", error?.message)
    }
  }


  useEffect(() => {
    if (user) {
      getProductData()
    }
  }, [user?._id])

  const handleToggleActive = async (products, index) => {
    product[index].isActive = !products.isActive;
    setProduct([...product])
    try {
      const { data } = await BaseUrl.delete(`${PRODUCT}/${products?._id}/${products?.isActive}`)
      if (data?.status) {
        ToastMessage("success", data?.message)
      }
    } catch (error) {

      ToastMessage("success", error?.response?.data?.message)
    }
  };

  const handleBuyNow = (id) => {
    navigate(`/dashboard/product/${id}`)
  }

  const handleEdit = (val) => {
    navigate(`/dashboard/edit-product/${val?._id}`)
  }

  return (
    <>
      {
        id ? <Outlet />
          :

          <Grid container spacing={2}>
            {product.length ? product.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={product?._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={getImagePath(product.image)}
                    alt={product?.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product?.name}
                    </Typography>
                    <Typography className='product_description' variant="body2" color="text.secondary">
                      {product?.metaTitle}
                    </Typography>
                    <Typography variant="body1" color="text.primary" >
                      Price: ${product?.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Discount Price: ${product?.discountedPrice}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Available Quantity: {product?.availableQTY}
                    </Typography>
                    {
                      (user?.type === "user") &&

                      <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        disabled={product?.availableQTY < 1}
                        style={{ width: '100%', cursor: product?.availableQTY > 0 ? "pointer" : "not-allowed" }}
                        onClick={() => handleBuyNow(product?._id)}
                      >
                        {product?.availableQTY > 0 ? "Buy now" : "Sold OUT"}
                      </Button>
                    }
                    {
                      user?.type !== "user" &&
                      <div className="status_section">
                        <div className='status_btn'>
                          <span className="">Status</span>
                          <Switch
                            checked={product.isActive}
                            onChange={() => handleToggleActive(product, index)}
                            name="active"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        </div>

                        <DriveFileRenameOutlineIcon
                          onClick={() => handleEdit(product)}
                          sx={{ cursor: 'pointer' }} />
                      </div>
                    }
                  </CardContent>
                </Card>
              </Grid>
            ))
              :
              <p style={{ display: "flex", justifyContent: 'center', alignItems: "center", height: '50vh', width: '100%' }}>Product not found, please create product...</p>
            }
          </Grid>
      }
    </>

  );
};

export default ProductList;
