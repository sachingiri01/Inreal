"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import project from "../../public/project.jpg";

const TaskPage = () => {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const router = useRouter();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTask = async (taskId) => {
    try {
      const response = await fetch("/api/fetch-single-task", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });

      const result = await response.json();

      if (result.success) {
        setTask(result.data);
      } else {
        setError("Something went wrong, please try again later.");
      }
    } catch (err) {
      setError("Failed to fetch the task. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (taskId) => {
   
      const response = await fetch("/api/fetch-single-task", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });

      const result = await response.json();

      alert(result.message);
      router.push("/");
    }

  useEffect(() => {
    if (!taskId) {
      setError("No task ID provided in URL.");
      setLoading(false);
      return;
    }

    fetchTask(taskId);
  }, [taskId]);

  if (loading) {
    return <div className="p-6 text-center bg-slate-800 text-slate-300">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!task) {
    return <div className="p-6 text-center text-red-500">No task found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-800 text-slate-200 p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-6 rounded-2xl shadow-lg max-w-lg w-full">
        <Image
          src={project}
          alt={task.title}
          height={200}
          width={400}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="mb-4">{task.description}</p>

        <div className="text-sm mb-2">
          👤 Created by: <span className="font-medium">{task.created_by}</span>
        </div>
        <div className="text-sm mb-2">
          🕒 Created on: {new Date(task.created_at).toLocaleString()}
        </div>

        <div className="flex  mt-4 justify-between text-center items-center">
          <div className="flex gap-2 text-sm justify-center items-center">
            <span
              className={`px-2 py-1 rounded-md text-white ${
                task.status === "done"
                  ? "bg-green-500"
                  : task.status === "pending"
                  ? "bg-yellow-500"
                  : "bg-slate-400"
              }`}
            >
              {task.status.toUpperCase()}
            </span>
            {task.priority && (
              <span
                className={`px-2 py-1 rounded-md text-white ${
                  task.priority === "high"
                    ? "bg-red-500"
                    : task.priority === "medium"
                    ? "bg-orange-400"
                    : "bg-blue-400"
                }`}
              >
                {task.priority.toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <span
              onClick={() => router.push("/edit-task/?id=" + task.id)}
              className="px-2 py-1 rounded-md cursor-pointer text-white bg-blue-500"
            >
              Edit
            </span>
            <span
             onClick={() => deleteTask(task.id)}
             className="px-2 py-1 rounded-md cursor-pointer text-white bg-red-500">
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
