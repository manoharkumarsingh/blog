import React, { Component } from "react";
import { connect } from "react-redux";
import { ADD_BLOG, UPDATE_BLOG } from "../store/actionTypes";
import { blogModule } from "../api/api";
import { alertmesage } from "../store/alertmessage";
import { Link } from "react-router-dom";
var FormData = require("form-data");

class Addblog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      content: "",
      blogImage: "../assets/image/dummy.jpg"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleUpdateBlog = this.handleUpdateBlog.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.alertMessage = "";
    this.previewImage = "../assets/image/product.png";
  }
  handleChange(event) {
    this.setState({
      title: this.refs.title.value,
      content: this.refs.body.value
    });
  }

  handleChangeImage(event) {
    this.previewImage = URL.createObjectURL(event.target.files[0]);
    this.setState({ blogImage: event.target.files[0] });
  }

  async componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        _id: this.props.location.state
          ? this.props.location.state.blog[0]["_id"]
          : "",
        title: this.props.location.state.blog[0]["title"]
          ? this.props.location.state.blog[0]["title"]
          : "",
        content: this.props.location.state.blog[0]["content"]
          ? this.props.location.state.blog[0]["content"]
          : ""
      });
      this.previewImage = this.props.location.state.blog[0]["path"]
        ? "../files/" + this.props.location.state.blog[0]["path"].substr(13)
        : "../assets/image/product.png";
    }
  }

  async handleDeleteBlog(blogid) {
    await blogModule.deleteBlog(blogid);
    await this.props.allBlog();
  }

  async handleUpdateBlog(event) {
    event.preventDefault();
    var form = new FormData();
    form.append("_id", this.state._id);
    form.append("title", this.state.title);
    form.append("content", this.state.content);
    form.append("blogImage", this.state.blogImage);
    await this.props.updateblog(form, this.state._id);
    if (this.props.addedblog.status === 200) {
      alertmesage.createNotification(
        this.props.addedblog.status,
        this.props.addedblog.statusText
      );
      this.setState({
        title: "",
        content: ""
      });
      this.props.history.push("/");
    } else {
      alertmesage.createNotification(
        this.props.addedblog.status,
        this.props.addedblog.statusText
      );
    }
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    var form = new FormData();
    form.append("_id", this.state._id);
    form.append("title", this.state.title);
    form.append("content", this.state.content);
    form.append("blogImage", this.state.blogImage);
    await this.props.addblog(form);
    if (this.props.addedblog.status === 200) {
      alertmesage.createNotification(
        this.props.addedblog.status,
        this.props.addedblog.statusText
      );
      this.setState({
        title: "",
        content: ""
      });
      this.props.history.push("/");
    } else {
      alertmesage.createNotification(
        this.props.addedblog.status,
        this.props.addedblog.statusText
      );
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: "",
      content: "",
      _id: ""
    });
  }
  render() {
    return (
      <div className="row" style={{ marginTop: 60 }}>
        <div className="col-md-3" />
        <div className="col-md-6 w3-card-4">
          <h3 className="w3-container w3-center">
            <b> {this.state._id !== "" ? "Update Blog" : "Add Blog"}</b>
          </h3>
          <form onSubmit={this.handleUpdateBlog}>
            <div className="w3-center">
              <img
                src={this.previewImage}
                className="img-circle blogImage"
                alt="blog"
              />
              <br />
              <br />
              <div
                className="form-group w3-center"
                style={{ marginLeft: 33 + "%" }}
              >
                <input
                  type="file"
                  onChange={this.handleChangeImage}
                  ref="img"
                  className="custom-file-input w3-teal"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control w3-round-xxlarge"
                value={this.state.title}
                onChange={this.handleChange}
                ref="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                type="text"
                className="form-control w3-round-xxlarge"
                rows="5"
                value={this.state.content}
                onChange={this.handleChange}
                ref="body"
              />
            </div>

            <div className="pull-right" style={{ marginBottom: 20 }}>
              <div className="w3-bar">
                {this.state._id !== "" ? (
                  <div>
                    <button
                      onClick={this.handleUpdateBlog}
                      className="w3-bar-item w3-button w3-blue w3-circle"
                    >
                      <b>Update</b>
                    </button>
                    <Link
                      className="w3-bar-item w3-button w3-teal w3-circle"
                      to={{
                        pathname: `/blogdeatils/${this.state._id}`,
                        state: { blog: this.state._id }
                      }}
                    >
                      <b>READ MORE »</b>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={this.handleSubmitForm}
                    className="w3-bar-item w3-button w3-blue w3-circle"
                  >
                    <b>Submit</b>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addedblog: state.Blog.addedBlogs,
    selectedblog: state.Blog.selectedBlogs
  };
}
const mapDispatchToProps = dispatch => ({
  addblog: async blogdetails =>
    dispatch({
      type: ADD_BLOG,
      payload: await blogModule.addBlog(blogdetails)
    }),

  updateblog: async (blogdetails, blogid) =>
    dispatch({
      type: UPDATE_BLOG,
      payload: await blogModule.updateBlog(blogdetails, blogid)
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addblog);
