// providers/SupabaseProvider.jsx
'use client';

import { createSupabaseClient } from '@/libs/supabase';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const SupabaseProvider = ({ children }) => {
  const [supabaseClient] = useState(() =>
    createSupabaseClient()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
