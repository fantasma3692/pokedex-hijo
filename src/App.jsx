import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePokemonStore } from "./store/PokemonStore";
import { MyRoutes } from "./routes/routers";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import {useThemeStore} from "./store/ThemeStore"
const queryClient = new QueryClient();
function App() {
  const {themeStyle}= useThemeStore()
   return (
    <ThemeProvider theme={themeStyle}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <MyRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
