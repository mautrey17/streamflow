import React from 'react';
import LeftContainer from '../../components/LeftContainer/LeftContainer';
import {Col, Row} from "../../components/Grid";
import ActiveMessage from '../../components/ActiveMessage';

function Messages() {

    // return(
    //     <div>
    //         <h1>Chat App</h1>
    //         <Row>
    //             <LeftContainer />
    //             <Col size="md-1 sm-1" />
    //             <Col size="md-7 sm-7">
    //             <div className="chat" >
    //                 <iframe
    //                     title='Chat App Frame'
    //                     src='https://chat-app-unc.netlify.app/'
    //                     width='100%'
    //                     height='600'></iframe>
    //                 <h1 className="text-center mt-3 test">Your Conversation with Fake Person</h1>
    //                 <ActiveMessage 
    //                     sent={'to'}
    //                     message={'Hey this is a super important message'}
    //                 />
    //                 <ActiveMessage 
    //                     sent={'from'}
    //                     message={'Here is my reply'}
    //                 />
    //             </div>
                
    //             </Col>
    //         </Row>
    //     </div>
    // )
    console.log("messaging");
    return (
        <div>
            <iframe
                title='Chat App Frame'
                src='https://chat-app-unc.netlify.app/'
                width='100%'
                height='600'>
            </iframe>
        </div>
    )
}


export default Messages;