import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '@shopify/hydrogen-react';

export function ShopifyCartIdentitySync() {
  const { user } = useAuth();
  const { cartAttributesUpdate, id } = useCart();

  useEffect(() => {
    // Only update if we have a valid cart ID, a logged-in user with an email,
    // and cartAttributesUpdate is available from Shopify
    if (id && user && user.email && cartAttributesUpdate) {
      console.log('Syncing Firebase User to Shopify Cart Identity...', user.email);

      try {
        cartAttributesUpdate([
          { key: 'email', value: user.email },
          ...(user.phoneNumber ? [{ key: 'phone', value: user.phoneNumber }] : [])
        ]);
      } catch (err) {
        console.error("Failed to sync Shopify cart attributes:", err);
      }
    }
  }, [id, user, cartAttributesUpdate]);

  return null; // This is a headless component
}
