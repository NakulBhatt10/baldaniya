import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  status: 'Created' | 'Payment Submitted' | 'Verified' | 'Shipped' | 'Delivered';
  createdAt: string;
  paymentDetails?: {
    utr?: string;
    screenshot?: string;
    submittedAt?: string;
  };
}

interface CartState {
  items: CartItem[];
  orders: Order[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; order: Order }
  | { type: 'UPDATE_ORDER_STATUS'; orderId: string; status: Order['status'] }
  | { type: 'UPDATE_ORDER_PAYMENT'; orderId: string; paymentDetails: Order['paymentDetails'] }
  | { type: 'LOAD_STATE'; state: CartState };

const initialState: CartState = {
  items: [],
  orders: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.orderId
            ? { ...order, status: action.status }
            : order
        ),
      };
    case 'UPDATE_ORDER_PAYMENT':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.orderId
            ? { ...order, paymentDetails: action.paymentDetails, status: 'Payment Submitted' }
            : order
        ),
      };
    case 'LOAD_STATE':
      return action.state;
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderPayment: (orderId: string, paymentDetails: Order['paymentDetails']) => void;
  getOrder: (orderId: string) => Order | undefined;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('baldaniya-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', state: parsed });
      } catch (e) {
        console.error('Failed to load cart state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('baldaniya-cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addOrder = (order: Order) => {
    dispatch({ type: 'ADD_ORDER', order });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', orderId, status });
  };

  const updateOrderPayment = (orderId: string, paymentDetails: Order['paymentDetails']) => {
    dispatch({ type: 'UPDATE_ORDER_PAYMENT', orderId, paymentDetails });
  };

  const getOrder = (orderId: string) => {
    return state.orders.find(order => order.id === orderId);
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        orders: state.orders,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        addOrder,
        updateOrderStatus,
        updateOrderPayment,
        getOrder,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
