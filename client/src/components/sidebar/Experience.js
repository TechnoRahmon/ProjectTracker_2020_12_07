import React from "react";
import "../../css/styleV1.css";
const Experience = () => {
  return (
    <div className="experience_container">
      <h1>Experience</h1>
      <div className="flex_box">
        <div className="flext-right">
          <div className="experience_detail ">
            <h3 className="ex-h3">UI-Materialize</h3>
            <small>2018</small>
            <div className="group_span">
              <span>Library</span>
              <span>Deprecated</span>
              <span>open-src</span>
            </div>
            <ul>
              <li>
                Designed UX/UI Library using Googl's Material Design guidelines
              </li>
              <li>
                Leveraging Angular JS to create custom cross-browser Directives
              </li>
              <li>
                Using Photoshop and Illustrator, developed Mockups of components
                before implementation
              </li>
              <li>
                Project deprecated due to Angular no longer supporting AngularJS
                version 1
              </li>
            </ul>
          </div>
        </div>

        <div className="flex_left">
          <i className="fab fa-angular"></i>
        </div>
      </div>
      <hr />
      <div className="flex_box">
        <div className="flext-right">
          <div className="experience_detail">
            <h3 className="ex-h3">UI-Materialize</h3>
            <small>2018</small>
            <div className="group_span">
              <span>Library</span>
              <span>Deprecated</span>
              <span>open-src</span>
            </div>
            <ul>
              <li>
                Designed UX/UI Library using Googl's Material Design guidelines
              </li>
              <li>
                Leveraging Angular JS to create custom cross-browser Directives
              </li>
              <li>
                Using Photoshop and Illustrator, developed Mockups of components
                before implementation
              </li>
              <li>
                Project deprecated due to Angular no longer supporting AngularJS
                version 1
              </li>
            </ul>
          </div>
        </div>

        <div className="flex_left">
          <i className="fab fa-react"></i>
        </div>
      </div>
    </div>
  );
};

export default Experience;
