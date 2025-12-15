import { Link } from 'react-router-dom';
import { CreditCard, Smartphone, QrCode, FileText, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const steps = [
  {
    icon: FileText,
    title: 'Add Products & Checkout',
    description: 'Browse our collection, add items to cart, and fill in your delivery details.',
  },
  {
    icon: CreditCard,
    title: 'Get Your Order ID',
    description: 'After checkout, you\'ll receive a unique Order ID. Keep this safe!',
  },
  {
    icon: Smartphone,
    title: 'Open Google Pay',
    description: 'Open GPay app on your phone and go to "Scan & Pay" option.',
  },
  {
    icon: QrCode,
    title: 'Scan QR Code',
    description: 'Scan the QR code shown on our payment page.',
  },
  {
    icon: CreditCard,
    title: 'Enter Amount & Order ID',
    description: 'Enter the exact amount shown. In Note/Remarks, paste your Order ID.',
  },
  {
    icon: FileText,
    title: 'Confirm Payment',
    description: 'After payment, click "I\'ve Paid" button. Optionally add UTR/screenshot.',
  },
];

const faqs = [
  {
    question: 'Why do I need to manually pay via QR code?',
    answer: 'We use QR code payments to keep our prices low by avoiding payment gateway fees. This also allows us to serve customers across India with any UPI app.',
  },
  {
    question: 'What is an Order ID and why is it important?',
    answer: 'Your Order ID (like BALD-20240115-1234) is a unique identifier for your order. You MUST include it in the payment remarks so we can match your payment to your order.',
  },
  {
    question: 'How long does payment verification take?',
    answer: 'We typically verify payments within 2-4 hours during business hours (10 AM - 7 PM IST). We\'ll call or WhatsApp you to confirm.',
  },
  {
    question: 'What if I forget to add Order ID in remarks?',
    answer: 'Don\'t worry! Upload your payment screenshot or share the UTR number on the payment confirmation page. You can also call us with these details.',
  },
  {
    question: 'Can I pay using other UPI apps?',
    answer: 'Yes! While we show GPay, you can use any UPI app (PhonePe, Paytm, BHIM, etc.) that supports QR code scanning.',
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes, UPI payments are secure and processed by your bank. We never have access to your bank details or UPI PIN.',
  },
  {
    question: 'What if my payment fails?',
    answer: 'If your payment fails, the amount will be auto-refunded to your bank within 2-3 business days. You can retry the payment.',
  },
  {
    question: 'When will my order be shipped?',
    answer: 'Orders are shipped within 24-48 hours after payment verification. You\'ll receive tracking details via SMS/WhatsApp.',
  },
];

export default function HowToPayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary via-background to-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              How to Pay
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple QR code payment via Google Pay, PhonePe, or any UPI app. 
              Follow these easy steps to complete your order.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
              Payment Steps
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="card-wood p-6 relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-12 bg-highlight/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <HelpCircle className="h-12 w-12 text-highlight mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-4">Important Notes</h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-highlight mt-2 shrink-0" />
                  Always enter the <strong className="text-foreground">exact amount</strong> shown on the payment page.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-highlight mt-2 shrink-0" />
                  <strong className="text-foreground">Must include Order ID</strong> in payment remarks/note for quick verification.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-highlight mt-2 shrink-0" />
                  Payment verification is manual. We'll call/WhatsApp to confirm your order.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-highlight mt-2 shrink-0" />
                  Orders ship <strong className="text-foreground">after payment verification</strong>, not immediately after payment.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="card-wood px-6 border-none"
                  >
                    <AccordionTrigger className="hover:no-underline text-left">
                      <span className="font-display font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Browse our collection of premium MDF 3D wooden puzzles and place your order today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:9699721211">
                  <Phone className="h-5 w-5 mr-2" />
                  Call for Help
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
