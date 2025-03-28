import axios, { AxiosError } from 'axios';

export interface Skip {
  id: number;
  size: number;
  price_before_vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  postcode: string;
  area: string | null;
  transport_cost: number;
  per_tonne_cost: number;
  vat: number;
  created_at: string;
  updated_at: string;
  forbidden: boolean;
}

/**
 * Fetches skip data by location
 * @param postcode - The postcode to search for
 * @param area - The area name
 * @returns Promise with the skip data response
 */
export const fetchSkipsByLocation = async (
  postcode: string,
  area: string
): Promise<Skip[]> => {
  try {
    const response = await axios.get<Skip[]>(
      `https://app.wewantwaste.co.uk/api/skips/by-location`, // TODO: move to a config or env
      {
        params: {
          postcode,
          area
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error response:', axiosError.response.data);
        console.error('Status code:', axiosError.response.status);
        throw new Error(`API error: ${axiosError.response.status} - ${(axiosError.response.data as any)?.message || 'Unknown error'}`);
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
        throw new Error('Network error: No response from server');
      } else {
        console.error('Error setting up request:', axiosError.message);
        throw new Error(`Request setup error: ${axiosError.message}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
