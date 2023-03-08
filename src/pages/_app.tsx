import type {AppProps} from 'next/app'
import GlobalStyles from 'styles/GlobalStyles'
import {Toaster} from "sonner";
import {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {Hydrate, QueryClientProvider} from "@tanstack/react-query";
import AppHeader from "components/AppHeader";
import ContentWrapper from "components/ContentWrapper";

const App = ({Component, pageProps}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <GlobalStyles/>
      <div id="modals"/>
      <Toaster richColors/>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ContentWrapper>
          <AppHeader/>
          <Component {...pageProps} />
          </ContentWrapper>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
