import { Container, Grid, Stack, useMantineColorScheme } from '@mantine/core'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import logo from '../../Assets/amazon-logo.png'
import darkLogo from '../../Assets/Amazon_logo.svg'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    return (
        <Container>
            <Stack justify="center" align="center" style={{ marginTop: "40px"}}>
                {
                    dark ? <Image src={logo} alt="amazon-logo" width={100} height={40} /> : <Image src={darkLogo} alt="amazon-logo" width={100} height={40} />
                }
                
                <main>{children}</main>
            </Stack>
        </Container>
    )
}

export default AuthLayout