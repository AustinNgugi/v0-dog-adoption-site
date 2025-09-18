import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { checkoutRequestId } = await request.json()

    // Get access token
    const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mpesa/auth`)
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

    const response = await fetch("https://sandbox-api.safaricom.co.ke/mpesa/stkpushquery/v1/query", {
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
