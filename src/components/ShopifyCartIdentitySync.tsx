import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '@shopify/hydrogen-react';

export function ShopifyCartIdentitySync() {
  const { user } = useAuth();
  const { cartBuyerIdentityUpdate, id } = useCart();

  useEffect(() => {
    // Only update if we have a valid cart ID, a logged-in user with an email, 
    // and cartBuyerIdentityUpdate is available from Shopify
    if (id && user && user.email && cartBuyerIdentityUpdate) {
      console.log('Syncing Firebase User to Shopify Cart Identity...', user.email);
      
      cartBuyerIdentityUpdate({
        buyerIdentity: {
          email: user.email,
          phone: user.phoneNumber || undefined,
        }
      }).catch(err => console.error("Failed to sync Shopify identity:", err));
    }
  }, [id, user, cartBuyerIdentityUpdate]);

  return null; // This is a headless component
}
