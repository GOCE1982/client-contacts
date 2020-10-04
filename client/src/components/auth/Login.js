import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	
	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;
	
	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}
		
		if(error === 'Invalid Credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [isAuthenticated, error, props.history])
	
	const [user, setUser] = useState({
    email: '',
    password: '',
  });
	
	const { email, password } = user;
	
	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
	
	const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

	
	return (
		<div className="form-container">
			<h1>
				User <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-input">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={onChange} required />
				</div>
				<div className="form-input">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={onChange} required minLength='6' />
				</div>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Login;