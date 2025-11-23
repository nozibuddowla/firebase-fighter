import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-purple-500 font-bold" : `${className} font-semibold`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
