import React from 'react';
import { connect } from 'react-redux';
import SecuredRoute from '../Auth/SecuredRoute';
import useStyles from './styles/Dash.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import logo from '../../assets/logo.png';

const Dash = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position={'fixed'} className={classes.appBar} color={'secondary'}>
        <Toolbar>
          <img alt={'logo'} src={logo} className={classes.logo} />
          <Typography className={classes.title}>Feedr</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(SecuredRoute(Dash));
