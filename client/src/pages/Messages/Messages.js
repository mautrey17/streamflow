import React from 'react';
import LeftContainer from '../../components/LeftContainer/LeftContainer';
import {Col, Row} from "../../components/Grid";
import ActiveMessage from '../../components/ActiveMessage';

function Messages() {


    return(
        <div>
            <Row>
            <LeftContainer />
            <Col size="md-1 sm-1" />
            <Col size="md-7 sm-7">
            <div className="" >
                <h1 className="text-center mt-3 test">Your Conversation with Fake Person</h1>
                <ActiveMessage 
                    sent={'to'}
                    message={'Hey this is a super important message'}
                />
                <ActiveMessage 
                    sent={'from'}
                    message={'Here is my reply'}
                />
            </div>
            
        </Col>
        </Row>
        </div>
    )
}

export default Messages;