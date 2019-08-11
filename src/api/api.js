var axios = require("axios");
var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
const ApiService = {
  get(apiurl) {
    return axios
      .get(apiurl)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  },

  post(apiurl, bodyFormData) {
    return axios
      .post(apiurl, bodyFormData)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  },

  put(apiurl, bodyFormData) {
    return axios
      .put(apiurl, bodyFormData)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  },
  delete(apiurl, bodyFormData) {
    return axios
      .delete(apiurl)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }
};
export default ApiService;

export const blogModule = {
  getBlog() {
    return ApiService.get("http://localhost:4600/posts/");
  },
  mostlikedpost() {
    return ApiService.get("http://localhost:4600/posts/mostlikedpost/");
  },
  selectedBlog(blog) {
    return ApiService.get("http://localhost:4600/posts/" + blog);
  },

  addBlog(blog) {
    return ApiService.post("http://localhost:4600/posts/", blog);
  },

  updateBlog(blog, blogid) {
    return ApiService.put("http://localhost:4600/posts/" + blogid, blog);
  },

  deleteBlog(blog) {
    return ApiService.delete("http://localhost:4600/posts/" + blog);
  }
};

export const commentModule = {
  commentBlog(blog, comment) {
    return ApiService.post(
      "http://localhost:4600/posts/" + blog + "/comment",
      comment
    );
  },
  getComments(blog) {
    return ApiService.get("http://localhost:4600/posts/" + blog + "/comment");
  },
  deleteComment(comment) {
    return ApiService.delete("http://localhost:4600/posts/comment/" + comment);
  },
  updateComment(comment, data) {
    return ApiService.put(
      "http://localhost:4600/posts/comment/" + comment,
      data
    );
  }
};

export const likeBlogModule = {
  likeBlog(blog) {
    return ApiService.post("http://localhost:4600/posts/like", blog);
  }
};

export const userModule = {
  addUser(user) {
    return ApiService.post("http://localhost:4600/users/", user);
  },
  userLogin(user) {
    return ApiService.post("http://localhost:4600/users/login", user);
  }
};
