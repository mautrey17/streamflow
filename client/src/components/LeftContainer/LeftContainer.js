import React from "react";
import {Col} from "../Grid";
import MessageCard from "../MessageCard";
import "./LeftContainer.css"


function LeftContainer() {
    return(
        <Col className="pr-3" size="md-3 sm-3">
            <div className="holder" >
                <h1 className="text-center mt-3 test">Messages</h1>
                <MessageCard />
                <MessageCard />
                <MessageCard />
            </div>
            
        </Col>
    )
};

export default LeftContainer;