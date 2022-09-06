import { Box, Button, Center, Divider, Input, Loader, PaperProps, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { FormEvent, useEffect } from 'react'
import AuthLayout from '../components/Auth/AuthLayout'
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';
import { login, reset } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hook';
import { useRouter } from 'next/router';

const SignIn = (props: PaperProps) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      showNotification({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      showNotification({ message: 'Please provide a valid email', color: 'red' });
    }
  };

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      showNotification({ message: 'Login successful', color: 'green' });
      dispatch(reset());
      router.push('/');
    }
  }, [isSuccess, dispatch, router]);

  const handleSubmit = (event: typeof form.values) => {
    const DisplayUser = event;

    dispatch(login(DisplayUser))

    form.reset()
    console.log(event);
  }

  if (isLoading) { 
    return (
      <Center style={{ height: "100vh"}}>
        <Loader size="xl" />
      </Center>
    );
  }


  return (
    <AuthLayout>
      <Box style={{ width: '350px', maxWidth: "350px", border: '1px solid rgb(193, 194, 197)', borderRadius: '8px', padding: "14px 18px" }}>
        <Title order={3} size="h2" className=''>Sign in</Title>
        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
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
          <Button
            type='submit'
            variant="default"
            fullWidth={true}
            style={{
              marginTop: "20px",
              background: "#f0c14b",
              borderColor: "#a88734 #9c7e31 #846a29",
              color: "#111"
            }}>
            Continue
          </Button>
        </form>

        <p style={{ marginTop: "20px", marginRight: "45px", fontSize: "12px" }}>By continuing, you agree to Amazon&lsquo;s <Text variant="link" component="a" href="/" style={{}}>Conditions</Text> of Use and <Text variant="link" component="a" href="/">Privacy Notice</Text>.</p>
      </Box>
      <Divider style={{ marginTop: "20px" }} my="xs" label="New to Amazon?" labelPosition="center" />
      <Link href='register'>
        <a style= {{
          background: "linear-gradient(to bottom,#e7eaf0,#d9dce1)",
          borderRadius: "3px",
          border: "1px solid #adb1b8 #a2a6ac #8d9096",
          display: "block",
          verticalAlign: "middle",
          textAlign: "center",
          color: '#111',
          padding: "6px 18px",
        }}>Create your Amazon account</a>
      </Link>
    </AuthLayout>
  )
}

export default SignIn