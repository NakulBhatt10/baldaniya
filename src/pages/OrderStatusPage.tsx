import { useParams, Link } from 'react-router-dom';
import { Copy, Check, Phone, Package, Truck, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, formatDate } from '@/utils/orderUtils';
import { useToast } from '@/hooks/use-toast';

const statusSteps = [
  { key: 'Created', label: 'Order Created', icon: Package },
  { key: 'Payment Submitted', label: 'Payment Submitted', icon: CreditCard },
  { key: 'Verified', label: 'Payment Verified', icon: CheckCircle },
  { key: 'Shipped', label: 'Shipped', icon: Truck },
  { key: 'Delivered', label: 'Delivered', icon: CheckCircle },
];

export default function OrderStatusPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useCart();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const order = getOrder(orderId || '');

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The order you're looking for doesn't exist or may have been placed on a different device.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            If you placed this order on another device, please contact support with your Order ID.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="tel:9699721211">
                <Phone className="h-4 w-4" />
                Contact Support
              </a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    toast({
      title: 'Order ID Copied',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStepIndex = statusSteps.findIndex((step) => step.key === order.status);

  const statusColors = {
    Created: 'bg-muted text-muted-foreground',
    'Payment Submitted': 'bg-highlight/20 text-highlight-foreground',
    Verified: 'bg-accent/20 text-accent',
    Shipped: 'bg-warm/20 text-warm-foreground',
    Delivered: 'bg-accent text-accent-foreground',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Order Header */}
          <div className="card-wood p-6 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Order ID</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="font-display text-2xl font-bold text-primary">
                {order.id}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyOrderId}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Badge className={statusColors[order.status]}>
              {order.status}
            </Badge>
            <p className="text-sm text-muted-foreground mt-3">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          {/* Status Timeline */}
          <div className="card-wood p-6 mb-6">
            <h2 className="font-display text-xl font-semibold mb-6">Order Status</h2>
            <div className="relative">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground'
                        } ${isCurrent ? 'ring-4 ring-accent/30' : ''}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-10 w-0.5 h-6 -translate-x-1/2 ${
                            index < currentStepIndex ? 'bg-accent' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <p
                        className={`font-medium ${
                          isCompleted ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCurrent && order.status === 'Payment Submitted' && (
                        <p className="text-sm text-muted-foreground mt-1">
                          We are verifying your payment. You'll receive a call soon.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details */}
          <div className="card-wood p-6 mb-6">
            <h3 className="font-display font-semibold mb-4">Order Details</h3>
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="card-wood p-6 mb-6">
            <h3 className="font-display font-semibold mb-3">Delivery Address</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">{order.customer.name}</strong></p>
              <p>{order.customer.phone}</p>
              {order.customer.email && <p>{order.customer.email}</p>}
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
            </div>
          </div>

          {/* Payment Info */}
          {order.paymentDetails && (
            <div className="card-wood p-6 mb-6">
              <h3 className="font-display font-semibold mb-3">Payment Details</h3>
              <div className="text-sm space-y-2">
                {order.paymentDetails.submittedAt && (
                  <p className="text-muted-foreground">
                    Submitted: {formatDate(order.paymentDetails.submittedAt)}
                  </p>
                )}
                {order.paymentDetails.utr && (
                  <p className="text-muted-foreground">
                    UTR: <span className="text-foreground font-mono">{order.paymentDetails.utr}</span>
                  </p>
                )}
                {order.paymentDetails.screenshot && (
                  <div>
                    <p className="text-muted-foreground mb-2">Screenshot:</p>
                    <img
                      src={order.paymentDetails.screenshot}
                      alt="Payment screenshot"
                      className="max-h-40 rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Note */}
          <div className="rounded-lg bg-muted/50 p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Order data is stored locally on this device. 
              If you change devices, contact support with your Order ID.
            </p>
          </div>

          {/* Help */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Questions about your order?</p>
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
