import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/collections";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption: string;
  vacuumSealing: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedOption: string) => void;
  removeItem: (productId: string, selectedOption: string) => void;
  updateQuantity: (productId: string, selectedOption: string, quantity: number) => void;
  toggleVacuumSealing: (productId: string, selectedOption: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (product: Product, quantity: number, selectedOption: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === selectedOption
      );
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      
      return [...prev, { product, quantity, selectedOption, vacuumSealing: false }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, selectedOption: string) => {
    setItems((prev) => prev.filter(
      (item) => !(item.product.id === productId && item.selectedOption === selectedOption)
    ));
  };

  const updateQuantity = (productId: string, selectedOption: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, selectedOption);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedOption === selectedOption
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleVacuumSealing = (productId: string, selectedOption: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedOption === selectedOption
          ? { ...item, vacuumSealing: !item.vacuumSealing }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartTotal = items.reduce((sum, item) => {
    const itemPrice = item.product.price * item.quantity;
    const sealingPrice = item.vacuumSealing ? 1.5 * item.quantity : 0;
    return sum + itemPrice + sealingPrice;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleVacuumSealing,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
