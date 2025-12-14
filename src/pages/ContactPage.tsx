import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RequestCallbackModal from '@/components/RequestCallbackModal';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Contact form:', data);
    setIsSubmitted(true);
    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you soon.',
    });
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary via-background to-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message or give us a call.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <a
                        href="tel:08048606609"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        08048606609
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Location</h3>
                      <p className="text-muted-foreground">Thane, Maharashtra, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">info@baldaniya.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground">Mon - Sat: 10 AM - 7 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">GST Number</p>
                  <p className="font-mono text-foreground">27ALKPB5328B1ZI</p>
                </div>

                <Button
                  className="mt-6 w-full gap-2"
                  size="lg"
                  onClick={() => setIsCallbackOpen(true)}
                >
                  <Phone className="h-5 w-5" />
                  Request a Callback
                </Button>
              </div>

              {/* Contact Form */}
              <div className="card-wood p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            {...register('name')}
                            className="bg-muted/50"
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            placeholder="10-digit number"
                            {...register('phone')}
                            className="bg-muted/50"
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register('email')}
                          className="bg-muted/50"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          {...register('subject')}
                          className="bg-muted/50"
                        />
                        {errors.subject && (
                          <p className="text-sm text-destructive">{errors.subject.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          {...register('message')}
                          className="bg-muted/50 resize-none"
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                      </div>

                      <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <RequestCallbackModal open={isCallbackOpen} onOpenChange={setIsCallbackOpen} />
    </div>
  );
}
