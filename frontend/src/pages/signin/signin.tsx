import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { apiSignIn } from '../../api'
import { makeStyles } from '@mui/styles'
import { useFormik } from "formik"
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
    width: '440px',
    padding: '10px 40px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
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
  }
}))

export default function SignIn() {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is a required field'),
      password: Yup.string().required('Password is a required field'),
    }),
    onSubmit: async (values) => {
      const { data, err } = await apiSignIn(values)
      if (err) toast.error(`${err.message}`)
      else {
        toast.success('You are login successfully')
        localStorage.setItem('accessToken', data.accessToken)
      }
    },
  })

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  return (
    <>
      <Box className={classes.backgrond}>
        <Box className={classes.form}>
          <Box className={classes.center} >
            <img src='/logo.svg' />
            <Typography color='primary' variant='body1'>
              Automate <br /> Construction <br /> Monitoring
            </Typography>
          </Box>
          <Box className={classes.header}>
            <Typography variant='body1'>
              LOGIN
            </Typography>
            <Typography color='primary' fontWeight='bold' fontSize='20px'>
              Welcome Back
            </Typography>
          </Box>
          <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              fullWidth
              label='Email or Username'
              name='username'
              value={formik.values.username}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
              onChange={formik.handleChange}
            />
            <TextField
              margin='normal'
              fullWidth
              label='Password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
            />
            <Box className={classes.spaceBetween} >
              <FormControlLabel
                control={<Checkbox checked={showPassword} onChange={handleShowPassword} />} label='Show password'
              />
              <Typography variant='body1'>
                <Link className={classes.link} to=''>Forgot password?</Link>
              </Typography>
            </Box>
            <Button
              color='secondary'
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ mt: 2, mb: 1, py: 1.5 }}
            >
              Login
            </Button>
            <Box className={classes.center}>OR</Box>
            <Button
              color='primary'
              fullWidth
              size='large'
              variant='contained'
              sx={{ mt: 1, mb: 2, py: 1.5 }}
            >
              <img src="/google.svg" /> {' '} Login with google
            </Button>
            <Box className={classes.center} >
              <Typography variant='body1'>
                Not on Viact yet?{' '}<Link className={classes.link} to='/signup'>Signup</Link>{' '}now.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box >
    </>
  )
}