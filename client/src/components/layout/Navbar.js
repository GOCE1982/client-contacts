import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({title, icon}) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	
	const { isAuthenticated, logout, user } = authContext;
	const { clearContacts } = contactContext;
	
	const onLogout = () => {
		logout();
		clearContacts();
	}
	
	const authLinks = (
		<Fragment>
			<li>Hello {' '}<span className="text-dark">{user && user.name}</span></li>
			<li>
				<button onClick={onLogout} type="button" className="btn-sm btn-primary" >
					<i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
				</button>
			</li>
		</Fragment>
	)
	
	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/about">About</Link>
			</li>
		</Fragment>
	)
	
	return(
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} />{" "}{title}
			</h1>
			<nav>
				<ul className="lead my-1">
					{isAuthenticated ? authLinks : guestLinks}
				</ul>
			</nav>
		</div>
	)
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
}

Navbar.defaultProps = {
	title: 'Client Contacts',
	icon: 'fas fa-address-card'
}

export default Navbar;