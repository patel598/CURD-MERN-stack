

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Grid, FormControl, FormHelperText, Select, MenuItem } from '@mui/material';

// Components
import CkEditor from '../../components/ckEditor'

// Velidation Schema
import { editSchema, productSchema } from '../../Utils/validation';
import BaseUrl, { PRODUCT } from '../../API/BaseUrl';
import ToastMessage from '../../Utils/Toaster';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Utils/contextAPI';

// CSS
import './index.css';


const CreateProduct = () => {
  const { getProductDataById, getSingleData, setGetSingleData } = useAuth();
  const [imageName, setImageName] = useState('')
  const [loading, setLoading] = useState('')

  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation()



  const { errors, values, handleBlur, handleChange, handleSubmit, setFieldValue, touched, resetForm } = useFormik({
    initialValues: {
      metaTitle: '',
      productName: '',
      image: '',
      price: '',
      discountedPrice: '',
      description: '',
      qty: '',
      isActive: true,
      id: false,
    },
    validationSchema: id ? editSchema : productSchema,
    onSubmit: () => submitProduct()
  });




  useEffect(() => {
    if (id) {
      getProductDataById(`${PRODUCT}/${id}`)
      setFieldValue('id', true)
    }
  }, [id])

  useEffect(() => {
    console.log("dkflslkdfldsfs", getSingleData)
    if (getSingleData && id ) {
      setFieldValue("metaTitle", getSingleData?.metaTitle)
      setFieldValue("productName", getSingleData?.productName)
      setFieldValue("price", getSingleData?.price)
      setFieldValue("discountedPrice", getSingleData?.discountedPrice)
      setFieldValue("description", getSingleData?.description)
      setFieldValue("isActive", getSingleData?.isActive)
      setFieldValue("qty", getSingleData?.availableQTY)
      setImageName(getSingleData?.image)
    } else {
      setImageName("")
      resetForm()
    }
  }, [getSingleData, id, pathname])



  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit()
  }

  const submitProduct = async () => {
    const formData = new FormData()
    formData.append("metaTitle", values.metaTitle)
    formData.append("productName", values.productName)
    formData.append("price", (values.price).toString())
    formData.append("discountedPrice", (values.discountedPrice).toString())
    formData.append("description", values.description)
    // formData.append("userObjectId", user._id)
    formData.append("isActive", values.isActive)
    formData.append("qty", values.qty)
    formData.append("image", values.image || imageName)

    try {
      setLoading(true)
      let res;
      if (id) {
        res = await BaseUrl.put(`${PRODUCT}/${id}`, formData)
      } else {
        res = await BaseUrl.post(PRODUCT, formData)
      }
      if (res?.data?.status) {
        ToastMessage("success", res?.data?.message)
        navigate("/dashboard/product")
        resetForm()
        setGetSingleData({})
        setLoading(false)
      } else {
        ToastMessage("error", res?.data?.message)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }

  }

  const ckChange = (text, type) => {
    const ckVal = type.getData()
    setFieldValue("description", ckVal)
  }
  
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <form
        onSubmit={handleFormSubmit} encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={touched.image && Boolean(errors.image)}>
              <div className='upload_image_field'>
                <label htmlFor="image" >Select a Image </label>
                <p>{imageName} </p>

              </div>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                  setImageName(event.currentTarget.files[0].name)
                }}
                onBlur={handleBlur}
                accept="image/*"
                style={{ display: "none" }}
              />
              <FormHelperText>{touched.image && errors.image}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="metaTitle"
              label="Meta Title"
              value={values.metaTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.metaTitle && Boolean(errors.metaTitle)}
              helperText={touched.metaTitle && errors.metaTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="productName"
              label="Product Name"
              value={values.productName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.productName && Boolean(errors.productName)}
              helperText={touched.productName && errors.productName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="qty"
              label="QTY"
              type="number"
              value={values.qty}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.qty && Boolean(errors.qty)}
              helperText={touched.qty && errors.qty}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="discountedPrice"
              name="discountedPrice"
              label="Discounted Price"
              type="number"
              value={values.discountedPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.discountedPrice && Boolean(errors.discountedPrice)}
              helperText={touched.discountedPrice && errors.discountedPrice}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="isActive"
                value={values.isActive}
                onChange={handleChange}
                size='small'
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>In-active</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <CkEditor {...{ values, handleBlur, ckChange, touched, errors }} />
          {/* <p>{values.description.length}</p> */}
          <Grid item xs={12} mb={1}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {loading ? "Loading..." : (id ? "Update" : "Submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateProduct;
