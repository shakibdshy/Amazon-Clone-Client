import { Box, Button, Divider, Input, PaperProps, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { FormEvent } from 'react'
import AuthLayout from '../components/Auth/AuthLayout'

const Register = (props: PaperProps) => {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    
  }
  return (
    <AuthLayout>
      <Box style={{ width: '350px', maxWidth: "350px", border: '1px solid rgb(193, 194, 197)', borderRadius: '8px', padding: "14px 18px" }}>
        <Title order={3} size="h2" className=''>Create account</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Your name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            styles={(theme) => ({
              root: {
                marginTop: theme.spacing.xs,
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[6],
                }
              }
            })}
          />
          <TextInput
            required
            label="Mobile number or email"
            placeholder=""
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            styles={(theme) => ({
              root: {
                marginTop: theme.spacing.xs,
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[6],
                }
              }
            })}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            styles={(theme) => ({
              root: {
                marginTop: theme.spacing.xs,
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[6],
                }
              }
            })}
          />
          <PasswordInput
            required
            label="Re-enter Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            styles={(theme) => ({
              root: {
                marginTop: theme.spacing.xs,
              },
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.yellow[6],
                }
              }
            })}
          />
          <Button variant="default" fullWidth={true} style={{ marginTop: "20px", background: "#f0c14b", borderColor: "#a88734 #9c7e31 #846a29", color: "#111" }}>Continue</Button>
        </form>
        
        <p style={{ marginTop: "20px", marginRight: "45px", fontSize: "12px" }}>By creating an account, you agree to Amazon&lsquo;s <Text variant="link" component="a" href="/" style={{}}>Conditions</Text> of Use and <Text variant="link" component="a" href="/">Privacy Notice</Text>.</p>
        <Divider my="xl" />
        <p style={{ marginTop: "20px", marginRight: "45px", fontSize: "12px" }}>Already have an account? <Text variant="link" component="a" href="/signin">Sign-In</Text></p>
      </Box>
    </AuthLayout>
  )
}

export default Register