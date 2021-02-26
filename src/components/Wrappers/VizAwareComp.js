import React, { Component } from 'react';
import { Rectangle } from 'react-google-maps';
import VizSensor from 'react-visibility-sensor';

export default function VizAwareComp(props) {
  const [imgViz, setimgViz] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const duration = props.duration || 600;
  return (
    <VizSensor
      partialVisibility
      onChange={(isVisible) => {
        setimgViz(isVisible);
        if (isVisible) {
          setShown(true)
        }
      }}
    >
      <div
        style={{
          transform: (shown) ? `translate(${0}px, ${0}px)` : `translate(${0}px, ${30}px)`,
          opacity: (shown) ? 1 : 0,
          transition: `opacity ${duration}ms linear, transform ${duration + 400}ms linear`
        }}
      >{props.children}</div>
    </VizSensor>
  );
}