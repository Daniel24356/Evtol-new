// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AdminPanel() {
//   const [role, setRole] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3020/api/v1/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Error fetching users:", err));
//   }, []);


//   return (
//     <div>
//       <h1>Admin Panel</h1>
//       <h2>User Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.firstName} {user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminPanel;
