import React from "react";
import Card from "react-bootstrap/Card";
import {FaCamera, FaDog, FaUserFriends} from "react-icons/fa";
import {IoFastFoodSharp} from "react-icons/io5";

function AboutCard() {
    return (
        <Card className="quote-card-view">
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p style={{textAlign: "justify"}}>
                        Hi Everyone, I am <span className="blue">Jason Cameron </span>
                        from <span className="blue"> Toronto, Ontario.</span>
                        <br/>I am a high school student at William Lyon Mackenzie CI
                        <br/>
                        <br/>
                        Apart from coding, some other activities that I love to do!
                    </p>
                    <ul>
                        <li className="about-activity">
                            <FaCamera/> Photography
                        </li>
                        <li className="about-activity">
                            <IoFastFoodSharp/> Cooking/Baking
                        </li>
                        <li className="about-activity">
                            <FaDog/> Playing with <a style={{color: "white"}} href="/photos#dog">my dog</a>
                        </li>
                        <li className="about-activity">
                            <FaUserFriends/> Hanging out with friends
                        </li>
                    </ul>
                    <div style={{float: "left"}}>
                        <p style={{color: "rgb(137,191,239)"}}>
                            "I like when my projects have a purpose."
                        </p>
                        <footer className="blockquote-footer">Jason Cameron</footer>
                    </div>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default AboutCard;
