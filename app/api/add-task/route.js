import { supabase } from "@/app/db/db.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const task =await  request.json();


    const newTask = {
      title: task.title,
      description: task.description,
      image_url: task.image_url || '',
      created_by: task.created_by || 'Anonymous',
      due_date: task.due_date, 
      status: task.status || 'pending',
      priority: task.priority || 'medium',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .single();

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Task created successfully',
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || error.toString(),
    });
  }
}