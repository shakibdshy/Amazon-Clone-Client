import { Box, Button, Divider, Input, Text, TextInput, Title } from '@mantine/core'
import React from 'react'
import AuthLayout from '../components/Auth/AuthLayout'

const Register = () => {
  return (
    <AuthLayout>
      <Box style={{ width: '350px', maxWidth: "350px", border: '1px solid #ddd', borderRadius: '4px', padding: "14px 18px" }}>
        <Title order={3} size="h2" className=''>Create account</Title>
        <Input.Wrapper mt="md" label="Your name" inputWrapperOrder={['label', 'error', 'input', 'description']} required>
          <Input type="text" placeholder="First and last name" />
        </Input.Wrapper>
        <Input.Wrapper mt="md" label="Mobile number or email " required>
          <Input type="text" placeholder="" />
        </Input.Wrapper>
        <Input.Wrapper mt="md" label="Password" description="Passwords must be at least 6 characters." inputWrapperOrder={['label', 'input', 'error', 'description']} required>
          <Input type="password" placeholder="At least 6 characters" />
        </Input.Wrapper>
        <Input.Wrapper mt="md" label="Re-enter password" required>
          <Input type="password" placeholder="" />
        </Input.Wrapper>
        <Button variant="default" fullWidth={true} style={{ marginTop: "20px", background: "#f0c14b", borderColor: "#a88734 #9c7e31 #846a29", color: "#111" }}>Continue</Button>
        <p style={{ marginTop: "20px", marginRight: "45px", fontSize: "12px" }}>By creating an account, you agree to Amazon&lsquo;s <Text variant="link" component="a" href="/" style={{}}>Conditions</Text> of Use and <Text variant="link" component="a" href="/">Privacy Notice</Text>.</p>
        <Divider my="xl" />
        <p style={{ marginTop: "20px", marginRight: "45px", fontSize: "12px" }}>Already have an account? <Text variant="link" component="a" href="/signin">Sign-In</Text></p>
      </Box>
    </AuthLayout>
  )
}

export default Register