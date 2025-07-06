import { NextRequest, NextResponse } from "next/server";
import { PomodoroConfig } from "@/lib/types";
import { DEFAULT_CONFIG } from "@/lib/services/ConfigService";

// This is a placeholder implementation
// In production, you would integrate with a database
// For now, we'll use a simple in-memory store or return appropriate responses

export async function GET(request: NextRequest) {
  // Verify authentication
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract token and verify it
    // const token = authHeader.split(" ")[1];

    // TODO: Use token for authentication when implementing database

    // In a real implementation, you would:
    // 1. Verify the token
    // 2. Get the user ID from the token
    // 3. Fetch the user's config from the database

    // For now, return the default config
    // The client will fall back to localStorage
    return NextResponse.json(DEFAULT_CONFIG);
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Verify authentication
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // const token = authHeader.split(" ")[1];

    // TODO: Use token for authentication when implementing database
    const config = (await request.json()) as PomodoroConfig;

    // Validate config data
    if (!config || typeof config !== "object") {
      return NextResponse.json(
        { error: "Invalid config data" },
        { status: 400 }
      );
    }

    // Basic validation for required fields
    if (
      typeof config.pomodoroMinutes !== "number" ||
      typeof config.breakMinutes !== "number" ||
      typeof config.volume !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid config format" },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify the token
    // 2. Get the user ID from the token
    // 3. Validate the config data
    // 4. Save the config to the database

    // For now, just return the received config
    // The client will handle localStorage as fallback
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Keep the POST method for backward compatibility
export async function POST(request: NextRequest) {
  // Redirect to PUT method
  return PUT(request);
}
