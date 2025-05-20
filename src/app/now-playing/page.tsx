'use client';
import React, { Suspense } from 'react';
import NowPlayingClientPage from '@/components/NowPlayingClientPage/NowPlayingClientPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NowPlayingClientPage />
    </Suspense>
  );
}
