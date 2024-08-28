

import { QueryClient } from "@tanstack/react-query";

const querryClientProvider = new QueryClient({
  defaultOptions:{
    queries: {
            refetchOnWindowFocus: false, // Disable automatic refetch on window focus
            retry: 3, // Number of retries on failed queries
          },
  }
}) 

export default querryClientProvider