/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, Smartphone, ShieldCheck, Lock, Landmark, CheckCircle, RefreshCw } from 'lucide-react';

interface PaymentStepProps {
  totalFare: number;
  onPaymentSuccess: (paymentMethod: string) => void;
  onBack: () => void;
}

export default function PaymentStep({ totalFare, onPaymentSuccess, onBack }: PaymentStepProps) {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbank'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [bankName, setBankName] = useState('SBI');

  // Loading / processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (method === 'upi' && !upiId.trim().includes('@')) {
      alert('Please enter a valid UPI ID (e.g., user@okhdfcbank)');
      return;
    }
    if (method === 'card') {
      if (cardNumber.replace(/\s+/g, '').length < 16) {
        alert('Please enter a 16-digit Card Number');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        alert('Please fill out card expiry and CVV');
        return;
      }
    }

    // Start simulation
    setIsProcessing(true);
    setProcessingStep('Initiating secure gateway transaction...');

    setTimeout(() => {
      setProcessingStep('Authenticating with RailSanctuary partner banks...');
    }, 1000);

    setTimeout(() => {
      setProcessingStep('Securing seat reservations on Indian Railways server...');
    }, 2200);

    setTimeout(() => {
      setProcessingStep('Generating digital ticket and confirmation QR code...');
    }, 3400);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(method === 'upi' ? 'UPI' : method === 'card' ? 'Credit Card' : 'Net Banking');
    }, 4500);
  };

  if (isProcessing) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-none p-8 md:p-12 border border-black/5 custom-shadow text-center space-y-8 animate-pulse">
        <div className="flex flex-col items-center justify-center">
          {/* Soothing spinning radial */}
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute inset-0 rounded-none border-4 border-primary/10 animate-ping"></div>
            <div className="w-16 h-16 rounded-none border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent animate-spin"></div>
            <Lock className="w-6 h-6 text-primary absolute" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary block">Secure Network Connection</span>
          <h3 className="font-serif text-3xl font-bold text-on-background">Processing Payment</h3>
          <p className="font-serif italic text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Please do not close this window or hit the back button. We are finishing your booking.
          </p>
        </div>

        {/* Dynamic status stepper */}
        <div className="bg-[#FDFCFB] p-4 rounded-none border border-black/5 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 text-primary animate-spin" />
          <span className="font-sans text-[10px] font-bold text-primary tracking-widest uppercase">
            {processingStep}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-bold text-secondary bg-[#E8E6E1]/30 border border-black/5 px-4 py-2 rounded-none w-max mx-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>PCI-DSS Compliant 256-Bit Encryption</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-none p-6 md:p-8 border border-black/5 custom-shadow animate-fade-in">
      <div className="flex justify-between items-baseline pb-6 border-b border-black/5 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-primary mb-1.5 block">Reservation Payment</span>
          <h2 className="font-serif text-3xl font-bold text-on-background">Secure Payment</h2>
          <p className="text-on-surface-variant/80 font-serif text-sm italic mt-1">
            Choose your preferred method to complete your booking.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mb-1">Payable Amount</span>
          <span className="font-serif text-3xl font-bold text-primary">₹{totalFare.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handlePay} className="space-y-6">
        {/* Payment Tabs Selection */}
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setMethod('upi')}
            className={`flex flex-col items-center justify-center p-4 rounded-none border transition-all cursor-pointer ${
              method === 'upi'
                ? 'bg-[#FDFCFB] border-primary text-primary font-bold shadow-2xs'
                : 'bg-[#E8E6E1]/20 border-black/10 text-on-surface-variant hover:bg-[#E8E6E1]/40'
            }`}
          >
            <Smartphone className="w-5 h-5 mb-2 text-primary" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">UPI / GPay</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`flex flex-col items-center justify-center p-4 rounded-none border transition-all cursor-pointer ${
              method === 'card'
                ? 'bg-[#FDFCFB] border-primary text-primary font-bold shadow-2xs'
                : 'bg-[#E8E6E1]/20 border-black/10 text-on-surface-variant hover:bg-[#E8E6E1]/40'
            }`}
          >
            <CreditCard className="w-5 h-5 mb-2 text-primary" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Credit/Debit</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod('netbank')}
            className={`flex flex-col items-center justify-center p-4 rounded-none border transition-all cursor-pointer ${
              method === 'netbank'
                ? 'bg-[#FDFCFB] border-primary text-primary font-bold shadow-2xs'
                : 'bg-[#E8E6E1]/20 border-black/10 text-on-surface-variant hover:bg-[#E8E6E1]/40'
            }`}
          >
            <Landmark className="w-5 h-5 mb-2 text-primary" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Net Banking</span>
          </button>
        </div>

        {/* Dynamic Payment Method Forms */}
        <div className="bg-[#FDFCFB]/60 p-6 rounded-none border border-black/5 min-h-[160px] flex flex-col justify-center">
          {method === 'upi' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Virtual Payment Address (VPA / UPI ID)</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. rahul@okaxis"
                    className="w-full bg-white border border-black/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-none p-3.5 text-sm outline-none transition-all font-medium"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/80 font-serif italic mt-3 leading-relaxed">
                  Enter your GPay, PhonePe, Bhim, or Paytm UPI ID. You will receive a secure collect request notification on your UPI app to complete payment.
                </p>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map(suffix => (
                  <button
                    key={suffix}
                    type="button"
                    onClick={() => setUpiId(`sharma${suffix}`)}
                    className="bg-white hover:bg-primary/5 border border-black/10 px-3 py-1 rounded-none text-[9px] uppercase tracking-widest font-bold text-primary cursor-pointer transition-colors"
                  >
                    sharma{suffix}
                  </button>
                ))}
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full bg-white border border-black/10 focus:border-primary rounded-none p-3 text-sm outline-none transition-all font-medium mb-4"
                />

                <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Card Number</label>
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    // Simple formatting: 4 digits with spaces
                    const raw = e.target.value.replace(/\s+/g, '');
                    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
                    setCardNumber(formatted);
                  }}
                  placeholder="4321 8765 0912 3456"
                  className="w-full bg-white border border-black/10 focus:border-primary rounded-none p-3 text-sm outline-none transition-all font-medium mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Expiry Date</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val.length === 2 && !val.includes('/')) val += '/';
                        setCardExpiry(val);
                      }}
                      placeholder="MM/YY"
                      className="w-full bg-white border border-black/10 focus:border-primary rounded-none p-3 text-sm outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">CVV / Security Code</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="***"
                      className="w-full bg-white border border-black/10 focus:border-primary rounded-none p-3 text-sm outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {method === 'netbank' && (
            <div className="space-y-4">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Select your Bank</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-white border border-black/10 focus:border-primary rounded-none p-3 text-sm outline-none transition-all font-semibold cursor-pointer"
              >
                <option value="SBI">State Bank of India (SBI)</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="AXIS">Axis Bank</option>
                <option value="KOTAK">Kotak Mahindra Bank</option>
              </select>
              <p className="text-[11px] text-on-surface-variant/80 font-serif italic mt-3 leading-relaxed">
                We will redirect you safely to your bank's secure page to authorise this netbanking fund transfer of ₹{totalFare.toFixed(2)}.
              </p>
            </div>
          )}
        </div>

        {/* Security / Assured stamp */}
        <div className="flex items-start gap-3 text-xs text-on-surface-variant bg-[#FDFCFB] p-4 rounded-none border border-black/5 font-medium leading-relaxed">
          <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span>Your payment is secured with state-of-the-art tokenized architecture. Your details are never saved.</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-black/5">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#E8E6E1]/40 hover:bg-[#E8E6E1]/80 border border-black/10 text-[#1A1A1A] py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white py-3.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            Pay ₹{totalFare.toFixed(2)}
          </button>
        </div>
      </form>
    </div>
  );
}
