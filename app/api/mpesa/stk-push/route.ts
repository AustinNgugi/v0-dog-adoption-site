import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, orderId } = await request.json()

    console.log("[v0] STK Push request:", { phoneNumber, amount, orderId })

    if (!phoneNumber || !amount) {
      return NextResponse.json({ error: "phoneNumber and amount are required" }, { status: 400 })
    }

    // Get access token from our auth route
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const authResponse = await fetch(`${baseUrl}/api/mpesa/auth`)

    if (!authResponse.ok) {
      console.error("[v0] Auth response not ok:", authResponse.status)
      return NextResponse.json({ error: "Failed to get M-Pesa access token" }, { status: 500 })
    }

    const authData = await authResponse.json()
    console.log("[v0] Auth data received:", { hasToken: !!authData.access_token, env: authData.env })

    if (!authData.access_token) {
      return NextResponse.json({ error: "Failed to get M-Pesa access token" }, { status: 500 })
    }

    if (authData.demo_mode) {
      console.log("[v0] Running in demo mode - simulating STK push")
      // Simulate successful STK push for demo
      return NextResponse.json({
        success: true,
        checkoutRequestId: `demo_checkout_${Date.now()}`,
        merchantRequestId: `demo_merchant_${Date.now()}`,
        responseCode: "0",
        responseDescription: "Success. Request accepted for processing",
        demo_mode: true,
      })
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3)
    const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE || "174379"
    const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"

    // Generate password
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString("base64")

    const callbackHost = process.env.MPESA_CALLBACK_HOST || baseUrl
    const callbackPath = process.env.MPESA_CALLBACK_PATH || "/api/mpesa/callback"

    // Normalize phone: remove plus and ensure starts with 254
    let normalizedPhone = String(phoneNumber).replace(/\s+/g, "")
    if (normalizedPhone.startsWith("+")) normalizedPhone = normalizedPhone.substring(1)
    if (normalizedPhone.startsWith("0")) normalizedPhone = "254" + normalizedPhone.substring(1)
    if (!normalizedPhone.startsWith("254")) normalizedPhone = "254" + normalizedPhone

    const stkPushPayload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: normalizedPhone,
      PartyB: businessShortCode,
      PhoneNumber: normalizedPhone,
      CallBackURL: `${callbackHost.replace(/\/$/, "")}${callbackPath}`,
      AccountReference: `Sweeven-${orderId}`,
      TransactionDesc: "Payment for Sweeven Cafe order",
    }

    // Select host based on env
    const env = process.env.MPESA_ENV === "production" ? "production" : "sandbox"
    const host = env === "production" ? "https://api.safaricom.co.ke" : "https://sandbox-api.safaricom.co.ke"
    const endpoint = `${host}/mpesa/stkpush/v1/processrequest`

    console.log("[v0] Sending STK push to M-Pesa API", { endpoint })
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stkPushPayload),
    })

    const data = await response.json()
    console.log("[v0] M-Pesa API response:", data)

    if (!response.ok) {
      console.error("[v0] STK Push error:", data)
      return NextResponse.json({ error: "Failed to initiate M-Pesa payment", details: data }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      checkoutRequestId: data.CheckoutRequestID,
      merchantRequestId: data.MerchantRequestID,
      responseCode: data.ResponseCode,
      responseDescription: data.ResponseDescription,
    })
  } catch (error) {
    console.error("[v0] STK Push error:", error)
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 })
  }
}
