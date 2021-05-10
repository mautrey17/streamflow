import React from 'react';
// import LeftContainer from '../../components/LeftContainer/LeftContainer';
// import {Col, Row} from "../../components/Grid";
// import ActiveMessage from '../../components/ActiveMessage';
import Nav from "../../components/Nav";

function Messages() {
    console.log("messaging");
    return (
        <div>
            <iframe
                title='Chat App Frame'
                src='https://chat-app-unc.netlify.app/'
                width='100%'
                height='800'>
            </iframe>
        </div>
    )
}


export default Messages;