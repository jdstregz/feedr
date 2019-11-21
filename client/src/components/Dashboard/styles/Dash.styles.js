import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flex: 1,
  },
  logo: {
    height: 50,
    marginRight: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    color: theme.palette.primary,
  },
  underline: {
    borderColor: '#919191',
  },
  toolbar: theme.mixins.toolbar,
}));

export default useStyles;
