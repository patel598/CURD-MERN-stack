/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */



// library 
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

// css 
import './index.css';
import { LoginSchema } from '../../Utils/validation';
// import { BaseUrl, LOGIN } from '../../API/BaseUrl';
// import ToastMessage from '../../Utils/Toaster';
import { useAuth } from '../../Utils/contextAPI';





export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, loading } = useAuth();


  const navigate = useNavigate()


  const initial = {
    email: '',
    password: '',
  };
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
    initialValues: initial,
    validationSchema: LoginSchema,
    onSubmit: () => submitLoginForm(),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const submitLoginForm = async () => {
    const bodyParam = { email: values.email, password: values.password };
    await signin(bodyParam);
  }




  const createNewUser = () => {
    navigate('/sign-up')
  }



  return (
    <form onSubmit={handleSubmit} className='registratio_form_body' >

      <Stack className='registration_title_text'>
        LOGIN
      </Stack>
      <TextField
        id="email"
        autoComplete="new-email"
        size='small'
        label="Email Address"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ width: "100%", mt: 1, minWidth: '250px' }}
      />

      <FormControl sx={{ width: '100%', mt: 2, minWidth: '250px' }} variant="outlined">
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
                {!showPassword ? <VisibilityOff /> : <Visibility />}
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
        sx={{ mt: 2, mb: 1 }}
      >
        Log In
      </LoadingButton>
      <div className='create_new'>
        <p> Don’t have account yet?&nbsp;</p><Link onClick={createNewUser}> New Account </Link>
      </div>
    </form>
  );
}



