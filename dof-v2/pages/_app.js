import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps, router }) {
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </Layout>
  );
}
