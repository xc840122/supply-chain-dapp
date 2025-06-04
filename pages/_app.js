import '@/styles/globals.css'
import { TrackingProvider } from '@/Context/TrackingContext';
import { NavBar, Footer } from '@/Components';

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider {...pageProps}>
        <NavBar />
        < Component {...pageProps} />
      </TrackingProvider>
      <Footer />
    </>
  )
}
