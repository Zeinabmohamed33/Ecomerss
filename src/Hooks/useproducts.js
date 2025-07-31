import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useProducts() {
  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const productInfo = useQuery({
    queryKey: ["recentproduct"],
    queryFn: getProduct,
    staleTime: 100000,
    // retry: 7,
    // retryDelay: 3000,
    // refetchInterval: 3000,
    // refetchIntervalInBackground: true,
    // refetchOnWindowFocus: true,
  });

  return productInfo;
}
