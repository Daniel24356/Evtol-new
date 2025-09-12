// import { useEffect, useState } from "react";
// import axios from "axios";

// function RoleManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:3020/api/v1/users")
//       .then((res) => {
//         setUsers(res.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       });
//   }, []);

//   const updateRole = (userId, newRole) => {
//     axios.patch(`http://localhost:3020/api/v1/users/${userId}/role`, { role: newRole })
//       .then(() => {
//         setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
//       })
//       .catch(error => console.error("Error updating role:", error));
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div>
//       <h2>Role Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.firstName} {user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <select
//                   value={user.role}
//                   onChange={(e) => updateRole(user.id, e.target.value)}
//                 >
//                   <option value="USER">User</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default RoleManagement;