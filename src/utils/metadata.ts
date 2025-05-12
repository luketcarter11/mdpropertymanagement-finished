import { Metadata } from 'next';

export const defaultMetadata = {
  title: 'MD Property Management | Gwynedd Cleaning & Holiday-Let',
  description: 'MD Property Management offers commercial cleaning, holiday-let management, keyholding & site visits across Gwynedd, North Wales. Book your free consultation.',
  keywords: 'property management, commercial cleaning, holiday-let management, Gwynedd, North Wales, property cleaning, keyholding',
  authors: [{ name: 'MD Property Management' }],
  creator: 'MD Property Management',
  publisher: 'MD Property Management',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://mdpropertymanagement.co.uk'
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://mdpropertymanagement.co.uk',
    siteName: 'MD Property Management',
    title: 'MD Property Management | Gwynedd Cleaning & Holiday-Let',
    description: 'Professional property management and cleaning services in Gwynedd, North Wales',
    images: [
      {
        url: 'https://mdpropertymanagement.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MD Property Management'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD Property Management | Gwynedd Cleaning & Holiday-Let',
    description: 'Professional property management and cleaning services in Gwynedd, North Wales',
    images: ['https://mdpropertymanagement.co.uk/og-image.jpg']
  }
};

export const pageMetadata = {
  home: {
    ...defaultMetadata
  },
  about: {
    ...defaultMetadata,
    title: 'About Us | MD Property Management',
    description: 'Learn about MD Property Management\'s professional cleaning and property management services in Gwynedd, North Wales.',
    openGraph: {
      ...defaultMetadata.openGraph,
      title: 'About MD Property Management',
      description: 'Learn about our professional cleaning and property management services'
    }
  },
  services: {
    ...defaultMetadata,
    title: 'Our Services | MD Property Management',
    description: 'Discover our range of property management and cleaning services including commercial cleaning, holiday-let management, and keyholding.',
    openGraph: {
      ...defaultMetadata.openGraph,
      title: 'Our Services | MD Property Management',
      description: 'Discover our range of property management and cleaning services'
    }
  },
  contact: {
    ...defaultMetadata,
    title: 'Contact Us | MD Property Management',
    description: 'Get in touch with MD Property Management for professional property and cleaning services in Gwynedd, North Wales.',
    openGraph: {
      ...defaultMetadata.openGraph,
      title: 'Contact MD Property Management',
      description: 'Get in touch for professional property and cleaning services'
    }
  },
  testimonials: {
    ...defaultMetadata,
    title: 'Client Testimonials | MD Property Management',
    description: 'Read what our clients say about MD Property Management\'s professional services in Gwynedd, North Wales.',
    openGraph: {
      ...defaultMetadata.openGraph,
      title: 'Client Testimonials | MD Property Management',
      description: 'Read what our clients say about our professional services'
    }
  }
}; 