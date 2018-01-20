// higher order component (HOC)
// a component (HOC) that render another component
// reuse code
// render hijacking
// prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>info</h1>
    <p>the info is: {props.info}</p>
  </div>
);

// param start with upper case to indicate passing a component
const withAdminWarning = (WrappedComponent) => {
  
  // {...props}: spreading out props 
  // -> taking every key value pairs of this object and pass down as props

  // returning a stateless functional component
  return (props) => (
    <div>
      {props.isAdmin && <p>this is private info.  please don't share</p>}      
      <WrappedComponent {...props} />
    </div>
  );
};
const AdminInfo = withAdminWarning(Info);


const requireAuthentication = (WrappedComponent) => {
  // returning a stateless functional component
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>you are not authenticated</p>
      )}        
    </div>
  );
};
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="there are the details" />, document.getElementById('app') );

ReactDOM.render(<AuthInfo isAuthenticated={true} info="there are the details" />, document.getElementById('app') );