
import React, { createContext, useContext, useState } from 'react';

export type SubscriptionPlan = 'free' | 'basic' | 'pro';

interface SubscriptionContextType {
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;
  hasAccess: (feature: 'interview-report' | 'resume-report') => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<SubscriptionPlan>('free');

  const hasAccess = (feature: 'interview-report' | 'resume-report') => {
    if (plan === 'pro') return true;
    if (plan === 'basic') return true;
    return false; // free plan has no access to reports
  };

  return (
    <SubscriptionContext.Provider value={{ plan, setPlan, hasAccess }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
