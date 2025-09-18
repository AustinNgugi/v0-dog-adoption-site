"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, MapPin, User, Clock } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("mpesa") // Default to M-Pesa for Kenyan market
  const [isProcessing, setIsProcessing] = useState(false)
  const [mpesaPromptSent, setMpesaPromptSent] = useState(false)
  const [waitingForPayment, setWaitingForPayment] = useState(false)
  const [checkoutRequestId, setCheckoutRequestId] = useState("")
  const { clearCart, getTotalPrice } = useCart()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Customer Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Delivery Info
    address: "",
    city: "",
    notes: "",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    mpesaPhone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMpesaPayment = async () => {
    if (!formData.mpesaPhone) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-Pesa phone number first.",
        variant: "destructive",
      })
      return
    }

  let formattedPhone = formData.mpesaPhone.replace(/\s+/g, "") // Remove spaces and separators

  // Normalize to Daraja expected format: 2547XXXXXXXX (no plus)
  if (formattedPhone.startsWith("+")) formattedPhone = formattedPhone.substring(1)
  if (formattedPhone.startsWith("0")) formattedPhone = "254" + formattedPhone.substring(1)
  if (!formattedPhone.startsWith("254")) formattedPhone = "254" + formattedPhone

    setMpesaPromptSent(true)
    setWaitingForPayment(true)

    try {
  const subtotal = getTotalPrice()
  const total = subtotal + subtotal * 0.16 + (subtotal > 2000 ? 0 : 150)
      const orderId = `ORDER-${Date.now()}`

      const response = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: total,
          orderId: orderId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCheckoutRequestId(data.checkoutRequestId)

        toast({
          title: "M-Pesa Prompt Sent",
          description: `A payment request for KES ${total.toFixed(0)} has been sent to ${formattedPhone}. Please check your phone and enter your M-Pesa PIN.`,
        })

        // Poll for payment status
        pollPaymentStatus(data.checkoutRequestId)
      } else {
        throw new Error(data.error || "Failed to send M-Pesa prompt")
      }
    } catch (error) {
      console.error("M-Pesa payment error:", error)
      setMpesaPromptSent(false)
      setWaitingForPayment(false)

      toast({
        title: "Payment Failed",
        description: "Failed to send M-Pesa prompt. Please try again.",
        variant: "destructive",
      })
    }
  }

  const pollPaymentStatus = async (requestId: string) => {
    let attempts = 0
    const maxAttempts = 30 // Poll for 2 minutes (30 * 4 seconds)

    const poll = async () => {
      try {
        const response = await fetch("/api/mpesa/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkoutRequestId: requestId,
          }),
        })

        const data = await response.json()

        if (data.ResultCode === "0") {
          // Payment successful
          setWaitingForPayment(false)
          toast({
            title: "Payment Successful! 🎉",
            description: `M-Pesa payment completed successfully! Receipt: ${data.MpesaReceiptNumber || "N/A"}`,
          })
          return
        } else if (data.ResultCode && data.ResultCode !== "1032") {
          // Payment failed (1032 means still pending)
          setWaitingForPayment(false)
          setMpesaPromptSent(false)
          toast({
            title: "Payment Failed",
            description: data.ResultDesc || "M-Pesa payment was cancelled or failed.",
            variant: "destructive",
          })
          return
        }

        // Still pending, continue polling
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 4000) // Poll every 4 seconds
        } else {
          // Timeout
          setWaitingForPayment(false)
          toast({
            title: "Payment Timeout",
            description: "Payment verification timed out. Please try again or contact support.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Payment status check error:", error)
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 4000)
        }
      }
    }

    // Start polling after 5 seconds
    setTimeout(poll, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "mpesa" && !mpesaPromptSent) {
      handleMpesaPayment()
      return
    }

    if (paymentMethod === "mpesa" && waitingForPayment) {
      toast({
        title: "Payment Pending",
        description: "Please complete the M-Pesa payment on your phone first.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const total = getTotalPrice() + getTotalPrice() * 0.16 + (getTotalPrice() > 2000 ? 0 : 150)

    toast({
      title: "Order Confirmed! 🎉",
      description: `Your payment of KES ${total.toFixed(0)} has been processed successfully. You'll receive a confirmation email shortly.`,
    })

    clearCart()
    setIsProcessing(false)

    window.location.href = "/"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className="cafe-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card className="cafe-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              required
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special delivery instructions..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="cafe-card">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="mpesa" id="mpesa" />
              <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer flex-1">
                <Smartphone className="h-5 w-5" />
                M-Pesa
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5" />
                Credit/Debit Card
              </Label>
            </div>
          </RadioGroup>

          <Separator />

          {paymentMethod === "mpesa" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                <Input
                  id="mpesaPhone"
                  placeholder="+254712345678 or 0712345678"
                  required
                  value={formData.mpesaPhone}
                  onChange={(e) => handleInputChange("mpesaPhone", e.target.value)}
                  disabled={mpesaPromptSent}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your phone number (e.g., 0712345678 or +254712345678)
                </p>
              </div>

              {mpesaPromptSent && (
                <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">
                      {waitingForPayment ? "Waiting for Payment" : "Payment Completed"}
                    </span>
                  </div>

                  <div className="text-sm text-green-600">
                    <p>
                      ✓ Payment request sent to{" "}
                      {formData.mpesaPhone.startsWith("+254")
                        ? formData.mpesaPhone
                        : formData.mpesaPhone.startsWith("0")
                          ? "+254" + formData.mpesaPhone.substring(1)
                          : formData.mpesaPhone.startsWith("254")
                            ? "+" + formData.mpesaPhone
                            : "+254" + formData.mpesaPhone}
                    </p>
                    {waitingForPayment ? (
                      <>
                        <p>📱 Check your phone for the M-Pesa prompt</p>
                        <p>⏳ Enter your M-Pesa PIN on your phone to complete payment</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          <span>Waiting for payment confirmation...</span>
                        </div>
                        {checkoutRequestId && <p className="text-xs mt-2">Reference: {checkoutRequestId}</p>}
                      </>
                    ) : (
                      <p>✅ Payment confirmed! You can now complete your order.</p>
                    )}
                  </div>
                </div>
              )}

              {!mpesaPromptSent && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Click "Send M-Pesa Prompt" to receive a payment request on your phone.
                  </p>
                </div>
              )}
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  required
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    required
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="btn-order w-full h-12 text-base font-semibold sm:h-10 sm:text-sm"
            disabled={isProcessing || waitingForPayment}
          >
            {isProcessing
              ? "Processing..."
              : paymentMethod === "mpesa" && !mpesaPromptSent
                ? "Send M-Pesa Prompt"
                : waitingForPayment
                  ? "Waiting for M-Pesa Payment..."
                  : "Complete Order"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
