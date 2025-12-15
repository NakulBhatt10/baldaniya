import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Copy, Check, Upload, AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, formatDate } from '@/utils/orderUtils';
import { useToast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrder, updateOrderPayment } = useCart();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const order = getOrder(orderId || '');

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The order you're looking for doesn't exist or may have been placed on a different device.
          </p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (order.status !== 'Created') {
    navigate(`/order/${orderId}`);
    return null;
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    toast({
      title: 'Order ID Copied',
      description: 'Paste this in GPay payment remarks.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentSubmit = () => {
    updateOrderPayment(order.id, {
      utr: utr || undefined,
      screenshot: screenshot || undefined,
      submittedAt: new Date().toISOString(),
    });

    toast({
      title: 'Payment Submitted!',
      description: 'We will verify and confirm on phone/WhatsApp.',
    });

    navigate(`/order/${order.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Order ID Banner */}
          <div className="card-wood p-6 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Your Order ID</p>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display text-2xl font-bold text-primary">
                {order.id}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyOrderId}
                className="shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Copy this ID and paste in GPay payment remarks
            </p>
          </div>

          {/* Amount */}
          <div className="card-wood p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-muted-foreground">Amount to Pay</span>
              <span className="font-display text-3xl font-bold text-foreground">
                {formatPrice(order.total)}
              </span>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div className="card-wood p-6 mb-6">
            <h2 className="font-display text-xl font-semibold text-center mb-4">
              Scan & Pay via GPay
            </h2>
            <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">QR Code</p>
                <p className="text-xs text-muted-foreground">(Placeholder)</p>
              </div>
            </div>
            <div className="text-center space-y-2 text-sm">
              <p className="font-semibold">Payment Instructions:</p>
              <ol className="text-left max-w-xs mx-auto text-muted-foreground space-y-1">
                <li>1. Open Google Pay on your phone</li>
                <li>2. Scan the QR code above</li>
                <li>3. Enter exact amount: <strong className="text-foreground">{formatPrice(order.total)}</strong></li>
                <li>4. In Note/Remarks, type: <strong className="text-foreground">{order.id}</strong></li>
                <li>5. Complete the payment</li>
              </ol>
            </div>
          </div>

          {/* Customer Details */}
          <div className="card-wood p-6 mb-6">
            <h3 className="font-display font-semibold mb-3">Delivery Details</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">{order.customer.name}</strong></p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div className="card-wood p-6 mb-6">
            <h2 className="font-display text-xl font-semibold mb-4">
              Payment Confirmation
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="utr">UTR / Transaction ID (Optional)</Label>
                <Input
                  id="utr"
                  placeholder="Enter UTR or Transaction ID"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Screenshot (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  {screenshot ? (
                    <div className="space-y-2">
                      <img
                        src={screenshot}
                        alt="Payment screenshot"
                        className="max-h-40 mx-auto rounded"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setScreenshot(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload screenshot
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              <Button
                onClick={handlePaymentSubmit}
                size="lg"
                className="w-full"
              >
                I've Paid
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg bg-highlight/10 border border-highlight/30 p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-highlight shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-1">Manual Payment Verification</p>
                <p className="text-muted-foreground">
                  We verify all payments manually. Orders will be shipped after payment verification. 
                  We will confirm your order on phone or WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Need help with payment?</p>
            <Button asChild variant="outline" className="gap-2">
              <a href="tel:9699721211">
                <Phone className="h-4 w-4" />
                Call 9699721211
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
