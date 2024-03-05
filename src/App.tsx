import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyled from "./styles/GlobalStyled";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <GlobalStyled />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
