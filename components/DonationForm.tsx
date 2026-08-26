'use client';

import { useState } from 'react';
import {
  Utensils,
  HeartPulse,
  GraduationCap,
  Gift,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Building2,
  Sparkles,
  FileCheck,
  ShieldCheck,
  Heart,
  DollarSign,
  Globe,
  Mail,
  User,
  Phone,
  MapPin,
  MessageSquareQuote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  createPendingDonation,
  DonationCategoryType,
} from '@/app/actions/donation';
import { verifyPaymentAction } from '@/app/actions/sponsorship';
import { toast } from 'sonner';

type Step = 'category' | 'amount' | 'donor_info' | 'review' | 'pending_gateway' | 'confirmed';

interface CategoryOption {
  key: DonationCategoryType;
  title: string;
  subtitle: string;
  icon: typeof Utensils;
  color: string;
  badge: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    key: 'MEALS',
    title: 'Nutritious Meals',
    subtitle: 'Provide hot daily meals, emergency food supplies, and vital child nutrition.',
    icon: Utensils,
    color: 'from-orange-500 to-amber-500',
    badge: 'Immediate Hunger Relief',
  },
  {
    key: 'HEALTH',
    title: 'Healthcare & Wellness',
    subtitle: 'Fund medical consultations, prescriptions, vaccinations, and hygiene programs.',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-500',
    badge: 'Essential Medical Care',
  },
  {
    key: 'EDUCATION',
    title: 'Education & Schools',
    subtitle: 'Supply school uniforms, textbooks, exam fees, tuition, and learning tech.',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-500',
    badge: 'Future Empowering',
  },
  {
    key: 'LOVE_GIFT',
    title: 'Love Gift',
    subtitle: 'Send special encouragement, birthday celebrations, and family emergency relief.',
    icon: Gift,
    color: 'from-purple-500 to-violet-500',
    badge: 'Special Encouragement',
  },
];

const PRESET_AMOUNTS_USD = [25, 50, 100, 250, 500];
const PRESET_AMOUNTS_RWF = [25000, 50000, 100000, 250000, 500000];

