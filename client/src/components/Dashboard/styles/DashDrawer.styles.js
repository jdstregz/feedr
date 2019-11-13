import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.background.drawer,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.drawer,
  },
  list: {
    backgroundColor: theme.palette.background.drawer,
    overflowX: 'hidden',
  },
  tooltipText: {
    fontSize: 18,
    fontWeight: 300,
  },
  noShow: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
}));

export default useStyles;
