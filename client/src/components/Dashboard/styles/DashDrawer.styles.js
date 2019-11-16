import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;
const shortWidth = 85;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.drawer,
    [theme.breakpoints.down('sm')]: {
      width: shortWidth,
    },
  },
  list: {
    backgroundColor: theme.palette.background.drawer,
    overflowX: 'hidden',
  },
  cancelIcon: {
    color: '#c4c4c4',
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
  sidebarText: {
    color: '#c4c4c4',
  },
  sidebarIcon: {
    color: '#c4c4c4',
    marginLeft: theme.spacing(2),
  },
  sublistItem: {
    marginLeft: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}));

export default useStyles;