export default function DonationForm() {
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<DonationCategoryType>('MEALS');
  const [currency, setCurrency] = useState<'USD' | 'RWF'>('USD');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');

  const [donor, setDonor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: 'Rwanda',
    address: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createdData, setCreatedData] = useState<{
    donationId: string;
    paymentId: string;
    reference: string;
    amount: number;
    currency: string;
    category: string;
  } | null>(null);

  const [verifiedData, setVerifiedData] = useState<{
    transactionId: string;
    reference: string;
    paidAt: string;
  } | null>(null);

  const activeCategory = CATEGORIES.find((c) => c.key === category) || CATEGORIES[0];
  const currentAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDonor((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donor.firstName.trim() || !donor.lastName.trim() || !donor.email.trim()) {
      toast.error('Please enter your name and email address.');
      return;
    }
    setStep('review');
  };

  const handleCreatePendingDonation = async () => {
    if (!currentAmount || isNaN(currentAmount) || currentAmount <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await createPendingDonation({
        category,
        amount: currentAmount,
        currency,
        donor,
      });

      if (!res.success || !res.donation || !res.payment) {
        toast.error(res.error || 'Failed to initiate donation.');
        return;
      }

      setCreatedData({
        donationId: res.donation.id,
        paymentId: res.payment.id,
        reference: res.payment.reference,
        amount: res.payment.amount,
        currency: res.payment.currency,
        category: res.donation.category,
      });

      toast.success('Donation initiated! Status: PENDING');
      setStep('pending_gateway');
    } catch (err: any) {
      toast.error(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatePaymentVerification = async () => {
    if (!createdData?.paymentId) return;

    try {
      setIsLoading(true);
      const res = await verifyPaymentAction(createdData.paymentId);

      if (!res.success || !res.payment) {
        toast.error(res.error || 'Failed to verify payment.');
        return;
      }

      setVerifiedData({
        transactionId: res.payment.transactionId || `TXN-${Date.now()}`,
        reference: res.payment.reference,
        paidAt: res.payment.paidAt || new Date().toISOString(),
      });

      toast.success('Payment verified! Donation is now COMPLETED.');
      setStep('confirmed');
    } catch (err: any) {
      toast.error(err.message || 'Simulation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDonation = () => {
    setStep('category');
    setCreatedData(null);
    setVerifiedData(null);
    setCustomAmount('');
    setAmount(50);
  };

  return (
    <section id="donation-workflow" className="py-16 bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-yellow-600 uppercase tracking-[0.25em] font-bold text-xs">
            Make a Tangible Difference
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mt-2 mb-4">
            Support Children & Families in Rwanda
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            Choose a focused cause, select your contribution, and help provide real nourishment, health, and education.
          </p>

          {/* Stepper Header */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              step === 'category' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}>
              <span>1. Purpose</span>
            </div>
            <div className="w-4 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              step === 'amount' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}>
              <span>2. Amount</span>
            </div>
            <div className="w-4 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              step === 'donor_info' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}>
              <span>3. Details</span>
            </div>
            <div className="w-4 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              step === 'review' || step === 'pending_gateway' || step === 'confirmed' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}>
              <span>4. Complete</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden">
          {/* STEP 1: CHOOSE DONATION PURPOSE */}
          {step === 'category' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  1. Select Donation Purpose
                </h3>
                <p className="text-sm text-gray-600">
                  Where would you like your gift to have the greatest immediate impact?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.key;
                  return (
                    <div
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-yellow-500 bg-yellow-50/40 shadow-md ring-2 ring-yellow-400/30'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-6 h-6 text-yellow-600" />
                          )}
                        </div>

                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                          {cat.badge}
                        </span>

                        <h4 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                          {cat.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <Button
                  onClick={() => setStep('amount')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  Next: Choose Amount
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE AMOUNT & CURRENCY */}
          {step === 'amount' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    2. Select Donation Amount
                  </h3>
                  <p className="text-sm text-gray-600">
                    Supporting: <span className="font-semibold text-yellow-700">{activeCategory.title}</span>
                  </p>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency('USD');
                      setAmount(50);
                      setCustomAmount('');
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      currency === 'USD'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrency('RWF');
                      setAmount(50000);
                      setCustomAmount('');
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      currency === 'RWF'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    RWF (Frw)
                  </button>
                </div>
              </div>

              {/* Preset Amounts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {(currency === 'USD' ? PRESET_AMOUNTS_USD : PRESET_AMOUNTS_RWF).map((val) => {
                  const isSelected = !customAmount && amount === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-4 px-3 rounded-2xl border-2 font-bold text-center transition cursor-pointer ${
                        isSelected
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-900 shadow-md ring-2 ring-yellow-400/20'
                          : 'border-gray-200 hover:border-gray-300 text-gray-800 bg-white'
                      }`}
                    >
                      <span className="text-xl">
                        {currency === 'USD' ? `$${val}` : `${val.toLocaleString()} Frw`}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <Label htmlFor="customAmount" className="text-xs font-semibold text-gray-700 mb-1.5 block">
                  Or enter a custom amount ({currency})
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                    {currency === 'USD' ? '$' : 'Frw'}
                  </span>
                  <Input
                    id="customAmount"
                    type="number"
                    min="1"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-12 py-6 rounded-xl text-lg font-bold bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('category')}
                  className="text-gray-600 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep('donor_info')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  Next: Donor Details
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: DONOR INFORMATION */}
          {step === 'donor_info' && (
            <form onSubmit={handleProceedToReview} className="p-6 sm:p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  3. Your Contact Information
                </h3>
                <p className="text-sm text-gray-600">
                  Please provide your details for donation receipting and records.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donFirstName" className="text-xs font-semibold text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="donFirstName"
                    name="firstName"
                    value={donor.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="donLastName" className="text-xs font-semibold text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="donLastName"
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
                  <Label htmlFor="donEmail" className="text-xs font-semibold text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="donEmail"
                    type="email"
                    name="email"
                    value={donor.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="donPhone" className="text-xs font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="donPhone"
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
                  <Label htmlFor="donCountry" className="text-xs font-semibold text-gray-700">
                    Country
                  </Label>
                  <Input
                    id="donCountry"
                    name="country"
                    value={donor.country}
                    onChange={handleInputChange}
                    placeholder="Rwanda"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="donAddress" className="text-xs font-semibold text-gray-700">
                    City / Address
                  </Label>
                  <Input
                    id="donAddress"
                    name="address"
                    value={donor.address}
                    onChange={handleInputChange}
                    placeholder="Kigali"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="donMessage" className="text-xs font-semibold text-gray-700">
                  Message of Encouragement (Optional)
                </Label>
                <Textarea
                  id="donMessage"
                  name="message"
                  value={donor.message}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Words of hope or prayer for the children..."
                  className="mt-1 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('amount')}
                  className="text-gray-600 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  Review Donation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: REVIEW DONATION */}
          {step === 'review' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  4. Review Your Donation
                </h3>
                <p className="text-sm text-gray-600">
                  Please verify your donation summary before submitting.
                </p>
              </div>

              {/* Review Box */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="text-sm text-gray-600">Selected Purpose</div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <span>{activeCategory.title}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="text-sm text-gray-600">Donor Name</div>
                  <div className="font-semibold text-gray-900">
                    {donor.firstName} {donor.lastName}
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="text-sm text-gray-600">Receipt Email</div>
                  <div className="font-semibold text-gray-900">{donor.email}</div>
                </div>

                {donor.message && (
                  <div className="pb-3 border-b border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Note:</div>
                    <p className="text-xs italic text-gray-700">&quot;{donor.message}&quot;</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="text-base font-bold text-gray-900">Total Donation</div>
                  <div className="text-3xl font-extrabold text-yellow-600">
                    {currency === 'USD' ? `$${currentAmount} USD` : `${currentAmount.toLocaleString()} RWF`}
                  </div>
                </div>
              </div>

              {/* Pending State Notice */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Submitting will create a <strong>PENDING</strong> donation and payment record. You will receive an immediate reference ID, and upon verification, the status will mark <strong>COMPLETED</strong>.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                  onClick={handleCreatePendingDonation}
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25 flex items-center gap-2"
                >
                  {isLoading ? 'Creating Record...' : 'Confirm & Proceed to Payment'}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: PENDING PAYMENT GATEWAY */}
          {step === 'pending_gateway' && createdData && (
            <div className="p-6 sm:p-10 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Status: Pending Payment
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Payment Gateway Integration Pending
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                  Your donation for <strong>{activeCategory.title}</strong> has been registered. Payment gateway integration will be connected shortly.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Payment Reference:</span>
                  <span className="font-mono font-bold text-gray-900">{createdData.reference}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Cause:</span>
                  <span className="font-semibold text-gray-900">{activeCategory.title}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Amount:</span>
                  <span className="font-bold text-yellow-600">
                    {createdData.currency === 'USD' ? `$${createdData.amount} USD` : `${createdData.amount.toLocaleString()} RWF`}
                  </span>
                </div>
              </div>

              {/* Simulation Action */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
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
                  onClick={resetDonation}
                  className="w-full text-gray-600 rounded-xl py-3 text-sm"
                >
                  Save as Pending & Return
                </Button>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMED / THANK-YOU CONFIRMATION */}
          {step === 'confirmed' && (
            <div className="p-6 sm:p-10 space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Status: Donation Completed
                </span>
                <h3 className="text-3xl font-extrabold text-gray-900">
                  Thank You for Your Generous Support!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                  Your donation to <strong>{activeCategory.title}</strong> has been successfully received and recorded.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm pb-2 border-b border-emerald-200">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Official Donation Receipt
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
                  <span>Target Purpose:</span>
                  <span className="font-bold text-gray-900">{activeCategory.title}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-emerald-700">
                    {currency === 'USD' ? `$${currentAmount} USD` : `${currentAmount.toLocaleString()} RWF`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Donor:</span>
                  <span className="font-medium text-gray-900">{donor.firstName} {donor.lastName} ({donor.email})</span>
                </div>
              </div>

              <div className="pt-2 max-w-md mx-auto">
                <Button
                  onClick={resetDonation}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-6 rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/25"
                >
                  Make Another Donation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}