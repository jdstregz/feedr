import React from 'react';
import {
  Drawer,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles/DashDrawer.styles';
import routes from '../Routes/routes';

const routeArray = Object.values(routes());

const DashDrawer = props => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = React.useState(-1);
  const [selectedSubrouteIndex, setSelectedSubrouteIndex] = React.useState(-1);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Drawer
      variant={mobile ? 'temporary' : 'persistent'}
      onClose={() => setDrawerOpen(false)}
      open={!mobile || drawerOpen}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List className={classes.list}>
        {routeArray.map((route, index) => (
          <div key={route.text}>
            <Tooltip
              title={route.text}
              placement={'right'}
              classes={{ tooltip: classes.tooltipText, popper: classes.noShow }}
            >
              <ListItem
                button
                selected={selectedRouteIndex === index}
                component={Link}
                to={route.link}
                onClick={() => console.log('I clicked this')}
              >
                <ListItemText className={classes.sidebarText} primary={route.text} />
              </ListItem>
            </Tooltip>
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default DashDrawer;
