import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	
	const authContext = useContext(AuthContext);
	const { register, error, clearErrors, isAuthenticated } = authContext;
	
	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/');
		}
		
		if(error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history])
	
	const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
	
	const { name, email, password, password2 } = user;
	
	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
	
	const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
				console.log('User registered')
			register({
				name,
				email,
				password
			});
    }
  };
	
	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-input">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" value={name} onChange={onChange} required />
				</div>
				<div className="form-input">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={onChange} required />
				</div>
				<div className="form-input">
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						name="password" 
						value={password} 
						onChange={onChange} 
						required 
						minLength='8' 
						autoComplete='off'
						pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'
						title='Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
					/>
				</div>
				<div className="form-input">
					<label htmlFor="password2">Confirm Password</label>
					<input 
						type="password" 
						name="password2" 
						value={password2} 
						onChange={onChange} 
						required 
						minLength='8' 
						autoComplete='off'
					/>
				</div>
				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Register;
