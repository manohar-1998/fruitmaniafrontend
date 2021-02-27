// import React, { Fragment } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { signout, isAuthenticated } from "./auth";
// const currentTab = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: "#2ecc72" };
//   } else {
//     return { color: "#FFFFFF" };
//   }
// };

// /**
//  * @author
//  * @function Menu
//  **/

// const Menu = ({ history }) => {
//   return (
//     <div>
//       <ul className="nav nav-tabs bg-dark">
//         {isAuthenticated() && isAuthenticated().user.role === 1 && (
//           <li className="nav-item">
//             <Link
//               style={currentTab(history, "/Navigation")}
//               className="nav-link"
//               to="/Navigation"
//             >
//              Navigation
//             </Link>
//           </li>
//         )}
//         {isAuthenticated() && (
//           <li className="nav-item">
//             <span
//               className="nav-link text-warning"
//               onClick={() => {
//                 signout(() => {
//                   history.push("/");
//                 });
//               }}
//             >
//               {" "}
//               Signout
//             </span>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default withRouter(Menu);
