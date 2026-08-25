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
      try {
        cartAttributesUpdate([
          { key: 'email', value: user.email },
          ...(user.phoneNumber ? [{ key: 'phone', value: user.phoneNumber }] : [])
        ]);
      } catch {
        // Silent fail — cart attributes sync is not critical
      }
    }
  }, [id, user, cartAttributesUpdate]);

  return null; // This is a headless component
}
