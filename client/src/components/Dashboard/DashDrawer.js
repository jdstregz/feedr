import React from 'react';
import { Drawer, useMediaQuery, useTheme } from '@material-ui/core';
import useStyles from './styles/DashDrawer.styles';
const DashDrawer = props => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Drawer
      variant={mobile ? 'temporary' : 'persistent'}
      onClose={() => setDrawerOpen(false)}
      open={!mobile || drawerOpen}
      className={classes.drawer}
    >
      <div className={classes.toolbar} />
    </Drawer>
  );
};

export default DashDrawer;
