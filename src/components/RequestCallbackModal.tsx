import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, CheckCircle } from 'lucide-react';

const callbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'),
  product: z.string().optional(),
});

type CallbackForm = z.infer<typeof callbackSchema>;

interface RequestCallbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

export default function RequestCallbackModal({
  open,
  onOpenChange,
  productName,
}: RequestCallbackModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallbackForm>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      product: productName || '',
    },
  });

  const onSubmit = async (data: CallbackForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log('Callback request:', data);
    setIsSubmitted(true);
    
    toast({
      title: 'Callback Requested!',
      description: 'We will call you shortly on ' + data.phone,
    });

    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Request Received!</h3>
            <p className="text-muted-foreground">We will call you shortly.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Request a Callback</DialogTitle>
              <DialogDescription>
                Fill in your details and we'll call you back within 30 minutes during business hours.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  {...register('name')}
                  className="bg-muted/50"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="10-digit mobile number"
                    {...register('phone')}
                    className="pl-10 bg-muted/50"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product (Optional)</Label>
                <Input
                  id="product"
                  placeholder="Which product are you interested in?"
                  {...register('product')}
                  className="bg-muted/50"
                  defaultValue={productName}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Callback'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
