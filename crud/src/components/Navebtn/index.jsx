import { NavLink } from 'react-router-dom';
import './index.css';

const NavButton= ({children,...props}) => {
  return (
    <NavLink 
      {...props}    className={({ isActive }) => (isActive ? "active_link" : "")}
        >
      {children}
    </NavLink>
  );
}

export default NavButton