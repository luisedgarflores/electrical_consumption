import React from 'react'
import { useForm } from 'react-hook-form'
// Material UI
import { Avatar, Box, Container, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// Utils
import { CustomInput, useCustomController } from '../Utils/utils'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../Mutations/Mutations'
// React Router
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    login({ variables: { data } })
  }

  const handleOnCompleted = (data) => {
    const token = data?.login?.token?.value
    const userName = data?.login?.user?.name
    localStorage.setItem('token', token)
    localStorage.setItem('user-name', userName)
    navigate('/dashboard')
  }

  const handleError = (error) => {
    console.log({ error })
  }

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: handleOnCompleted,
    onError: handleError
  })

  const form = {
    email: useCustomController({
      name: 'email',
      control,
      rules: { required: true },
      label: 'Correo'
    }),
    password: useCustomController({
      name: 'password',
      control,
      rules: { required: true },
      label: 'Contraseña',
      type: 'password'
    })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5' style={{ margin: '1rem' }}>
          Iniciar sesión
        </Typography>
        <CustomInput
          form={form}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          button='Iniciar sesión'
        />
      </Box>
    </Container>
  )
}

export default Login
