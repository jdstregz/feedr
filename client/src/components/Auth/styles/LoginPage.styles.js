import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loginPane: {
    marginTop: '15vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '15vh',
    width: 400,
    borderRadius: 25,
    boxShadow: '0px 0px 15px 0px',
  },
  loginHeader: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: '#f73392',
  },
  logo: {
    height: 100,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  loginField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  textFieldContainer: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },
  formHelperText: {
    marginBottom: 0,
    marginTop: -1 * theme.spacing(1),
    color: '#f50c00',
  },
  loginButton: {
    backgroundColor: '#f50c00',
    fontWeight: '600',
  },
  buttonContainer: {
    marginLeft: theme.spacing(16),
    marginRight: theme.spacing(16),
    marginBottom: theme.spacing(2),
  },
  signupLoginText: {
    color: '#3B5998',
    '&:hover': {
      color: '#000000',
    },
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  successText: {
    color: '#10f500',
  },
  errorText: {
    color: '#f50c00',
  },
}));

export default useStyles;
