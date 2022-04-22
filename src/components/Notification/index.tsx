import { RiMvLine } from 'react-icons/ri';
import React from 'react';

type Props = {
  open: boolean;
  message: string;
  title: string;
};

function Notification({ open, message, title }: Props) {
  return (
    <div className={`notification-box ${open ? '' : 'hidden'}`}>
      <RiMvLine />
      <div className="notification-message">
        <p className="title">{title}</p>
        <p className="text-mini">{message}</p>
      </div>
    </div>
  );
}

export default Notification;
