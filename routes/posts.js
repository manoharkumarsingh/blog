const router = require("express").Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const Like = mongoose.model("Like");
const multer = require("multer");
const ObjectId = require("mongodb").ObjectID;
var result = require("./response");
/** Storage Engine */
const storage = multer.diskStorage({
  destination: function(req, file, fn) {
    fn(null, "./public/files");
  },
  filename: function(req, file, fn) {
    fn(null, new Date().getTime().toString() + "-" + file.originalname);
  }
});
const fileFilter = function(req, file, callback) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
/*Image Upload code complete*/

router.get("/", async (req, res) => {
  await Post.find({}, function(err, post) {
    if (err) {
      res.send(
        result.response(
          500,
          err,
          "OOPS, Something went wrong !, Please try again"
        )
      );
    } else {
      res.send(result.response(200, post, "All Blog"));
    }
  });
});

router.post("/", upload.single("blogImage"), async (req, res) => {
  if (!req.body.title) {
    res.send(result.response(422, "", "Title is empty"));
  } else if (!req.body.content) {
    res.send(result.response(422, "", "Content is empty"));
  } else {
    const post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;
    if (req.file) {
      post.path = req.file.path;
    }
    await post.save(function(err, post) {
      if (err) {
        res.send(
          result.response(
            500,
            err,
            "OOPS, Something went wrong !, Please try again"
          )
        );
      } else {
        res.send(result.response(200, post, "Blog Added !"));
      }
    });
  }
});

router.get("/:postId", async (req, res) => {
  await Post.find({ _id: req.params.postId }, function(post, err) {
    if (err) {
      res.send(err);
    } else {
      res.send(post);
    }
  });
});

router.put("/:postId", upload.single("blogImage"), async (req, res) => {
  var path = "";
  if (req.file) {
    path = req.file.path ? req.file.path : "";
  }
  if (!req.body.title) {
    res.send(result.response(422, "", "Title is empty"));
  } else if (!req.body.content) {
    res.send(result.response(422, "", "Content is empty"));
  } else {
    await Post.update(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          path: path
        }
      },
      function(err, post) {
        if (err) {
          res.send(
            result.response(
              500,
              err,
              "OOPS, Something went wrong !, Please try again"
            )
          );
        } else {
          res.send(result.response(200, post, "Blog Added !"));
        }
      }
    );
  }
});

router.delete("/:postId", async (req, res) => {
  /**Deleteing Data from post */
  if (!req.params.postId) {
    res.send(result.response(422, "", "Id params is empty"));
  } else {
    await Post.findByIdAndRemove(
      {
        _id: req.params.postId
      },
      function(err, post) {
        if (err) {
          res.send(
            result.response(
              500,
              err,
              "OOPS, Something went wrong !, Please try again"
            )
          );
        } else {
          res.send(result.response(200, post, "Blog Deleted !"));
        }
      }
    );
    /**Removing Data from comment */
    await Comment.remove(
      {
        post: ObjectId("" + req.params.postId + "")
      },
      function(err, comment) {
        if (err) {
          res.send(err);
        } else {
        }
      }
    );
  }
});

/*Create a comment for the post*/
router.post("/:postId/comment", async (req, res) => {
  /* Find a Post */

  const post = await Post.findOne({ _id: req.params.postId });
  /* Create a Post */
  const comment = new Comment();
  comment.content = req.body.content;
  comment.post = post._id;
  await comment.save();
  /* Associate Post with comment */
  post.comments.push(comment._id);
  await post.save();
  res.send(comment);
});

/*Read a comment for the post*/
router.get("/:postId/comment", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    "comments"
  );
  res.send(post);
});

/**Edit a comment */
router.put("/comment/:commentId", async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    {
      _id: req.params.commentId
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.send(comment);
});

router.delete("/comment/:commentId", async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.commentId });
  const postId = comment.post;
  await Post.update(
    { _id: postId },
    { $pull: { comments: req.params.commentId } },
    { multi: true },
    function(err, data) {
      console.log(err, data);
    }
  );
  await Comment.findByIdAndRemove(req.params.commentId);
  res.send({ message: "Comment Successfully Deleted" });
});

/**
 * Top 5 Posts Based on user liked.
 */
// router.get("/mostlikedpost/", async (req, res) => {
//   await Post.find({}, function(err, post) {
//     if (err) {
//       res.send(
//         result.response(
//           500,
//           err,
//           "OOPS, Something went wrong !, Please try again"
//         )
//       );
//     } else {
//       res.send(result.response(200, post, "Most liked post"));
//     }
//   });
// });

/**
 * Post liked by User
 */
router.post("/like", async (req, res) => {
  if (!req.body.user) {
    res.send(result.response(422, "", "Userid is empty"));
  } else if (!req.body.post) {
    res.send(result.response(422, "", "Postid is empty "));
  } else {
    await Like.count(
      {
        $and: [{ user: req.body.user }, { post: req.body.post }]
      },
      async function(err, data) {
        if (err) {
          res.send(
            result.response(
              500,
              err,
              "OOPS, Something went wrong !, Please try again"
            )
          );
        } else {
          if (data === 0) {
            /**
             * Insert like
             */
            const like = new Like();
            like.user = req.body.user;
            like.post = req.body.post;
            await like.save(async function(err, like) {
              if (err) {
                res.send(
                  result.response(
                    500,
                    err,
                    "OOPS, Something went wrong !, Please try again"
                  )
                );
              } else {
                /**
                 *Saving like in the post
                 */
                const post = await Post.findOne({
                  _id: req.body.post
                });
                post.likedByUsers.push(req.body.user);
                await post.save();
                res.send(result.response(200, like, "Liked!"));
              }
            });
          } else {
            /**
             * Unlike, It's means remove from database
             */
            await Like.remove(
              {
                $and: [{ user: req.body.user }, { post: req.body.post }]
              },
              async function(err, response) {
                if (err) {
                  res.send(
                    result.response(
                      500,
                      err,
                      "OOPS, Something went wrong !, Please try again"
                    )
                  );
                } else {
                  await Post.update(
                    { _id: req.body.post },
                    {
                      $pull: {
                        likedByUsers: req.body.user
                      }
                    },
                    { multi: true },
                    function(err, data) {
                      console.log(err, data);
                    }
                  );
                  res.send(result.response(200, "", "Uliked!"));
                }
              }
            );
          }
        }
      }
    );
  }
});

module.exports = router;
