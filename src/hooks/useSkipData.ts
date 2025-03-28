import { useState, useEffect, useCallback } from 'react';
import { fetchSkipsByLocation, Skip } from '../services/api';

/**
 * DEV NOTE:
 * assignment is the list of skips so I wont working on best practice about handling requests and parameters.
 */

interface UseSkipDataProps {
  initialPostcode?: string;
  initialArea?: string;
  fetchOnMount?: boolean;
}

interface UseSkipDataResult {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  fetchSkips: (postcode: string, area: string) => Promise<void>;
  postcode: string;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
  area: string;
  setArea: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @param initialPostcode - Initial postcode value (default: 'NR32')
 * @param initialArea - Initial area value (default: 'Lowestoft')
 * @param fetchOnMount - Whether to fetch data on component mount (default: true)
 * @returns Object containing skip data, loading state, error state, and fetch function
 */
export const useSkipData = ({
  initialPostcode = 'NR32',
  initialArea = 'Lowestoft',
  fetchOnMount = true
}: UseSkipDataProps = {}): UseSkipDataResult => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [postcode, setPostcode] = useState<string>(initialPostcode);
  const [area, setArea] = useState<string>(initialArea);

  const fetchSkips = useCallback(async (postcodeToFetch: string, areaToFetch: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchSkipsByLocation(postcodeToFetch, areaToFetch);
      setSkips(response || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchOnMount) {
      fetchSkips(postcode, area);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    skips,
    loading,
    error,
    fetchSkips,
    postcode,
    setPostcode,
    area,
    setArea
  };
};
