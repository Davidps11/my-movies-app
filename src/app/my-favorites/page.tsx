'use client';

import React from 'react';
import MyFavoritesPage from '@/components/MyFavoritesPage/MyFavoritesPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyFavoritesPage />
    </Suspense>
  );
}
