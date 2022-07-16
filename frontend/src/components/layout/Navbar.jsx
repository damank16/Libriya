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
import CartContext from '../../pages/context/CartContext'
import { useContext } from 'react'
import { Badge } from '@mui/material'
import { AuthContext } from '../../context'

const userSettings = ['Profile', 'Dashboard', 'Logout']
const adminSettings = ['Dashboard', 'Logout']

const adminLinks = [
  { linkDisplay: 'Add Book', link: '/admin/book/add', key: 'Add Book' },
  {
    linkDisplay: 'View Print Requests',
    link: '/admin/printRequest',
    key: 'View Print Requests',
  },
]

const userLinks = [
  {
    linkDisplay: 'Study Room Bookings',
    link: '/studyroombookings',
    key: 'Study Room Bookings',
  },
  { linkDisplay: 'Fines', link: '/fines', key: 'Fines' },
  {
    linkDisplay: 'Create Print Request',
    link: '/printrequest/create',
    key: 'Create Print Request',
  },
  {
    linkDisplay: 'View Pending Prints',
    link: '/printrequest/view',
    key: 'View Pending Prints',
  },
  { linkDisplay: 'Check-in items', link: '/Checkin', key: 'Check-in items' },
]

const ResponsiveAppBar = () => {
  const { isLogin, setLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const { item } = useContext(CartContext)
  console.log(item)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault()

    navigate('/Cart')
  }

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case 'Profile':
        navigate('/profile')
        break
      case 'Dashboard':
        if (isAdmin()) {
          return navigate('/admin/dashboard')
        }
        navigate('/dashboard')
        break
      case 'Logout':
        setLogin(false)
        localStorage.removeItem('USER_ID')
        localStorage.removeItem('LIBRIYA_TOKEN')
        localStorage.removeItem('LIBRIYA_USER')
        navigate('/login')
        break
      default:
        break
    }
    setAnchorElUser(null)
  }

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('LIBRIYA_USER'))
    return user.admin
  }

  const renderLinksOnSmallScreens = () => {
    const linksSource = isAdmin() ? adminLinks : userLinks

    return linksSource.map(({ link, linkDisplay, key }) => (
      <MenuItem
        component={Link}
        to={link}
        key={key}
        onClick={handleCloseNavMenu}
      >
        <Typography textAlign='center'>{linkDisplay}</Typography>
      </MenuItem>
    ))
  }

  const renderLinks = () => {
    const linksSource = isAdmin() ? adminLinks : userLinks
    return linksSource.map(({ link, linkDisplay, key }) => (
      <Button
        component={Link}
        to={link}
        key={key}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {linkDisplay}
      </Button>
    ))
  }

  const renderSettings = () => {
    const settings = isAdmin() ? adminSettings : userSettings
    return settings.map((setting) => (
      <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
        <Typography textAlign='center'>{setting}</Typography>
      </MenuItem>
    ))
  }

  return (
    <AppBar color='primary' position='static'>
      <Box px={2}>
        <Toolbar disableGutters>
          <MenuBook sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/dashboard'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Libriya
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderLinksOnSmallScreens()}
            </Menu>
          </Box>
          <MenuBook sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component={Link}
            to='/dashboard'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Libriya
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {renderLinks()}
          </Box>
          {!isAdmin() && (
            <Box mx={3}>
              <Badge badgeContent={item.length} color='primary'>
                <ShoppingCartIcon onClick={handleSubmit} />
              </Badge>
            </Box>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {renderSettings()}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}
export default ResponsiveAppBar
