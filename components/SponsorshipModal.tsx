'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Heart,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CreditCard,
  Building2,
  Calendar,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileCheck,
} from 'lucide-react'
import {
  createPendingSponsorship,
  verifyPaymentAction,
  SponsorshipFrequencyType,
} from '@/app/actions/sponsorship'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface SponsorshipModalProps {
  isOpen: boolean
  onClose: () => void
  child: {
    id: string
    name: string
    age: number
    dream: string
    image: string
    summary: string
    isSponsored?: boolean
  }
}

type Step = 'frequency' | 'donor_info' | 'review' | 'pending_gateway' | 'confirmed'

export default function SponsorshipModal({
  isOpen,
  onClose,
  child,
}: SponsorshipModalProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('frequency')
  const [frequency, setFrequency] = useState<SponsorshipFrequencyType>('MONTHLY')
  const [donor, setDonor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: 'Rwanda',
    address: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [createdData, setCreatedData] = useState<{
    sponsorshipId: string
    paymentId: string
    reference: string
    amount: number
    currency: string
    frequency: string
  } | null>(null)

  const [verifiedData, setVerifiedData] = useState<{
    transactionId: string
    reference: string
    paidAt: string
  } | null>(null)

  const amount = frequency === 'YEARLY' ? 936 : 78

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDonor((prev) => ({ ...prev, [name]: value }))
  }

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!donor.firstName.trim() || !donor.lastName.trim() || !donor.email.trim()) {
      toast.error('Please complete all required fields.')
      return
    }
    setStep('review')
  }

  const handleCreatePendingSponsorship = async () => {
    try {
      setIsLoading(true)
      const res = await createPendingSponsorship({
        childId: child.id,
        donor,
        frequency,
      })

      if (!res.success || !res.sponsorship || !res.payment) {
        toast.error(res.error || 'Failed to create sponsorship.')
        return
      }

      setCreatedData({
        sponsorshipId: res.sponsorship.id,
        paymentId: res.payment.id,
        reference: res.payment.reference,
        amount: res.payment.amount,
        currency: res.payment.currency,
        frequency: res.sponsorship.frequency,
      })

      toast.success('Sponsorship initiated! Status: PENDING')
      setStep('pending_gateway')
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSimulatePaymentVerification = async () => {
    if (!createdData?.paymentId) return

    try {
      setIsLoading(true)
      const res = await verifyPaymentAction(createdData.paymentId)

      if (!res.success || !res.payment) {
        toast.error(res.error || 'Failed to verify payment.')
        return
      }

      setVerifiedData({
        transactionId: res.payment.transactionId || `TXN-${Date.now()}`,
        reference: res.payment.reference,
        paidAt: res.payment.paidAt || new Date().toISOString(),
      })

      toast.success(`Payment verified! ${child.name} is now actively sponsored.`)
      setStep('confirmed')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Payment simulation failed.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    onClose()
    // Reset state after slight delay
    setTimeout(() => {
      setStep('frequency')
      setCreatedData(null)
      setVerifiedData(null)
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 rounded-3xl bg-white border-0 shadow-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 text-white rounded-t-3xl relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-yellow-100 font-semibold">
                  Child Sponsorship
                </p>
                <h3 className="text-2xl font-bold">Sponsor {child.name}</h3>
              </div>
            </div>

            {/* Step indicator */}
            <div className="text-right text-xs bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full font-medium">
              {step === 'frequency' && 'Step 1 of 3'}
              {step === 'donor_info' && 'Step 2 of 3'}
              {step === 'review' && 'Step 3 of 3'}
              {step === 'pending_gateway' && 'Payment Pending'}
              {step === 'confirmed' && 'Active Sponsor'}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Child Mini Card (Steps 1, 2, 3) */}
          {step !== 'confirmed' && (
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-100 mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white">
                <Image
                  src={child.image || '/mentors_kids.jpg'}
                  alt={child.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-lg leading-tight">
                  {child.name}, {child.age} yrs
                </h4>
                <p className="text-sm text-amber-800 font-medium">
                  Dreams of becoming a {child.dream}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5" /> 1-to-1 Match
                </span>
              </div>
            </div>
          )}

          {/* STEP 1: CHOOSE FREQUENCY */}
          {step === 'frequency' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  Choose Your Sponsorship Plan
                </h4>
                <p className="text-sm text-gray-600">
                  Select a recurring schedule that works best for you. Both options provide comprehensive education, nutrition, and healthcare support.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Monthly Option */}
                <div
                  onClick={() => setFrequency('MONTHLY')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    frequency === 'MONTHLY'
                      ? 'border-yellow-500 bg-yellow-50/50 shadow-md ring-2 ring-yellow-400/30'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900 text-lg">Monthly</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                      Popular
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">
                    $78
                    <span className="text-sm font-normal text-gray-500"> / month</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Ongoing regular monthly contribution to support {child.name}&apos;s daily living and schooling.
                  </p>
                </div>

                {/* Yearly Option */}
                <div
                  onClick={() => setFrequency('YEARLY')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    frequency === 'YEARLY'
                      ? 'border-yellow-500 bg-yellow-50/50 shadow-md ring-2 ring-yellow-400/30'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900 text-lg">Yearly</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Full Year
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">
                    $936
                    <span className="text-sm font-normal text-gray-500"> / year</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Full 12-month sponsorship upfront ($78 × 12) securing full academic year stability.
                  </p>
                </div>
              </div>

              {/* What sponsorship includes */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h5 className="font-semibold text-sm text-gray-900 mb-2.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your sponsorship directly provides:
                </h5>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    School tuition, uniform, stationery, and exam fees
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Nutritious daily meals and clean drinking water
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Community healthcare, medical checkups, and hygiene support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Direct letter updates and academic progress reports
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setStep('donor_info')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  Continue to Donor Details
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DONOR INFORMATION */}
          {step === 'donor_info' && (
            <form onSubmit={handleProceedToReview} className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  Your Contact Information
                </h4>
                <p className="text-sm text-gray-600">
                  Please provide your details so we can send sponsorship updates and tax receipts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-xs font-semibold text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={donor.firstName}
                    onChange={handleInputChange}
                    placeholder="Jane"
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-xs font-semibold text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={donor.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={donor.email}
                    onChange={handleInputChange}
                    placeholder="jane.doe@example.com"
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-xs font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={donor.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+250 788 123 456"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-xs font-semibold text-gray-700">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={donor.country}
                    onChange={handleInputChange}
                    placeholder="Rwanda, United States, etc."
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-xs font-semibold text-gray-700">
                    Address / City
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={donor.address}
                    onChange={handleInputChange}
                    placeholder="Kigali, Rwanda"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('frequency')}
                  className="text-gray-600 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  Review Sponsorship
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: REVIEW SPONSORSHIP */}
          {step === 'review' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  Review Your Sponsorship
                </h4>
                <p className="text-sm text-gray-600">
                  Please review the details below before creating your sponsorship request.
                </p>
              </div>

              {/* Summary Breakdown */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-yellow-600" />
                    Sponsored Child
                  </div>
                  <div className="font-bold text-gray-900">{child.name}</div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    Frequency & Commitment
                  </div>
                  <div className="font-bold text-gray-900 capitalize">
                    {frequency.toLowerCase()} (${amount} USD)
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-yellow-600" />
                    Sponsor Name & Email
                  </div>
                  <div className="font-semibold text-gray-900 text-right">
                    {donor.firstName} {donor.lastName}
                    <div className="text-xs text-gray-500 font-normal">{donor.email}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div className="text-base font-bold text-gray-900">Total Due Today</div>
                  <div className="text-2xl font-extrabold text-yellow-600">
                    ${amount} USD
                  </div>
                </div>
              </div>

              {/* Note about workflow state */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Submitting will create a <strong>PENDING</strong> sponsorship and payment record. Once payment gateway verification is completed, {child.name}&apos;s profile will become <strong>ACTIVE</strong> and reserved exclusively for you.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('donor_info')}
                  className="text-gray-600 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleCreatePendingSponsorship}
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  {isLoading ? 'Creating Record...' : 'Confirm & Proceed to Payment'}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: PENDING PAYMENT GATEWAY (PLACEHOLDER & SIMULATION) */}
          {step === 'pending_gateway' && createdData && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Status: Pending Payment
                </span>
                <h4 className="text-2xl font-bold text-gray-900">
                  Payment Gateway Integration Pending
                </h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                  Your sponsorship order has been recorded in the database. The payment gateway integration is currently in progress.
                </p>
              </div>

              {/* Transaction Ref Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Payment Reference:</span>
                  <span className="font-mono font-bold text-gray-900">{createdData.reference}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Sponsorship Type:</span>
                  <span className="font-semibold text-gray-900">{createdData.frequency}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Amount:</span>
                  <span className="font-bold text-yellow-600">${createdData.amount} {createdData.currency}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Child:</span>
                  <span className="font-semibold text-gray-900">{child.name}</span>
                </div>
              </div>

              {/* Future Gateway Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-800 text-left flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Gateway Pipeline Ready</p>
                  <p>
                    When payment gateway (Stripe / Flutterwave / MTN MoMo) is activated, this step redirects securely to the checkout screen.
                  </p>
                </div>
              </div>

              {/* Simulation Action */}
              <div className="pt-2 space-y-3">
                <Button
                  onClick={handleSimulatePaymentVerification}
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl font-bold text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {isLoading ? 'Verifying...' : 'Simulate Payment Verification (Demo Mode)'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleModalClose}
                  className="w-full text-gray-600 rounded-xl py-3 text-sm"
                >
                  Close & Keep as Pending
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMED & ACTIVE SPONSORSHIP */}
          {step === 'confirmed' && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Status: Active Sponsorship
                </span>
                <h4 className="text-3xl font-extrabold text-gray-900">
                  Thank You for Sponsoring {child.name}!
                </h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                  Your sponsorship is now <strong>ACTIVE</strong>. You have officially made a life-changing difference for {child.name}.
                </p>
              </div>

              {/* Receipt Breakdown */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 text-left space-y-2.5 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm pb-2 border-b border-emerald-200">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Sponsorship Receipt & Confirmation
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Reference ID:</span>
                  <span className="font-mono font-bold text-gray-900">{verifiedData?.reference || createdData?.reference}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Transaction ID:</span>
                  <span className="font-mono font-semibold text-gray-800">{verifiedData?.transactionId}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Sponsored Child:</span>
                  <span className="font-bold text-gray-900">{child.name}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Plan:</span>
                  <span className="font-semibold text-gray-900">{frequency} (${amount} USD)</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Sponsor Email:</span>
                  <span className="font-medium text-gray-900">{donor.email}</span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs text-gray-700 text-left space-y-2">
                <p className="font-semibold text-gray-900">What happens next?</p>
                <p>1. You will receive a welcome packet and introduction letter from {child.name} via email.</p>
                <p>2. We will provide regular school term updates and milestones on {child.name}&apos;s journey to becoming a {child.dream}.</p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleModalClose}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25"
                >
                  Done & View Children
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
