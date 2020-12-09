import React from "react";
import "../../css/styleV1.css";
const Skills = () => {
  return (
    <div className="skills-container">
      <h1> My Skills</h1>
      <div className="flex_boxes">
        <div className="flex_left">
          <div className="grid-right">
            <h5>HTML/CSS</h5>
            <div className="icon_holder">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png"
                alt="html"
                srcSet=""
              />
              <img
                src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png"
                alt="css"
              />
            </div>

            <div className="progress power">
              <div className="determinate" style={{ width: "100%" }}></div>
            </div>
            <h5>JAVASCRIPT</h5>
            <div className="icon_holder">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Javascript-shield.png"
                alt="js"
              />
            </div>
            <div className="progress">
              <div className="determinate" style={{ width: "90%" }}></div>
            </div>
          </div>
          <div className="grid-middle">
            <h5>JAVA</h5>
            <div className="icon_holder">
              <img
                src="https://freepngimg.com/thumb/java/85390-java-language-text-programming-logo-programmer-thumb.png"
                alt="java"
              />
            </div>
            <div className="progress">
              <div className="determinate" style={{ width: "85%" }}></div>
            </div>
            <h5>PYTHON</h5>
            <div className="icon_holder">
              <img
                src="images/python.png"
                alt="python"
              />
            </div>
            <div className="progress">
              <div className="determinate" style={{ width: "60%" }}></div>
            </div>
          </div>
          <div className="grid-left">
            <h5>REACT</h5>
            <div className="icon_holder">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
                alt="react"
              />
            </div>
            <div className="progress">
              <div className="determinate" style={{ width: "90%" }}></div>
            </div>
            <h5>C#</h5>
            <div className="icon_holder">
              <img
                src="https://www.cnjobs.dk/drupal/sites/default/files/2019-01/csharp-01.png"
                alt="c"
              />
            </div>
            <div className="progress danger">
              <div className="determinate" style={{ width: "50%" }}></div>
            </div>
          </div>
        </div>
        <div className="flex_right">
          <h5>IDEs & Framworks</h5>
          <div className="tool_img">
            <div className="ides">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png"
                alt="vsc"
              />
            </div>
            <div className="ides">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/IntelliJ_IDEA_Logo.svg/1024px-IntelliJ_IDEA_Logo.svg.png"
                alt="vsc"
              />
            </div>
            <div className="ides">
              <img
                src="https://www.eclipse.org/artwork/images/v2/logo-800x188.png"
                alt="vsc"
              />
            </div>
            <div className="ides">
              <img
                src="https://miro.medium.com/max/512/1*fVBL9mtLJmHIH6YpU7WvHQ.png"
                alt="vsc"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
