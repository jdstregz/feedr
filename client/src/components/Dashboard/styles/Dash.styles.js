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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  baseCurrencySelector: {
    minWidth: 150,
    color: '#fff',
    borderColor: '#fff',
    padding: theme.spacing(1),
  },
  underline: {
    borderColor: '#919191',
  },
  baseCurrencyField: {
    marginLeft: theme.spacing(1),
    color: '#919191',
  },
  baseCurrencyLabel: {
    marginTop: theme.spacing(1),
    color: '#6b6b6b',
  },
  toolbar: theme.mixins.toolbar,
}));

export default useStyles;
