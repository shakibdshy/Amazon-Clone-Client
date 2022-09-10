import { Button, Container, Grid } from '@mantine/core';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux/hook'
import { logout, selectedUser } from '../redux/authSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { user, jwt } = useAppSelector(selectedUser);

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <Container>
      <Grid justify="space-between">
        <Grid.Col span={4}>
          <h1>Home Page</h1>
        </Grid.Col>
        <Grid.Col span={4}>
          {
            user && jwt
              ?
              <Button onClick={logoutHandler}>{user.name}</Button>
              :
              <Button onClick={logoutHandler}>Logout</Button>
          }
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default HomePage