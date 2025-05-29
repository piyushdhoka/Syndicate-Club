"use client"

import React from 'react';
import styled from 'styled-components';
import { Github, Linkedin, Mail } from "lucide-react";

const SocialIcons = () => {
  return (
    <StyledWrapper>
      <ul className="example-2">
        <li className="icon-content">
          <a href="https://github.com/Club-Syndicate" target="_blank" rel="noopener noreferrer" data-social="github">
            <Github className="w-6 h-6" />
            <div className="filled"></div>
          </a>
          <span className="tooltip">GitHub</span>
        </li>
        <li className="icon-content">
          <a href="https://www.linkedin.com/in/syndicate-club-45b525366/" target="_blank" rel="noopener noreferrer" data-social="linkedin">
            <Linkedin className="w-6 h-6" />
            <div className="filled"></div>
          </a>
          <span className="tooltip">LinkedIn</span>
        </li>
        <li className="icon-content">
          <a href="mailto:syndicatex.25@gmail.com" data-social="email">
            <Mail className="w-6 h-6" />
            <div className="filled"></div>
          </a>
          <span className="tooltip">Email</span>
        </li>
        <li className="icon-content">
          <a href="https://discord.gg/KJRETmypH8" target="_blank" rel="noopener noreferrer" data-social="discord">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
            <div className="filled"></div>
          </a>
          <span className="tooltip">Discord</span>
        </li>
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ul {
    list-style: none;
  }

  .example-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
  }

  .example-2 .icon-content {
    margin: 0;
    position: relative;
  }

  .example-2 .icon-content .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    color: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;
    margin-top: 5px;
  }

  .example-2 .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  .example-2 .icon-content a {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #4d4d4d;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
  }

  .example-2 .icon-content a:hover {
    box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
  }

  .example-2 .icon-content a svg {
    position: relative;
    z-index: 1;
    width: 30px;
    height: 30px;
  }

  .example-2 .icon-content a:hover {
    color: white;
  }

  .example-2 .icon-content a .filled {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #000;
    transition: all 0.3s ease-in-out;
  }

  .example-2 .icon-content a:hover .filled {
    height: 100%;
  }

  .example-2 .icon-content a[data-social="linkedin"] .filled,
  .example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
    background-color: #0274b3;
  }

  .example-2 .icon-content a[data-social="github"] .filled,
  .example-2 .icon-content a[data-social="github"] ~ .tooltip {
    background-color: #24262a;
  }

  .example-2 .icon-content a[data-social="email"] .filled,
  .example-2 .icon-content a[data-social="email"] ~ .tooltip {
    background-color: #ea4335;
  }

  .example-2 .icon-content a[data-social="discord"] .filled,
  .example-2 .icon-content a[data-social="discord"] ~ .tooltip {
    background-color: #5865F2;
  }
`;

export default SocialIcons; 