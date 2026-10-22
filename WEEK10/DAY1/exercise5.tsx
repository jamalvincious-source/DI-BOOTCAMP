import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export default function Exercise5() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers(): Promise<void> {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users (${response.status})`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "An unexpected error occurred while fetching users.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void fetchUsers();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <p role="status">Loading users...</p>;
  }

  if (error) {
    return <p role="alert">Error loading users: {error}</p>;
  }

  return (
    <section aria-labelledby="user-list-heading">
      <h2 id="user-list-heading">Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.name}</h3>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <p>
                Address: {user.address.street}, {user.address.suite},{" "}
                {user.address.city} {user.address.zipcode}
              </p>
              <p>Company: {user.company.name}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
