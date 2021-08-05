import React from 'react';
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
  } from "react-share";

const ShareDKN=({title, desc})=>{
  return (
    <>
        <WhatsappShareButton className="social-media-icon social-margin" url={`Check out this remedy of ${title}: ${desc}`}>
        <WhatsappIcon size={32} round={true}/></WhatsappShareButton>
        <EmailShareButton className="social-media-icon social-margin" subject={title} body={`Check out this remedy of ${title}:${desc}`}>
        <EmailIcon size={32} round={true}/></EmailShareButton>
        <TwitterShareButton className="social-media-icon social-margin" url={`Check out this remedy of ${title}:${desc}`}>
        <TwitterIcon size={32} round={true}/></TwitterShareButton>
    </>
  );
}

export default ShareDKN;