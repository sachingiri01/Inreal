"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, User, Flag, FileText, Plus } from "lucide-react";
import project from "../../public/project.jpg";

function EditTaskContent(){
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    image_url: '',
    created_at: '',
    created_by:  '',
    status:  'pending',
    priority:  'medium',
  });
    const searchParams = useSearchParams();
    const taskId = searchParams.get("id");
    const router = useRouter();
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
        setTask({
            id: result.data.id || '',
            title: result.data.title || '',
            description: result.data.description || '',
            image_url: result.data.image_url || '',
            created_at: result.data.created_at || '',
            created_by: result.data.created_by || '',
           status:  result.data.status || 'pending',
           priority:  result.data.priority || 'medium',
        })
      } else {
        setError("Something went wrong, please try again later.");
      }
    } catch (err) {
      setError("Failed to fetch the task. Please try again.");
    }
  };

  const updatetask = async (task) => {
   
      const response = await fetch("/api/fetch-single-task", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();

      alert(result.message);
      router.push("/");
    }
  const handlechangeinput = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
      fetchTask(taskId);
  }, [taskId])
  

  const handleUpdate = () => {
    if (!task.title || !task.description || !task.created_by) {
      alert('Please fill in all required fields');
      return;
    }
    updatetask(task)
  };

  const resetForm = () => {
    setTask({
      title: '',
      description: '',
      image_url: '',
      created_at: '',
      created_by: '',
      status: 'pending',
      priority: 'medium',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-4 sm:p-6 lg:p-8">
              <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Edit Task</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-600/30 p-6 sm:p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  <FileText className="w-4 h-4 mr-2" />
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handlechangeinput}
                  placeholder="Enter task title..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Created By
                </label>
                <input
                  type="text"
                  name="created_by"
                  value={task.created_by}
                  onChange={handlechangeinput}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handlechangeinput}
                  placeholder="Describe your task in detail..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={task.image_url? task.image_url : 'No Url Provided'}
                  onChange={handlechangeinput}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                />
                {/* {task.image_url && ( */}
                  {/* <div className="mt-2 p-2 bg-slate-700/30 rounded-lg">
                    <Image
                      src={task.image_url} 
                      height={400}
                      width={400}
                      alt="Preview" 
                      className=" object-cover rounded-md"
                    />
                  </div> */}
                {/* )} */}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  name="created_at"
                  value={task.created_at}
                  onChange={handlechangeinput}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  Status
                </label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handlechangeinput}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-slate-200 font-medium mb-2">
                  <Flag className="w-4 h-4 mr-2" />
                  Priority
                </label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handlechangeinput}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Update Task
              </button>
              <button
                onClick={resetForm}
                className="flex-1 sm:flex-none bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 font-semibold py-3 px-6 rounded-lg border border-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditTaskPage() {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <EditTaskContent />
    </Suspense>
  );
}