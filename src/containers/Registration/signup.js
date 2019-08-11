import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ADD_USER } from "../../store/actionTypes";
import { userModule } from "../../api/api";
import { alertmesage } from "../../store/alertmessage";
var FormData = require("form-data");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mono: "",
      password: "",
      address: "",
      userImage: "",
      about: "",
      error: {
        name: "",
        email: "",
        mono: "",
        password: "",
        address: ""
      }
    };
    this.previewImage = "../../assets/image/product.png";
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      name: this.refs.name.value,
      email: this.refs.email.value,
      mono: this.refs.mono.value,
      password: this.refs.password.value,
      address: this.refs.address.value,
      about: this.refs.about.value
    });
  }
  async handleSignUp(event) {
    event.preventDefault();
    if (!this.state.name) {
      this.setState({
        error: {
          name: "Name is required !"
        }
      });
    } else if (!this.state.email) {
      this.setState({
        error: {
          email: "Email is required !"
        }
      });
    } else if (!this.state.mono) {
      this.setState({
        error: {
          mono: "Mobile No is required !"
        }
      });
    } else if (!this.state.password) {
      this.setState({
        error: {
          password: "Password is required !"
        }
      });
    } else if (!this.state.address) {
      this.setState({
        error: {
          address: "Address is required !"
        }
      });
    }
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.mono &&
      this.state.address
    ) {
      var formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      formData.append("mono", this.state.mono);
      formData.append("address", this.state.address);
      formData.append("userImage", this.state.userImage);
      formData.append("about", this.state.about);
      await this.props.adduser(formData);
      if (this.props.addedUser.status === 200) {
        alertmesage.createNotification(
          this.props.addedUser.status,
          this.props.addedUser.statusText
        );

        this.props.history.push("/signin");
      } else {
        alertmesage.createNotification(
          this.props.addedUser.status,
          this.props.addedUser.statusText
        );
      }
    }
  }
  handleChangeImage(event) {
    this.previewImage = URL.createObjectURL(event.target.files[0]);
    this.setState({
      userImage: event.target.files[0]
    });
  }
  render() {
    return (
      <div className="row" style={{ marginTop: 60 }}>
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="w3-card-4">
            <div className="w3-container" style={{ paddingBottom: 20 }}>
              <form onSubmit={this.handleSignUp}>
                <div className="form-group w3-center">
                  <img
                    src={this.previewImage}
                    className="img-circle blogImage"
                    alt="blog"
                  />
                  <br />
                  <br />
                  <input
                    type="file"
                    onChange={this.handleChangeImage}
                    ref="img"
                    className="custom-file-input w3-teal"
                    style={{ marginLeft: 25 + "%" }}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control w3-round-xxlarge"
                        placeholder="Name *"
                        ref="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.error.name}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control w3-round-xxlarge"
                        placeholder="Email *"
                        value={this.state.email}
                        ref="email"
                        onChange={this.handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.error.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mno">Mobile No</label>
                      <input
                        type="text"
                        className="form-control w3-round-xxlarge"
                        placeholder="Mobile No *"
                        maxLength={10}
                        minLength={10}
                        value={this.state.mono}
                        ref="mono"
                        onChange={this.handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.error.mono}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control w3-round-xxlarge"
                        placeholder="Password *"
                        value={this.state.password}
                        ref="password"
                        onChange={this.handleChange}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.error.password}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Address</label>
                  <textarea
                    className="form-control w3-round-xxlarge"
                    placeholder="Address"
                    value={this.state.address}
                    ref="address"
                    onChange={this.handleChange}
                  />
                  <span style={{ color: "red" }}>
                    {this.state.error.address}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">About</label>
                  <textarea
                    className="form-control w3-round-xxlarge"
                    placeholder="About Yourself"
                    value={this.state.about}
                    ref="about"
                    rows="10"
                    onChange={this.handleChange}
                  />
                </div>

                <button
                  className="w3-button w3-indigo pull-right w3-circle"
                  onClick={this.handleSignUp}
                >
                  Sign Up
                </button>
              </form>
              <div>
                I have an account?
                <NavLink
                  to={"/signin"}
                  className="w3-button w3-black w3-tiny w3-circle"
                >
                  &nbsp;Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addedUser: state.User.addedUser
  };
}
const mapDispatchToProps = dispatch => ({
  adduser: async userdetails =>
    dispatch({
      type: ADD_USER,
      payload: await userModule.addUser(userdetails)
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
