import React, { Component } from "react";
import { commentModule, blogModule } from "../api/api";
import { connect } from "react-redux";
import {
  COMMENT_BLOG,
  BLOG_All_COMMENTS,
  BLOG_LIST
} from "../store/actionTypes";
import { alertmesage } from "../store/alertmessage";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        content: this.props.comment
      },
      requiredContent: "",
      comment: "",
      id: ""
    };

    this.handleComment = this.handleComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }
  changeCommentId = () => {
    this.setState({
      id: "",
      content: {
        content: ""
      }
    });
  };
  handleChange() {
    this.setState({
      content: { content: this.refs.content.value },
      requiredContent: ""
    });
  }

  async handleEditComment(commentid, comment) {
    this.setState({
      content: { content: comment },
      id: commentid
    });
  }

  async handleUpdateComment(blogid) {
    if (this.state.content["content"]) {
      await commentModule.updateComment(this.state.id, this.state.content);
      window.$("#myModal").modal("hide");
      alertmesage.createNotification("success", "Commented !");
      await this.props.comments(blogid);
    } else {
      this.setState({
        requiredContent: "Comment is required *"
      });
    }
    this.setState({
      content: { content: "" },
      id: ""
    });
  }

  async handleComment(blogid) {
    if (this.state.content["content"]) {
      await this.props.commentBlog(blogid, this.state.content);
      window.$("#myModal").modal("hide");
      alertmesage.createNotification("success", "Commented !");
      await this.props.comments(blogid);
      await this.props.allBlog();
    } else {
      this.setState({
        requiredContent: "Comment is required *"
      });
    }
    this.setState({
      content: { content: "" },
      id: ""
    });
  }
  async handleDeleteComment(comment) {
    const blogid = this.props.blogid;
    await commentModule.deleteComment(comment);
    await this.props.comments(blogid);
    alertmesage.createNotification(500, "Deleted !");
  }

  async componentWillMount() {
    const blogid = this.props.blogid;
    if (this.props.commentshow !== "false") {
      await this.props.comments(blogid);
    }
  }

  commentDisplay() {
    return (
      <div className="w3-card w3-margin">
        <div className="w3-container w3-padding">
          <h4>Popular Comments</h4>
        </div>
        <ul className="w3-ul w3-hoverable w3-white">
          {this.props.blogsComments
            ? this.props.blogsComments.map(comment => {
                return (
                  <li className="w3-padding-16" key={comment._id}>
                    <img
                      src="../assets/image/dummy.jpg"
                      alt="img"
                      className="w3-left w3-margin-right"
                    />
                    <span className="w3-large">{comment.content}</span>
                    <br />
                    <span>{comment.content}</span>
                    <p className="pull-right">
                      <span
                        className="required pointer"
                        onClick={() => this.handleDeleteComment(comment._id)}
                      >
                        Delete{" "}
                      </span>
                      <span className="verticle"> </span>
                      <span
                        className="pointer"
                        onClick={() =>
                          this.handleEditComment(comment._id, comment.content)
                        }
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        Update
                      </span>
                    </p>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.commentshow === "true" ? this.commentDisplay() : ""}

        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  {!this.state.id ? "Add Comment" : "Update Comment"}
                </h4>
              </div>
              <div className="modal-body">
                <div align="center">
                  <img src="../assets/image/product.png" alt="Avatar" />
                </div>
                <p>
                  <b>Title : </b>
                  {this.props.title}
                </p>
                <p>
                  <b>Content : </b>
                  {this.props.content}
                </p>
                <div className="form-group">
                  <label htmlFor="body">Comment : </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.content.content}
                    onChange={this.handleChange}
                    ref="content"
                  />
                  <p className="required">{this.state.requiredContent}</p>
                </div>
              </div>
              <div className="modal-footer">
                {!this.state.id ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleComment(this.props.blogid)}
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleUpdateComment(this.props.blogid)}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsComments: state.Comment.allcomments
      ? state.Comment.allcomments.comments
      : ""
  };
}
const mapDispatchToProps = dispatch => ({
  commentBlog: async (blog, comment) =>
    dispatch({
      type: COMMENT_BLOG,
      payload: await commentModule.commentBlog(blog, comment)
    }),
  comments: async blog =>
    dispatch({
      type: BLOG_All_COMMENTS,
      payload: await commentModule.getComments(blog)
    }),
  allBlog: async () =>
    dispatch({
      type: BLOG_LIST,
      payload: await blogModule.getBlog()
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Comment);
