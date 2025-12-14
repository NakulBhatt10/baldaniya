import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Truck, Clock, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart, Order } from '@/contexts/CartContext';
import { formatPrice, formatDate } from '@/utils/orderUtils';
import { useToast } from '@/hooks/use-toast';

const statusOptions: Order['status'][] = ['Created', 'Payment Submitted', 'Verified', 'Shipped', 'Delivered'];

export default function AdminDemoPage() {
  const { orders, updateOrderStatus } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: 'Status Updated',
      description: `Order ${orderId} is now "${newStatus}"`,
    });
  };

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
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Admin Demo
            </h1>
            <Badge variant="secondary">Local Only</Badge>
          </div>
          <p className="text-muted-foreground">
            Manage orders stored in localStorage. This is for demonstration purposes only.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by Order ID, name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-card">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statusOptions.map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            return (
              <div key={status} className="card-wood p-4 text-center">
                <p className="text-2xl font-display font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">{status}</p>
              </div>
            );
          })}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No Orders Found</h2>
            <p className="text-muted-foreground mb-6">
              {orders.length === 0
                ? 'No orders have been placed yet.'
                : 'No orders match your search criteria.'}
            </p>
            <Button asChild>
              <Link to="/shop">Create Test Order</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="card-wood p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        to={`/order/${order.id}`}
                        className="font-display font-bold text-lg text-primary hover:underline"
                      >
                        {order.id}
                      </Link>
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value as Order['status'])
                      }
                    >
                      <SelectTrigger className="w-48 bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Customer</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="text-foreground font-medium">{order.customer.name}</p>
                      <p>{order.customer.phone}</p>
                      {order.customer.email && <p>{order.customer.email}</p>}
                      <p>{order.customer.address}</p>
                      <p>
                        {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                {order.paymentDetails && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm mb-2">Payment Details</h4>
                    <div className="text-sm text-muted-foreground">
                      {order.paymentDetails.submittedAt && (
                        <p>Submitted: {formatDate(order.paymentDetails.submittedAt)}</p>
                      )}
                      {order.paymentDetails.utr && (
                        <p>
                          UTR: <span className="font-mono text-foreground">{order.paymentDetails.utr}</span>
                        </p>
                      )}
                      {order.paymentDetails.screenshot && (
                        <div className="mt-2">
                          <img
                            src={order.paymentDetails.screenshot}
                            alt="Payment screenshot"
                            className="max-h-32 rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
