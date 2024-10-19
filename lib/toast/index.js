import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import React, { useState } from 'react';
function ToastConfig({ title, time, bodyTitle, show, setShow ,bg,textStyle}) {
  return (
    <Toast bg={bg} style={{position:'fixed',top:0,right:0}} onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
        <small>{time}</small>
      </Toast.Header>
      <Toast.Body style={textStyle}>{bodyTitle}</Toast.Body>
    </Toast>
  );
}

export default ToastConfig;
