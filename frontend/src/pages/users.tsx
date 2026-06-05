import { useEffect, useState } from "react";

interface User {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        const response = await fetch(
          "http://localhost:5000/api/users/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("API RESPONSE:", data);

        setUsers(data.data);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      <p>Total Users: {users.length}</p>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;