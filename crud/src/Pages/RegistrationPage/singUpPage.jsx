/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */


// Library
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


//CSS
import './index.css';
import { SignUpSchema } from '../../Utils/validation';
import BaseUrl, { SING_UP } from '../../API/BaseUrl';
import ToastMessage from '../../Utils/Toaster';
import UploadImage from '../../components/uploadImage';





export default function SingUpPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const initial = {
    name: '',
    email: '',
    password: '',
    image: '',
  };

  const { handleChange, handleSubmit, handleBlur, setFieldValue, values, errors, touched } = useFormik({
    initialValues: initial,
    validationSchema: SignUpSchema,
    onSubmit: () => submitLoginForm(),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onFormSubmit = (event) => {
    event.preventDefault()
    handleSubmit()
  };

  const submitLoginForm = async () => {
    const formData = new FormData();
    formData.append("fullName", values.name)
    formData.append("email", values.email)
    formData.append("password", values.password)
    formData.append("image", values.image)
    formData.append("type", "user")
    try {
      setLoading(true)
      const { data } = await BaseUrl.post(SING_UP, formData)
      
      if (data?.status) {
        ToastMessage("success", data?.message)
        navigate('/login')
        setLoading(false)
      } else {
        ToastMessage("error", data?.message)
        setLoading(false)
      }
    } catch (error) {
      console.log("response", error)
    }
  }




  const createNewUser = () => {
    navigate('/login')
  }



  return (
    <form onSubmit={onFormSubmit} className='registratio_form_body'>
      <Stack className='registration_title_text'>
        Sign Up
      </Stack>
      <UploadImage
      {...{ setFieldValue, errors}}
      image= {values.image}

      />
      <TextField
        id="name"
        autoComplete="new-name"
        label="Full Name"
        name="name"
        size='small'
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        sx={{ width: "100%", mt: 1 }}
      />
      <TextField
        id="email"
        autoComplete="new-email"
        label="Email Address"
        name="email"
        size='small'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ width: "100%", mt: 1, minWidth: '250px' }}
      />

      <FormControl sx={{ width: "100%", mt: 1, minWidth: '250px' }} variant="outlined">
        <InputLabel className={touched.password && errors.password ? 'password-label-error' : 'password-label'} htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          className={touched.password && errors.password ? 'password-style' : ""}
          id="password"
          size='small'
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {!showPassword ? <VisibilityOff color='red' /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {touched.password && errors.password ? (
          <div className="error_text">{errors.password}</div>
        ) : null}
      </FormControl>

      <LoadingButton
        disabled={loading}
        loading={loading}
        type="submit"
        fullWidth
        className='login_btn'
        variant="contained"
        sx={{ width: "100%", mt: 1, minWidth: '250px' }}
      >
        Create account
      </LoadingButton>


      <div className='create_new'>
        <p> Already have an account?&nbsp;</p><Link onClick={createNewUser}>  Log in </Link>
      </div>

    </form>

  );
}



