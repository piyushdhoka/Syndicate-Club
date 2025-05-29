"use client"

import React from 'react';
import styled from 'styled-components';

const Tooltip = () => {
  return (
    <StyledWrapper>
      <div className="tooltip-container">
        <span className="tooltip">Join our Discord Community</span>
        <span className="text">
          <div className="borde-back">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} className="bi bi-discord" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
              </svg>
            </div>
          </div>
        </span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .tooltip-container {
    position: relative;
    background-color: #ff3cac;
    background-image: linear-gradient(
      225deg,
      #ff3cac 0%,
      #784ba0 50%,
      #2b86c5 100%
    );
    cursor: pointer;
    transition: all 0.2s;
    font-size: 17px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .tooltip-container .borde-back {
    width: 60px;
    height: 60px;
    background-color: rgba(248, 250, 252, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: none;
  }

  .tooltip-container .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background-color: #ff3cac;
    background-image: linear-gradient(
      225deg,
      #ff3cac 0%,
      #784ba0 50%,
      #2b86c5 100%
    );
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }

  .tooltip {
    position: absolute;
    top: -2;
    z-index: -10;
    transform: scaleX(0);
    transform-origin: left center;
    margin-left: 5px;
    height: 50px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.6s;
    border-radius: 0 50px 50px 0;
    background-color: #ff3cac;
    background-image: linear-gradient(
      225deg,
      #ff3cac 0%,
      #784ba0 50%,
      #2b86c5 100%
    );
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 16px;
    color: #fff;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: 800px;
    padding-left: 40px;
    margin-left: -25px;
    left: 100%;
  }

  .tooltip-container:hover .tooltip {
    transform: unset;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index: -10;
  }

  .tooltip-container:hover {
    transform: translateX(-0px);
    transition: 0.5s linear;
  }

  .tooltip-container:hover .icon {
    transform: rotate(360deg);
    transition: 0.5s linear;
  }`;

export default Tooltip; 