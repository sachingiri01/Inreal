"use client";
import React, { useState ,useEffect } from 'react';
import Image from 'next/image';
import { Calendar, User, Flag, FileText, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import project from "../../public/project.jpg";

export default function AddTask() {
  const router = useRouter();

  const [task, setTask] = useState({
    title: '',
    description: '',
    image_url: '',
    created_at: '',
    created_by: '',
    status: 'pending',
    priority: 'medium',
  });

  const handleAddTask = async (task) => {
    const res = await fetch('/api/add-task', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(task),
    });

    const response = await res.json();

    if (response.success) {
      alert(response.message);
      router.push('/');
    } else {
      alert(response.message || 'Something went wrong, please try again later.');
      router.push('/');
    }
  };

  const handlechangeinput  = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!task.title || !task.description || !task.created_by) {
      alert('Please fill in all required fields');
      return;
    }
    handleAddTask(task);
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Add New Task</h1>
          <p className="text-slate-300 text-lg">Create and organize your next project</p>
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
                  {/* <Image className="w-4 h-4 mr-2" /> */}
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={task.image_url}
                  onChange={handlechangeinput}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                />
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
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Create Task
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