import '@/styles/globals.css'
import { TrackingProvider } from '@/Context/Tracking';

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider {...pageProps}>
        < Component {...pageProps} />
      </TrackingProvider>  // Pass pageProps to TrackingProvider
    </>
  )
}
