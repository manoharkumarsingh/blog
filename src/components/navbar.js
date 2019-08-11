import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import localStorage from "../storage/localStorage";

class Navbar extends Component {
  render() {
    const user = JSON.parse(localStorage.getlocalStorage("user"));
    if (user) {
      var Uname = user ? user.data[0]["name"] : "";
      var Uemail = user ? user.data[0]["email"] : "";
      var path = user ? user.data[0]["path"] : "";
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to={"/"}>
              Mks Blog
            </NavLink>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <NavLink exact activeClassName="select" to={"/"}>
                Blogs
              </NavLink>
            </li>
            <li>
              {Uname ? (
                <NavLink activeClassName="select" to={"/addblog"}>
                  Add Blog
                </NavLink>
              ) : (
                ""
              )}
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <NavLink
                to={"/signin"}
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {Uname ? (
                  <span>
                    {path ? (
                      <img
                        src={"../../users/" + path.substr(13)}
                        alt="Avatar"
                        className="img"
                        style={{ maxHeight: 32, maxWidth: 32 }}
                      />
                    ) : (
                      ""
                    )}
                    <span> {Uname}</span>
                  </span>
                ) : (
                  "My Account"
                )}
                <span className="caret" />
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to={"/signin"}>
                    <span className="glyphicon glyphicon-log-in" />
                    {Uname ? " Logout " : " Login "}
                  </NavLink>
                </li>
                {Uname ? (
                  ""
                ) : (
                  <li>
                    <NavLink to={"/signup"}>
                      <span className="glyphicon glyphicon-user"> </span> Sign
                      Up
                    </NavLink>
                  </li>
                )}

                <li role="separator" className="divider" />
                <li>
                  <NavLink to={"/signin"}>Your Account</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
