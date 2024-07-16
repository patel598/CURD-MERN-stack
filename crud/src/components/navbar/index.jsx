import React from 'react';
import swal from 'sweetalert'
import NavButton from '../Navebtn';
import { useAuth } from '../../Utils/contextAPI';
import { NavLink, useNavigate } from 'react-router-dom';

import './index.css';
import ToastMessage from '../../Utils/Toaster';

import { logoImage } from '../../Utils/animaton';


const Navbar = () => {
    const { setIsAuth, user } = useAuth()
    const navigate = useNavigate()


    const handleLogout = () => {
        swal({
            title: 'Are you sure you want to logout?',
            text: 'Once logged out, you will need to login!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                localStorage.clear();
                navigate('/login')
                setIsAuth(false)
                ToastMessage("success", `You've successfully logged out.`);
            }
        });
    }
    return (
        <header>
            {/* <img src={logo} alt="" /> */}
            <nav>
                <NavLink to="product" className="logo">
                    codiatic
                    {/* <div style={logoImage}>codiatic</div> */}
                </NavLink>

                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                <label htmlFor="nav-toggle" className="nav-toggle-label">
                    <span></span>
                </label>
                <ul>
                    <li><NavButton to="product">Product</NavButton></li>
                    {
                        user?.type !== "user" &&
                        <li><NavButton to="create-product">Create Product</NavButton></li>
                    }
                    {
                        user?.type !== "user" &&
                        <li><NavButton to="user-list">Users</NavButton></li>
                    }
                    <li><NavLink to="" onClick={handleLogout}>Logout</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar