import type {AppProps} from 'next/app'
import GlobalStyles from '@/styles/GlobalStyles'
import {Toaster} from "sonner";
import {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {Hydrate, QueryClientProvider} from "@tanstack/react-query";

const App = ({Component, pageProps}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <GlobalStyles/>
      <div id="modals"/>
      <Toaster richColors/>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
