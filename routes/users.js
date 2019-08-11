var result = require("./response");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const multer = require("multer");

/** Storage Engine */
const storage = multer.diskStorage({
  destination: function(req, file, fn) {
    fn(null, "./public/users");
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
/**
 * Create User
 */
router.post("/", upload.single("userImage"), async (req, res) => {
  if (!req.body.name) {
    res.send(result.response(422, "", "Name is empty"));
  } else if (!req.body.email) {
    res.send(result.response(422, "", "Email is empty"));
  } else if (!req.body.mono) {
    res.send(result.response(422, "", "Mobile No is empty"));
  } else if (!req.body.password) {
    res.send(result.response(422, "", "Password is empty"));
  } else if (!req.body.address) {
    res.send(result.response(422, "", "Address is empty"));
  } else {
    const user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.mono = req.body.mono;
    user.address = req.body.address;
    user.about = req.body.about;
    if (req.file) {
      user.path = req.file.path;
    }
    await user.save(function(err, user) {
      if (err) {
        res.send(
          result.response(
            500,
            err,
            "OOPS, Something went wrong !, Please try again"
          )
        );
      } else {
        res.send(
          result.response(
            200,
            user,
            "Congratulation ! You have succefully registered !"
          )
        );
      }
    });
  }
});

/**
 * Update User
 */
router.put("/:userId", async (req, res) => {
  await User.findOneAndUpdate(
    {
      _id: req.params.userId
    },
    {
      $set: {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        mono: req.body.mono,
        address: req.body.address
      }
    },
    {
      new: true
    },
    function(user, err) {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    }
  );
});

/**
 * Read all users
 */
router.get("/", async (req, res) => {
  await User.find({}, function(user, err) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

/**
 * Read one user details
 */
router.get("/:userId", async (req, res) => {
  await User.find(
    {
      _id: req.params.userId
    },
    function(user, err) {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    }
  );
});

/**
 * Remove Collection
 */
router.delete("/:userId", async (req, res) => {
  await User.remove(
    {
      _id: req.params.userId
    },
    function(err) {
      if (err) {
        res.send(err);
      }
    }
  );
});

/**
 * User Login
 */
router.post("/login", async (req, res) => {
  if (!req.body.email) {
    res.send(result.response(422, "", "Email is empty"));
  } else if (!req.body.password) {
    res.send(result.response(422, "", "Password is empty"));
  } else {
    await User.find(
      {
        $and: [{ email: req.body.email }, { password: req.body.password }]
      },
      { name: 1, email: 1, path: 1, about: 1 },
      function(err, data) {
        if (err) {
          res.send(
            result.response(
              500,
              err,
              "OOPS, Something went wrong !, Please try again"
            )
          );
        } else if (data.length === 0) {
          res.send(
            result.response(
              404,
              data,
              "Please Enter valid Email and Password !"
            )
          );
        } else {
          res.send(result.response(200, data, "Succefully Logged In !"));
        }
      }
    );
  }
});

module.exports = router;
