import { NextResponse } from "next/server"
import * as bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

// Hardcoded admin credentials - in a real app, these should be in environment variables
const ADMIN_USERNAME = "admin@msrit.edu"
const ADMIN_PASSWORD = "password" // In production, this should be hashed

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Check username
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    const token = sign(
      { username: ADMIN_USERNAME, role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    )

    // Set cookie
    cookies().set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
