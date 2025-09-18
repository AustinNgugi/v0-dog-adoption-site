import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { checkoutRequestId } = await request.json()

    if (!checkoutRequestId) {
      return NextResponse.json({ error: "checkoutRequestId is required" }, { status: 400 })
    }

    // Get access token
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const authResponse = await fetch(`${baseUrl}/api/mpesa/auth`)
    const authData = await authResponse.json()

    if (!authData.access_token) {
      return NextResponse.json({ error: "Failed to get M-Pesa access token" }, { status: 500 })
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3)
    const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE || "174379"
    const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"

    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString("base64")

    const queryPayload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }

    const env = process.env.MPESA_ENV === "production" ? "production" : "sandbox"
    const host = env === "production" ? "https://api.safaricom.co.ke" : "https://sandbox-api.safaricom.co.ke"
    const endpoint = `${host}/mpesa/stkpushquery/v1/query`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryPayload),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Query error:", error)
    return NextResponse.json({ error: "Query failed" }, { status: 500 })
  }
}
