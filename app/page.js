"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import project from "../public/project.jpg";
import { useRouter } from 'next/navigation';
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [loading, setloading] = useState(false)
   const fecthing =async()=>{
      const data=await fetch("api/fetch-task",{
      method:"GET",
       credentials:"include",
       headers:{
        "Content-Type":"application/json",
       }
    })
    const fetched=await data.json();
    
    
    if(fetched.success){
      setTasks(fetched.data);
    setloading(false)
    }else{
      alert("Something went wrong, please try again later.");
      setloading(false);
    }
   }
  useEffect(() => {
     fecthing()
  }, []);
  const nevigatetask=(id)=>{
    console.log(
    "getting hit "
    );
    
    router.push(`/task/?id=${id}`);
  }




  const dummyTasks = [
  {
    id: 1,
    title: 'Finish Portfolio Website',
    description: 'Complete the portfolio homepage, add animations and deploy to Netlify.',
    image_url: 'https://source.unsplash.com/400x200/?design',
    created_at: '2025-06-01T10:00:00Z',
    created_by: 'Sachin',
    status: 'pending',
    priority: 'high',
  }
];


  return (
    <div className="min-h-screen bg-slate-800 p-6 relative">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-400">Task Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {loading?(
     <div className="text-lg font-sans text-center text-white">Data is loading Please Wait</div>
       ):(
         tasks.map((task) => (
          <div 
            onClick={()=>nevigatetask(task.id)}
            key={task.id}
            className="bg-slate-700 hover:bg-slate-600 hover:scale-105 duration-300 cursor-pointer text-slate-100 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
          >
            {/* {task.image_url && ( */}
              <Image
              src={project}
                height={160}
                width={400}
                alt={task.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
            {/* )} */}
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className=" mb-3">{task.description}</p>

            <div className="flex justify-between text-sm">
              <span>👤 {task.created_by}</span>
              <span>🕒 {new Date(task.created_at).toLocaleDateString()}</span>
            </div>

            <div className="mt-3 flex justify-between text-xs text-white">
              <span
                className={`px-2 py-1 rounded-full ${
                  task.status === 'done'
                    ? 'bg-green-500'
                    : task.status === 'pending'
                    ? 'bg-yellow-500'
                    : 'bg-slate-400'
                }`}
              >
                {task.status}
              </span>
              {task.priority && (
                <span
                  className={`px-2 py-1 rounded-full ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-orange-400'
                      : 'bg-blue-400'
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </div>
          </div>
        ))
       )}
      </div>

      <button
        onClick={() => router.push('/add-task')}
        className="fixed bottom-6 cursor-pointer z-10 hover:scale-110 duration-150 left-6 bg-slate-800 text-white px-5 py-3 rounded-full shadow-lg hover:bg-slate-700 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default Home;
