import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { apiSignUp } from '../../api'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles(() => ({
  backgrond: {
    background: 'url(/background.png), #0b454f',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '920px',
    padding: '10px 40px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  link: {
    color: '#EB5757',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  content: {
    color: '#4B4C4C',
    padding: "30px",
    "& p": {
      marginBottom: "20px",
    },
  },
}))

export default function SignUp() {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '+84',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      username: Yup.string().min(3).required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
      password: Yup.string().min(8,).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required(),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required(),
    }),
    onSubmit: async (values) => {
      const { err } = await apiSignUp(values)
      if (err) toast.error(`${err.message}`)
      else window.location.href = '/'
    },
  })

  const contents = [
    "Understand why Viact is being used on millions of customers everyday",
    "Find out if Viact is the right fit for your business",
    "Get all your questions answered (personally)",
    "Completely risk-free with 14-day free trial and a 30-day money back guarantee!",
  ]

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  return (
    <>
      <Box className={classes.backgrond}>
        <Box className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box className={classes.center} >
                <img src='/logo.svg' />
                <Typography color='primary' variant='body1'>
                  Automate <br /> Construction <br /> Monitoring
                </Typography>
              </Box>
              <Box className={classes.header}>
                <Typography variant='body1'>
                  CREATE NEW ACCOUNT
                </Typography>
                <Typography color='primary' fontWeight='bold' fontSize='20px'>
                  Build smart risk free
                </Typography>
              </Box>
              <Box className={classes.content}>
                {contents.map((item) => (
                  <Typography component="p" variant="body1">
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  required
                  margin='normal'
                  fullWidth
                  label='First Name'
                  name='firstName'
                  value={formik.values.firstName}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  // helperText={formik.touched.firstName && formik.errors.firstName}
                  onChange={formik.handleChange}
                />
                <TextField
                  required
                  margin='normal'
                  fullWidth
                  label='Last Name'
                  name='lastName'
                  value={formik.values.lastName}
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  // helperText={formik.touched.lastName && formik.errors.lastName}
                  onChange={formik.handleChange}
                />
                <TextField
                  required
                  margin='normal'
                  fullWidth
                  label='Username'
                  name='username'
                  value={formik.values.username}
                  error={formik.touched.username && !!formik.errors.username}
                  // helperText={formik.touched.username && formik.errors.username}
                  onChange={formik.handleChange}
                />
                <TextField
                  required
                  margin='normal'
                  fullWidth
                  label='Email'
                  name='email'
                  value={formik.values.email}
                  error={formik.touched.email && !!formik.errors.email}
                  // helperText={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                />
                <MuiTelInput
                  required
                  margin='normal'
                  fullWidth
                  label='Phone'
                  name='phone'
                  value={formik.values.phone}
                  error={formik.touched.phone && !!formik.errors.phone}
                  // helperText={formik.touched.phone && formik.errors.phone}
                  onChange={(value) => formik.handleChange({ target: { name: 'phone', value: value, } })}
                />
                <TextField
                  required
                  margin='normal'
                  fullWidth
                  label='Password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText='Must contain at least 8 characters, a combination of upper, lower case number and least one special character'
                  onChange={formik.handleChange}
                />
                <TextField
                  required
                  margin='normal'
                  fullWidth
                  label='Confirm Password'
                  name='confirmPassword'
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.confirmPassword}
                  error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  // helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  onChange={formik.handleChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={showPassword} onChange={handleShowPassword} />} label='Show password'
                />
                <Button
                  color='secondary'
                  type='submit'
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Sign Up
                </Button>
                <Box className={classes.center} >
                  <Typography variant='body1'>
                    Already have an account?{' '}<Link className={classes.link} to='/'>Login.</Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}