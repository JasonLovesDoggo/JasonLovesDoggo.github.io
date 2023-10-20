import React from "react";
import Card from "react-bootstrap/Card";
import {FaCamera, FaDog, FaUserFriends} from "react-icons/fa";
import {IoFastFoodSharp} from "react-icons/io5";
import {Link} from "react-router-dom";

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
                            <FaCamera/><Link target="_blank" to="https://photography.jasoncameron.dev" style={{color: "white", textDecoration: "none"}}> Photography</Link>
                        </li>
                        <li className="about-activity">
                            <IoFastFoodSharp/> Cooking/Baking
                        </li>
                        <li className="about-activity">
                            <FaDog/> Playing with <Link style={{color: "white"}} to="/photos#dog">my dog</Link>
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
