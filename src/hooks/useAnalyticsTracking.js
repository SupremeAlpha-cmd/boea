import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Drop this inside the Router — logs a pageview on every route change.
 * No-op until Firebase is configured.
 */
export function useAnalyticsTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
}
