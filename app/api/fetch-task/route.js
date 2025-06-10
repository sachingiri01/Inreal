import { supabase } from "@/app/db/db.js"
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ 
        success: false, 
        message: error.message 
      });
    }

    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
}