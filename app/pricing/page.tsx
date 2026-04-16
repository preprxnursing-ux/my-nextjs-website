"use client";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    priceNum: 0,
    period: "forever",
    description: "Perfect for getting started and exploring the platform.",
    color: "border-slate-200",
    badge: null,
    ctaStyle: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    features: [
      { text: "30 NCLEX-RN practice questions", included: true },
      { text: "Timed, Tutor and Quick modes", included: true },
      { text: "Basic results and score tracking", included: true },
      { text: "Exam history (last 5 attempts)", included: true },
      { text: "Full rationale explanations", included: true },
      { text: "All question topics and subtopics", included: false },
      { text: "Unlimited question bank access", included: false },
      { text: "FNP and CCRN question sets", included: false },
      { text: "AI-powered study recommendations", included: false },
      { text: "Performance analytics dashboard", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29",
    priceNum: 29,
    period: "per month",
    description: "Everything you need to pass NCLEX on your first attempt.",
    color: "border-cyan-400",
    badge: "Most Popular",
    ctaStyle: "bg-cyan-500 hover:bg-cyan-400 text-white",
    features: [
      { text: "30 NCLEX-RN practice questions", included: true },
      { text: "Timed, Tutor and Quick modes", included: true },
      { text: "Basic results and score tracking", included: true },
      { text: "Exam history (last 5 attempts)", included: true },
      { text: "Full rationale explanations", included: true },
      { text: "All question topics and subtopics", included: true },
      { text: "Unlimited question bank access", included: true },
      { text: "FNP and CCRN question sets", included: true },
      { text: "AI-powered study recommendations", included: true },
      { text: "Performance analytics dashboard", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "educator",
    name: "Educator",
    price: "$99",
    priceNum: 99,
    period: "per month",
    description: "For nursing schools, cohorts, and institutional use.",
    color: "border-slate-200",
    badge: null,
    ctaStyle: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Up to 50 student accounts", included: true },
      { text: "Student progress dashboard", included: true },
      { text: "Custom question sets", included: true },
      { text: "Bulk enrollment management", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom branding options", included: false },
      { text: "API access", included: false },
      { text: "SLA guarantee", included: false },
      { text: "On-site training", included: false },
    ],
  },
];

export default function PricingPage() {
  const { addToCart } = useCart();

  function handleCTA(plan: typeof plans[0]) {
    if (plan.id === "free") {
      window.location.href = "/auth/signup";
      return;
    }
    addToCart({
      id: plan.id,
      name: plan.name + " Plan",
      price: plan.priceNum,
      period: plan.period,
      color: plan.id === "premium" ? "#0ea5e9" : "#8b5cf6",
    });
  }

  return (
    <main className="min-h-screen bg-[#f1f5f9]">
      {/* HERO */}
      <div className="bg-black text-white px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
          Simple Pricing
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Invest in your nursing career
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Start free. Upgrade when you are ready. Cancel any time. No hidden fees, no surprises.
        </p>
      </div>

      {/* PLANS */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 bg-white p-8 shadow-sm ${plan.color} ${plan.badge ? "shadow-cyan-100 shadow-lg" : ""}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 text-sm">/{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{plan.description}</p>
              </div>

              {/* CTA BUTTON */}
              <button
                onClick={() => handleCTA(plan)}
                className={`block w-full text-center font-semibold py-3 rounded-xl transition text-sm mb-6 cursor-pointer ${plan.ctaStyle}`}
              >
                {plan.id === "free" ? "Get Started Free" : `Add to Cart - ${plan.price}/mo`}
              </button>

              {/* FEATURES */}
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-sm ${feature.included ? "text-slate-700" : "text-slate-400"}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "Can I switch plans at any time?", a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately." },
              { q: "Is there a free trial for Premium?", a: "The Free plan gives you full access to 30 questions and all exam modes so you can experience the platform before upgrading." },
              { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards via Stripe, as well as M-Pesa for students in Kenya and East Africa." },
              { q: "What is your refund policy?", a: "If you are not satisfied within 7 days of upgrading we will issue a full refund, no questions asked." },
              { q: "Does Premium include FNP and CCRN questions?", a: "Yes. Premium subscribers get access to all current and future question sets including FNP, CCRN, and NCLEX-PN." },
              { q: "How is the Educator plan different?", a: "The Educator plan adds student management tools, bulk enrollment, progress tracking across accounts, and a dedicated support manager." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 bg-black rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to pass NCLEX?</h2>
          <p className="text-slate-400 mb-6">Join thousands of nursing students who trust Pre-NCLEX Nursing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-xl transition">
              Start for free
            </Link>
            <Link href="/quiz/select" className="border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition">
              Try a practice exam
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}