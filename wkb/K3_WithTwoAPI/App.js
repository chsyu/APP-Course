import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import Screen from "./Screen"

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Screen />
    </QueryClientProvider>
  );
}
