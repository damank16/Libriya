/*

Authors:

- Sai Chand Kolloju

*/

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuBook from '@mui/icons-material/MenuBook'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CartContext from '../../pages/context/CartContext';
import { useContext } from 'react';
import { Badge } from '@mui/material'
import { AuthContext } from "../../context"
const pages = ['Products', 'Fines', 'Study Room Booking']
const settings = ['Profile', 'Dashboard', 'Logout']

const ResponsiveAppBar = () => {
  const { isLogin, setLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const {item} = useContext(CartContext);
  console.log(item);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    navigate("/Cart");
  };

  const handleCheckin = (event) =>
   {
    event.preventDefault();

      navigate('/Checkin');

   };

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Logout":
        setLogin(false);
        localStorage.removeItem("USER_ID");
        localStorage.removeItem("LIBRIYA_TOKEN");
        localStorage.removeItem("USER_ID");
        navigate("/login");
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuBook sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Libriya
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                component={Link}
                to={`/studyroombookings`}
                key={"studyroombookings"}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Study Room Bookings</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to={`/fines`}
                key={"fines"}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Fines</Typography>
              </MenuItem>

              <MenuItem
                component={Link}
                to={`/printrequest/create`}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Create Print Request</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to={`/printrequest/view`}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">View Pending Prints</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <MenuBook sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Libriya
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to={`/fines`}
              key={"fines"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Fines
            </Button>

            <Button
               
               onClick={handleCheckin}
               sx={{ my: 2, color: 'white', display: 'block' }}
             >
               Check-in items
          </Button>

            <Button
              component={Link}
              to={`/studyroombookings`}
              key={"studyroombookings"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Study Room Bookings
            </Button>

            <Button
              component={Link}
              to={`/printrequest/create`}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Print Request
            </Button>
            <Button
              component={Link}
              to={`/printrequest/view`}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              View Pending Prints
            </Button>
          </Box>
          <Box sx={{flexGrow: 0.2}}>
            <Badge badgeContent={item.length} color="primary">
              <ShoppingCartIcon onClick={handleSubmit} />
            </Badge>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
