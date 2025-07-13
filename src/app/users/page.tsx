"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DeleteUserAction } from "@/lib/actions/user.action";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";

// Interface for user object

const Page: React.FC = () => {
  const { fetchUsers, loading, setUsers, users } = useUser();
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  console.log(users);

  const handleDelete = async (userId: string) => {
    setLoadingDelete(true);
    const { status, message } = await DeleteUserAction(userId);
    if (status == 200) {
      toast.success(message);
      setUsers(users?.filter((user) => user._id !== userId) as User[]);
    } else {
      toast.error(message);
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create New
        </Link>
      </div>

      {/* User Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : users?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3  text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3  text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3  text-sm font-semibold text-gray-600 uppercase tracking-wider">Join at</th>
                  <th className="px-6 py-3  text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users?.map((user: User) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(user.createdAt).toDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <Link
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          href={`/users/${user._id}`}
                        >
                          Update
                        </Link>
                        <button
                          disabled={loadingDelete}
                          onClick={() => handleDelete(user._id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          {loadingDelete ? "loading..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
