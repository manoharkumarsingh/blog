import React, { Component } from "react";
import { connect } from "react-redux";
import { BLOG_SELECTED } from "../store/actionTypes";
import { blogModule } from "../api/api";
import { NavLink } from "react-router-dom";
import Comment from "./comment-modal";

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        content: ""
      }
    };
  }
  handleClick = () => {
    this.refs.commentModal.changeCommentId();
  };

  async componentWillMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state.blog);
      const blogid = this.props.location.state.blog;
      await this.props.selectedBlog(blogid);
    }
  }
  render() {
    if (this.props.blog[0]["_id"]) {
      return (
        <div style={{ marginTop: 52 }}>
          <div
            className="w3-card-4 w3-margin w3-white"
            key={this.props.blog[0]["_id"]}
          >
            {this.props.blog[0]["path"] ? (
              <img
                src={"../files/" + this.props.blog[0]["path"].substr(13)}
                alt="Avatar"
                className="img"
                style={{ maxHeight: 500 }}
              />
            ) : (
              <img
                src="../assets/image/woods.jpg"
                alt="Avatar"
                className="img"
              />
            )}
            <div className="pull-right">
              <div className="w3-bar">
                <NavLink className="w3-bar-item w3-button w3-blue" to={"/"}>
                  Home
                </NavLink>
                <NavLink
                  className="w3-bar-item w3-button w3-teal"
                  to={{
                    pathname: `/addblog/${this.props.blog[0]["_id"]}`,
                    state: { blog: this.props.blog }
                  }}
                >
                  Update
                </NavLink>
                <button
                  className="w3-bar-item w3-button w3-red"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={this.handleClick}
                >
                  Comment
                </button>
              </div>
            </div>

            <div className="w3-container">
              <p>{this.props.blog[0]["content"]}</p>
              <p className="pull-right">
                <span className="w3-opacity">
                  Created at : {this.props.blog[0]["createdAt"]}
                </span>
              </p>
              <h5>
                <b>- {this.props.blog[0]["title"]}</b>
              </h5>
            </div>
          </div>
          <Comment
            content={this.props.blog[0]["content"]}
            title={this.props.blog[0]["title"]}
            blogid={this.props.location.state.blog}
            comment={this.state.content.content}
            commentshow="true"
            ref="commentModal"
          />
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Blog Not Found</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blog: state.Blog.selectedBlogs,
    addedblog: state.Blog.addedBlogs,
    blogsComments: state.Comment.allcomments
      ? state.Comment.allcomments.comments
      : ""
  };
}
const mapDispatchToProps = dispatch => ({
  selectedBlog: async blog =>
    dispatch({
      type: BLOG_SELECTED,
      payload: await blogModule.selectedBlog(blog)
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetail);
