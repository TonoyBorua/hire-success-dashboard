
import React from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import SubscriptionModal from './SubscriptionModal';

interface ProtectedPageProps {
  children: React.ReactNode;
  feature: 'interview-report' | 'resume-report';
}

const ProtectedPage = ({ children, feature }: ProtectedPageProps) => {
  const { hasAccess } = useSubscription();

  if (!hasAccess(feature)) {
    return (
      <div className="relative">
        <div className="blur-lg pointer-events-none select-none">
          {children}
        </div>
        <SubscriptionModal />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedPage;
