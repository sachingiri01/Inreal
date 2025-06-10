import { supabase } from "@/app/db/db.js"
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Task ID is required"
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single(); 

    if (error) {
      return NextResponse.json({ 
        success: false, 
        message: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Server Error' 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Task ID is required"
      }, { status: 400 });
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Task with ID ${id} has been deleted`
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server Error'
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, description, image_url, created_at, created_by, status, priority } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Task ID is required"
      }, { status: 400 });
    }

    const { error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
        image_url,
        created_at,
        created_by,
        status,
        priority
      })
      .eq('id', id);

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Task with ID ${id} has been updated`
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server Error'
    }, { status: 500 });
  }
}