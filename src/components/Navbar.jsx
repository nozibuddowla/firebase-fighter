import React, { useContext } from "react";
import logo from "../assets/firebase-logo.png";
import { Link } from "react-router";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const Navbar = () => {
  const { logOut, user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signout successful");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-slate-100f py-2 border-b border-b-slate-300 ">
      <MyContainer className="flex items-center justify-between">
        <figure>
          <img src={logo} className="w-[55px]" />
        </figure>
        <ul className="flex items-center gap-2">
          <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
          <li>
            <MyLink to={"/about-us"}>About US</MyLink>
          </li>
          {user && (
            <li>
              <MyLink to={"/profile"}>Profile</MyLink>
            </li>
          )}
        </ul>

        <div>
          {loading ? (
            <ClockLoader size={40} color="#e74c3c" />
          ) : user ? (
            <div className="text-center space-y-3">
              {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
              {/* For TSX uncomment the commented types below */}
              <button
                className=" cursor-pointer"
                popoverTarget="popover-1"
                style={
                  { anchorName: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                <img
                  src={user?.photoURL || "https//via.placeholder.com/88"}
                  className="h-10 w-10 rounded-full mx-auto object-cover"
                  alt=""
                />
              </button>

              <div
                className="dropdown dropdown-center menu menu-compact rounded-box bg-base-100 shadow-sm space-y-2"
                popover="auto"
                id="popover-1"
                style={
                  { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                <h2 className="text-lg font-semibold"> {user?.displayName} </h2>
                <p className="text-md"> {user?.email} </p>
                <button onClick={handleSignOut} className="my-btn">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
              <Link to={"/signin"}>Sign in</Link>
            </button>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
