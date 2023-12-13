'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import myImage from '@/assets/my-image.jpg'
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Google from 'next-auth/providers/google';
import Swal from 'sweetalert2';

const drawerWidth = 240;
const navItems = [
    {
        "id": 1,
        "item": "Home",
        "link": "/"
    },
    {
        "id": 2,
        "item": "About",
        "link": "/about"
    },
    {
        "id": 3,
        "item": "Contact",
        "link": "/contact"
    },
    {
        "id": 4,
        "item": "GitHub",
        "link": "https://github.com/Asif3359"
    }
];

const NavBar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    // console.log(session.data);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const singInWithGoogle = async () => {
        try {
            const response = await signIn('google');
            const session = await  useSession();

            if (session.status === "authenticated") {
                const user = session.data.user;

                // Create an object with the user information you want to store in MongoDB
                const userData = {
                    name: user.name,
                    email: user.email,
                    // Add other user properties as needed
                };

                // Send a POST request to your MongoDB API or server
                const mongoResponse = await fetch('https://asif-server-site.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (mongoResponse.ok) {
                    console.log('User data sent to MongoDB:', userData);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Message has been send",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Handle success (e.g., show a success message)
                } else {
                    console.error('Failed to send user data to MongoDB');
                    // Handle error (e.g., show an error message)
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "something error ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                // You can also perform additional actions after sign-in if needed
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography className="flex justify-center" variant="h6" sx={{ my: 2 }}>
                <Image src={myImage} alt='my image' width={40} height={40} className='rounded-full' ></Image>
            </Typography>
            <Divider />
            <List  >
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link href={item.link} key={item.id} sx={{ color: '#fff' }} className='hover:underline ' >
                                {item.item}
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
                {
                    session.status === "authenticated" ?
                        <>
                            <button className='hover:underline flex justify-start items-start pl-4 w-full py-2 hover:bg-gray-200 ' onClick={() => signOut('google')}>Sing out</button>
                        </>
                        :
                        <>
                            <button className='hover:underline flex justify-start items-start pl-4 w-full py-2 hover:bg-gray-200 ' onClick={singInWithGoogle}>Sing In</button>
                        </>
                }
                {/* <button className='hover:underline flex justify-start items-start pl-4 w-full py-2 hover:bg-gray-200 ' onClick={singInWithGoogle}>Sing In</button> */}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



    return (
        <Box >
            <Box sx={{ display: 'flex' }}  >
                <CssBaseline />
                <AppBar component="nav" sx={{ backgroundColor: "black" }}>
                    <Toolbar className='flex justify-between items-center container mx-auto' >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <IconButton aria-label="delete">
                                <Image src={myImage} alt='my image' width={40} height={40} className='rounded-full' ></Image>
                            </IconButton>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'flex', gap: 20 } }}>
                            {navItems.map((item) => (
                                <Link href={item.link} key={item.id} sx={{ color: '#fff' }} className='hover:underline ' >
                                    {item.item}
                                </Link>
                            ))}
                            {
                                session.status === "authenticated" ?
                                    <>
                                        <button className='hover:underline ' onClick={() => signOut('google')}>Sing Out</button>
                                    </>
                                    :
                                    <>
                                        <button className='hover:underline ' onClick={singInWithGoogle}>Sing In</button>
                                    </>
                            }

                        </Box>
                        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                            <IconButton aria-label="delete">
                                <Image src={myImage} alt='my image' width={40} height={40} className='rounded-full' ></Image>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <nav  >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}

                    >
                        {drawer}
                    </Drawer>
                </nav>

            </Box>
        </Box>
    );
}

NavBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default NavBar;
