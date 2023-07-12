import React, { Component } from "react";
// import logo from "../Assets/python";
import "./Courses.css";

const CourseCard = ({ name, dept, img }) => (
  <div className="cpp">
    <img src={img} alt="pythonlogo" width="100%" height="400 px" />
    <div class="container">
      <h4>
        <b>{name}</b>
      </h4>
      <p>{dept}</p>
    </div>
  </div>
);

export const Courses = () => {
  const courses = [
    { name: "INTRODUCTION TO PYTHON", img: "assets/python", dept: "Dept" },
    { name: "C PROGRAMMING         ", img: "assets/c.jpg", dept: "Dept" },
    { name: "C++ PROGRAMMING       ", img: "assets/java.png", dept: "Dept" },
    { name: "JAVA                  ", img: "assets/java.png", dept: "Dept" },
    { name: "HTML", img: "assets/html.jpg", dept: "Dept" },
    { name: "NODEJS", img: "assets/nodejs.jpg", dept: "Dept" },
    { name: "", img: "assets/java.png", dept: "Dept" },
    { name: "MCA", img: "assets/java.png", dept: "Dept" },
    { name: "MCA", img: "assets/java.png", dept: "Dept" },
    { name: "MCA", img: "assets/java.png", dept: "Dept" },
  ];

  return (
    <div>
      <div
        className="courseset1"
        style={{
          display: "flex",
          
          justifyContent: "space-around",
          flexWrap:"wrap",
          margin:'30px 30px 30px 30px'
        }}
      >
      
        {courses.map((item, i) => (
        <div>
          <CourseCard name={item.name} img={item.img} dept={item.dept} />
          <div  style={{
        
           marginTop:'40px',
           marginBottom:'20px'}}> </div>

          </div>
        ))}

        
      </div>
</div>
     
  );
};

export default Courses;
