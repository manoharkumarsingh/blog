import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { userModule } from "../../api/api";
import { alertmesage } from "../../store/alertmessage";
import localStorage from "../../storage/localStorage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    localStorage.destroyLocalStorage("user");
  }
  handleChange() {
    this.setState({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  async handleLogin(event) {
    const loggedInUser = await userModule.userLogin(this.state);
    if (loggedInUser.status === 200) {
      alertmesage.createNotification(
        loggedInUser.status,
        loggedInUser.statusText
      );
      localStorage.savelocalStorage("user", JSON.stringify(loggedInUser));
      this.props.history.push("/blog");
    } else {
      alertmesage.createNotification(
        loggedInUser.status,
        loggedInUser.statusText
      );
    }
  }

  render() {
    return (
      <div className="row" style={{ marginTop: 60 }}>
        <div className="col-md-4" />
        <div className="col-md-4">
          <div className="w3-card-4">
            <div className="w3-container" style={{ paddingBottom: 20 }}>
              <div className="w3-center">
                <h3>Sign In</h3>
                <img
                  className="w3-circle"
                  src="../assets/image/dummy.jpg"
                  alt="Avatar"
                  style={{ width: "50%" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email : </label>
                <input
                  type="email"
                  className="form-control w3-round-xxlarge"
                  placeholder="Email *"
                  name="email"
                  ref="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password : </label>
                <input
                  type="password"
                  className="form-control w3-round-xxlarge"
                  placeholder="Password *"
                  name="password"
                  ref="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button
                  className="w3-button w3-indigo pull-right w3-circle"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </div>

              <div>
                Don't have an account?
                <NavLink
                  to={"/signup"}
                  className="w3-button w3-black w3-tiny w3-circle"
                >
                  &nbsp;Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginUser: state.User.loginUser
  };
}
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
