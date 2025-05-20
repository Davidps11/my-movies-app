'use client';
import React, { Suspense } from 'react';
import PopularClientPage from '@/components/PopularClientPage/PopularClientPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PopularClientPage />
    </Suspense>
  );
}
