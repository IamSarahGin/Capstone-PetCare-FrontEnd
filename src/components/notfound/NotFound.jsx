import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './NotFound.css';
const NotFound = () => {
  const location = useLocation()
 const goBack = () => {
     window.history.back();
   };
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">	
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <button className="link_404"onClick={goBack}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;













// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const NotFound = () => {
//   const location = useLocation();

//   const goBack = () => {
//     window.history.back();
//   };

//   return (
//     <div>
//       <h1>404 Not Found</h1>
//       <p>The requested URL <code>{location.pathname}</code> was not found.</p>
//       <button onClick={goBack}>Go Back</button>
//       <Link to="/">Go to Home</Link>
//     </div>
//   );
// };

// export default NotFound;
