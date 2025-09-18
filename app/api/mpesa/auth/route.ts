import { NextResponse } from "next/server"

export async function GET() {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET

    if (!consumerKey || !consumerSecret) {
      console.log("[v0] M-Pesa credentials not found, using demo mode")
      // Return a mock token for demo purposes
      return NextResponse.json({
        access_token: "demo_access_token_" + Date.now(),
        demo_mode: true,
      })
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")

    const response = await fetch(
      "https://sandbox-api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      },
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] M-Pesa auth failed:", data)
      return NextResponse.json({ error: "Failed to authenticate with M-Pesa" }, { status: 400 })
    }

    return NextResponse.json({ access_token: data.access_token })
  } catch (error) {
    console.error("[v0] M-Pesa auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
