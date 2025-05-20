'use client';
import React, { Suspense } from 'react';
import TopRatedClientPage from '@/components/TopRatedClientPage/TopRatedClientPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopRatedClientPage />
    </Suspense>
  );
}
