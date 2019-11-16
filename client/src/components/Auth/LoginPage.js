import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import useStyles from './styles/LoginPage.styles';
import { startSession, signupRequest } from '../../actions/authActions';
import { Paper, Grid, Typography, TextField, Button, FormHelperText } from '@material-ui/core';
import logo from '../../assets/logo.png';

const LoginPage = props => {
  const classes = useStyles();
  const { auth, history, startSession, signupRequest } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [signup, setSignup] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [validations, setValidations] = useState({});

  const validateFields = () => {
    const tempValidations = {};
    if (!username) {
      tempValidations.username = 'Missing username';
    }
    if (!password) {
      tempValidations.password = 'Missing password';
    }
    if (signup) {
      if (confirmPassword !== password) {
        tempValidations.confirmPassword = 'Passwords do not match';
      }
      if (!email) {
        tempValidations.email = 'No email';
      }
      if (!name) {
        tempValidations.name = 'No name';
      }
      // TODO: PUT IN AN EMAIL VALIDATOR
    }
    setValidations(tempValidations);
    return Object.values(tempValidations).length === 0;
  };

  const signupAction = async () => {
    if (requestSent) {
      return;
    }
    setRequestSent(true);
    try {
      await signupRequest(email, username, password, name);
      setRequestSent(false);
    } catch (err) {
      setErrorText(err.message);
      setRequestSent(false);
    }
  };

  const login = async () => {
    if (requestSent) {
      return;
    }
    setRequestSent(true);
    try {
      await startSession(username, password);
      setRequestSent(false);
    } catch (err) {
      setErrorText(err.message);
      setRequestSent(false);
    }
  };

  const authAction = () => {
    if (validateFields()) {
      if (signup) {
        console.log(signup);
        signupAction();
      } else {
        login();
      }
    }
  };

  useEffect(() => {
    if (auth) {
      history.push('/');
    }
  });

  const headerTitle = () => {
    return <Typography variant={'h5'}>Dashr</Typography>;
  };

  const signupLoginText = () => {
    if (signup) {
      return 'Already have an account? Log in here.';
    } else {
      return "Don't have an account? Sign up here.";
    }
  };

  const switchForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    setName('');
    setSuccessText('');
    setErrorText('');
    setSignup(!signup);
    setValidations({});
  };

  return (
    <div>
      <Paper className={classes.loginPane}>
        <Grid container spacing={2} justify={'center'} alignContent={'center'}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img alt={'Logo'} src={logo} className={classes.logo} />
            {headerTitle()}
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textFieldContainer}>
              <TextField
                className={classes.loginField}
                fullWidth
                autoComplete={'off'}
                name="username"
                error={validations.username != null}
                variant={'outlined'}
                label={'Username'}
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <FormHelperText error color="red" className={classes.formHelperText}>
                {validations.username}
              </FormHelperText>
              {signup ? (
                <TextField
                  className={classes.loginField}
                  fullWidth
                  autoComplete={'off'}
                  name="Full Name"
                  variant={'outlined'}
                  label={'Full Name'}
                  error={validations.name != null}
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              ) : null}
              {signup ? (
                <FormHelperText error color="red" className={classes.formHelperText}>
                  {validations.name}
                </FormHelperText>
              ) : null}
              {signup ? (
                <TextField
                  className={classes.loginField}
                  fullWidth
                  autoComplete={'off'}
                  name="Email"
                  variant={'outlined'}
                  label={'Email'}
                  error={validations.email != null}
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              ) : null}
              {signup ? (
                <FormHelperText error color="red" className={classes.formHelperText}>
                  {validations.email}
                </FormHelperText>
              ) : null}
              <TextField
                className={classes.loginField}
                fullWidth
                name={'password'}
                variant={'outlined'}
                autoComplete={'off'}
                label={'Password'}
                value={password}
                error={validations.password != null}
                onChange={event => setPassword(event.target.value)}
                type={'password'}
              />
              <FormHelperText error color="red" className={classes.formHelperText}>
                {validations.password}
              </FormHelperText>
              {signup ? (
                <TextField
                  className={classes.loginField}
                  fullWidth
                  autoComplete={'off'}
                  name="Confirm Password"
                  variant={'outlined'}
                  error={validations.confirmPassword != null}
                  value={confirmPassword}
                  label={'ConfirmPassword'}
                  onChange={event => setConfirmPassword(event.target.value)}
                />
              ) : null}
              {signup ? (
                <FormHelperText error color="red" className={classes.formHelperText}>
                  {validations.confirmPassword}
                </FormHelperText>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.successText}>{successText}</Typography>
            <Typography className={classes.errorText}>{errorText}</Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttonContainer}>
              <Button
                onClick={() => authAction()}
                fullWidth
                variant={'contained'}
                color={'inherit'}
                className={classes.loginButton}
              >
                Login
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.signupLoginText} onClick={() => switchForm()}>
              {signupLoginText()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

LoginPage.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({})]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  startSession: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { startSession, signupRequest })(withRouter(LoginPage));
