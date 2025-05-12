import type { AppProps } from 'next/app';
import Head from 'next/head';
import { defaultMetadata } from '../utils/metadata';
import '../styles/globals.css';

// Import scheduler only on the server side
if (typeof window === 'undefined') {
  import('../utils/scheduler')
    .catch(error => console.error('Failed to load scheduler:', error));
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        
        {/* Default SEO */}
        <title>{defaultMetadata.title}</title>
        <meta name="description" content={defaultMetadata.description} />
        <meta name="keywords" content={defaultMetadata.keywords} />
        <meta name="author" content={defaultMetadata.authors[0].name} />
        <meta name="robots" content={defaultMetadata.robots} />
        <link rel="canonical" href={defaultMetadata.alternates.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content={defaultMetadata.openGraph.type} />
        <meta property="og:locale" content={defaultMetadata.openGraph.locale} />
        <meta property="og:url" content={defaultMetadata.openGraph.url} />
        <meta property="og:site_name" content={defaultMetadata.openGraph.siteName} />
        <meta property="og:title" content={defaultMetadata.openGraph.title} />
        <meta property="og:description" content={defaultMetadata.openGraph.description} />
        <meta property="og:image" content={defaultMetadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={defaultMetadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={defaultMetadata.openGraph.images[0].height.toString()} />
        <meta property="og:image:alt" content={defaultMetadata.openGraph.images[0].alt} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={defaultMetadata.twitter.card} />
        <meta name="twitter:title" content={defaultMetadata.twitter.title} />
        <meta name="twitter:description" content={defaultMetadata.twitter.description} />
        <meta name="twitter:image" content={defaultMetadata.twitter.images[0]} />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 