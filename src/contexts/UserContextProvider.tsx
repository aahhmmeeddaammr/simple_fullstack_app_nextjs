"use client";
import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from "react";

export const UserContext = createContext<{
  users: User[] | null;
  setUsers: (data: User[] | null) => void;
  fetchUsers: () => Promise<void>;
  loading: boolean;
}>({
  users: null,
  setUsers: () => null,
  fetchUsers: async () => {},
  loading: false,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      console.log("Users fetched:", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <UserContext.Provider value={{ users, setUsers, fetchUsers, loading }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
