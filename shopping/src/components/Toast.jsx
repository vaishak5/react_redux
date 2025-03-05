import React, { useEffect } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px;
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  background-color: ${({ type, message }) => 
    type ? (type === 'success' ? '#4caf50' : '#f44336') : 'transparent'};
  z-index: 1000;
`;

const Toast = ({ type, message, onClose, style }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <ToastContainer type={type} style={style}>{message}</ToastContainer>;
};

export default Toast;
