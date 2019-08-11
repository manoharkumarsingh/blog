import React, { Component } from "react";
import "./App.css";
import BlogList from "./containers/blog-list";
class App extends Component {
  render() {
    return (
      <div className="containermain">
        {/* <BlogList /> */}
        <BlogList />
      </div>
    );
  }
}

export default App;
