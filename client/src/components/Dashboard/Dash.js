import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SecuredRoute from '../Auth/SecuredRoute';
import useStyles from './styles/Dash.styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { destroySession } from '../../actions/authActions';
import logo from '../../assets/logo.png';
import DashDrawer from './DashDrawer';
import DashRoutes from './DashRoutes';
import { Link } from 'react-router-dom';

const Dash = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { destroySession, history } = props;
  const isMenuOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    destroySession(history);
  };

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to={'/settings'} onClick={handleMenuClose}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position={'fixed'} className={classes.appBar} color={'secondary'}>
        <Toolbar>
          {mobile ? (
            <IconButton
              color={'inherit'}
              className={classes.menuButton}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <img alt={'logo'} src={logo} className={classes.logo} />
          <Typography className={classes.title}>Feedr</Typography>
          <IconButton style={{ color: '#fff' }} onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {profileMenu}
      <DashDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <DashRoutes />
      </main>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { destroySession })(withRouter(SecuredRoute(Dash)));
