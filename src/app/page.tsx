'use client';

import { useAuthStore } from '@/features/auth/utils/store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/auth/sign-in');
    } else {
      redirect('/dashboard/overview');
    }
  }, [isAuthenticated]);

  return null;
}
