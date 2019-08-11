import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BlogDetail from "../containers/active-blog";
import Addblog from "../containers/add-blog";
import Signup from "../containers/Registration/signup";
import Login from "../containers/Login/login";
import Bloglist from "../containers/blog-list";
import notFound from "./notFound";
import Navbar from "./navbar";
import { NotificationContainer } from "react-notifications";

import App from "../App";
const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/blogdeatils/:id" component={BlogDetail} />
        <Route path="/addblog" component={Addblog} />
        <Route path="/signup" component={Signup} />
        <Route path="/blog" component={Bloglist} />
        <Route path="/signin" component={Login} />
        <Route path="*" exact={true} component={notFound} />
      </Switch>
      <NotificationContainer />
      <Route component={Navbar} />
    </div>
  </BrowserRouter>
);
export default Router;
