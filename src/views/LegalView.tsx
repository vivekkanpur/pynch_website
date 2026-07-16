import React, { useEffect } from 'react';
import { motion } from 'motion/react';

type LegalPageType = 'returns' | 'refunds' | 'privacy' | 'terms';

interface LegalViewProps {
  type: LegalPageType;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

export default function LegalView({ type }: LegalViewProps) {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const content = {
    returns: {
      title: "Returns & Exchanges",
      body: (
        <div className="space-y-6">
          <p>At PYNCH, we take immense pride in the quality of our craftsmanship. If you are not entirely satisfied with your purchase, we are here to help.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Hygiene Exceptions (Strict Policy)</h3>
          <p>Due to the intimate nature of our products and strict health and hygiene regulations, <strong>we do not accept returns or exchanges on panties, thongs, or bodysuits</strong> under any circumstances. Please consult our Sizing & Sensation guide carefully before placing an order.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Returns for Bras & Bralettes</h3>
          <p>We accept returns or exchanges for bras and bralettes within <strong>14 days of delivery</strong>. To be eligible for a return, the item must be:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Unworn, unwashed, and in its original, pristine condition.</li>
            <li>In the original packaging with all tags still attached.</li>
            <li>Free of any marks, makeup, lotions, or odors.</li>
          </ul>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">How to Initiate a Return</h3>
          <p>To initiate a return or exchange, please email <strong>hello@pynch.com</strong> with your Order Number and the reason for the return. Our team will guide you through the process and provide a return shipping address.</p>
          <p>Please note that the customer is responsible for return shipping costs unless the item received was defective or incorrect.</p>
        </div>
      )
    },
    refunds: {
      title: "Refund Policy",
      body: (
        <div className="space-y-6">
          <p>Our goal is to ensure a smooth and transparent refund process for all eligible returns.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Refund Processing</h3>
          <p>Once we receive your returned item, our Quality Assurance team will inspect it within 2-3 business days. If the return is approved, a refund will be initiated immediately.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prepaid Orders:</strong> The refund will be credited back to your original method of payment (Credit Card, UPI, Net Banking) within 5-7 business days, depending on your bank's processing time.</li>
            <li><strong>Cash on Delivery (COD) Orders:</strong> Refunds for COD orders will be issued either as Store Credit or via Bank Transfer. Our team will reach out to collect your bank details once the return is approved.</li>
          </ul>

          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Late or Missing Refunds</h3>
          <p>If you haven’t received a refund within 7 business days of approval, first check your bank account again. Then contact your credit card company or bank, as it may take some time before your refund is officially posted. If you have done all of this and still have not received your refund, please contact us at <strong>hello@pynch.com</strong>.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Cancellations</h3>
          <p>Orders can only be cancelled before they are dispatched from our fulfillment center. Once an order is handed over to our shipping partner, it cannot be cancelled and must go through the standard return process.</p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-6">
          <p>At PYNCH, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Data We Collect</h3>
          <p>We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identity Data:</strong> First name, last name.</li>
            <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
            <li><strong>Financial Data:</strong> Payment card details are processed securely via our payment gateways (Razorpay/Cashfree) and are never stored on our servers.</li>
            <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>

          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">How We Use Your Data</h3>
          <p>We will only use your personal data for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and deliver your order, including managing payments, fees, and charges.</li>
            <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
            <li>To deliver relevant website content and advertisements to you.</li>
          </ul>

          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Discreet Packaging & Privacy</h3>
          <p>Because we sell intimate apparel, we take your physical privacy just as seriously as your digital privacy. All orders are shipped in unbranded, opaque packaging with no visible indicators of the contents inside. The sender name will simply read "Fulfillment Center".</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Third-Party Sharing</h3>
          <p>We may share your data with trusted third parties exclusively for the purpose of fulfilling your order (e.g., shipping partners like Shiprocket, Delhivery, and payment gateways). We do not sell or rent your data to external marketers.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-6">
          <p>Welcome to PYNCH. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">General Conditions</h3>
          <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Products & Pricing</h3>
          <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
          
          <h3 className="text-sm font-medium text-[#111111] uppercase tracking-widest pt-4">Accuracy of Billing and Account Information</h3>
          <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
        </div>
      )
    }
  };

  const activeContent = content[type];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="max-w-[800px] mx-auto px-4 sm:px-8 py-20 sm:py-32 min-h-screen"
    >
      <div className="space-y-12 font-sans font-light text-gray-700 leading-relaxed text-sm">
        <div className="text-center space-y-4 mb-16 border-b border-gray-200 pb-12">
          <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-wide uppercase text-[#111111]">
            {activeContent.title}
          </h1>
          <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-gray-400">
            Updated: October 2024
          </p>
        </div>
        
        {activeContent.body}
      </div>
    </motion.div>
  );
}
