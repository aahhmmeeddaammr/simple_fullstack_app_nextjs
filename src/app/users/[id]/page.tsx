"use client";
import useUser from "@/hooks/useUser";
import { UpdateUserAction } from "@/lib/actions/user.action";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import toast from "react-hot-toast";

const Page = (props: { params: Promise<{ id: string }> }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { fetchUsers } = useUser();
  const { id } = use(props.params);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`https://simple-fullstack-app-nextjs.vercel.app/api/users/${id}`);
        // const { data } = await axios.get(`http://localhost:3000/api/users/${id}`);
        setName(data.data.name);
        setEmail(data.data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { message, status } = await UpdateUserAction({ email, name, id });
      if (status == 200) {
        fetchUsers();
        toast.success(message);
        router.back();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div onClick={() => router.back()} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        <h2 className="text-xl font-semibold mb-4">Update User</h2>

        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        </form>

        <button onClick={() => router.back()} className="absolute top-2 right-2 text-red-500">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Page;
