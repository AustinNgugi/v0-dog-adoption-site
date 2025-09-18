import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json()

    console.log("[v0] M-Pesa Callback received:", JSON.stringify(callbackData, null, 2))

    const { Body } = callbackData
    const { stkCallback } = Body

    if (stkCallback.ResultCode === 0) {
      // Payment successful
      const { CallbackMetadata } = stkCallback
      const metadata = CallbackMetadata.Item

      const amount = metadata.find((item: any) => item.Name === "Amount")?.Value
      const mpesaReceiptNumber = metadata.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value
      const transactionDate = metadata.find((item: any) => item.Name === "TransactionDate")?.Value
      const phoneNumber = metadata.find((item: any) => item.Name === "PhoneNumber")?.Value

      console.log("[v0] Payment successful:", {
        amount,
        mpesaReceiptNumber,
        transactionDate,
        phoneNumber,
      })

      // Here you would typically update your database with the payment details
      // For now, we'll just log the success
    } else {
      // Payment failed or cancelled
      console.log("[v0] Payment failed:", stkCallback.ResultDesc)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Callback processing error:", error)
    return NextResponse.json({ error: "Callback processing failed" }, { status: 500 })
  }
}
