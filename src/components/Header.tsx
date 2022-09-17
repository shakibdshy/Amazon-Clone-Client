import {
    createStyles,
    Menu,
    Header,
    Container,
    Group,
    Button,
    Burger,
    Autocomplete,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconSearch } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';
import AmazonLogo from '../Assets/amazon-logo.png';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hook'
import { logout, selectedUser } from '../redux/authSlice';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        // [theme.fn.largerThan('sm')]: {
        //     display: 'none',
        // },

    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
        width: '100%'
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,
    },
}));

export const HeaderComponent = () => {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useAppDispatch();

    const { user, jwt } = useAppSelector(selectedUser);

    console.log(useAppSelector(selectedUser));

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    <Image src={AmazonLogo} alt="Logo" width={115} height={50} />
                </Group>
                <Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        icon={<IconSearch size={16} stroke={1.5} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                    />
                </Group>
                <Group spacing={5} className={classes.links}>
                    <Menu trigger="hover" openDelay={100} closeDelay={400} width={200} shadow="md">
                        <Menu.Target>
                            {
                                user && jwt
                                    ?
                                    <Button>{user.name}</Button>
                                    :
                                    <Link href='/signin'><Button component="a">Sign in</Button></Link>
                            }
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item component="a" href="/">
                                Mantine website
                            </Menu.Item>

                            <Menu.Item
                                icon={<IconExternalLink size={14} />}
                                component="a"
                                href="/"
                                target="_blank"
                            >
                                External link
                            </Menu.Item>

                            <Menu.Item
                                onClick={logoutHandler}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>                
            </Container>
        </Header>
    );
}
