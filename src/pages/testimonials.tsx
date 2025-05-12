import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { pageMetadata } from '../utils/metadata';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Janet",
      date: "29 October 2023",
      content: "Very professional company - attention to detail amazing, our house always looks fresh, inviting and spotlessly clean on arrival. We have a good working relationship with MD who we always find very helpful. We are lucky we found you!",
      rating: 5
    },
    {
      name: "Lisa",
      date: "26 October 2023",
      content: "A friendly and reliable team. MD Property management provide a professional cleaning and laundry service. Great to know that my property is being looked after so well. Thanks MD",
      rating: 5
    },
    {
      name: "Sara Caldwell",
      date: "25 October 2023",
      content: "Monica and Dave are completely reliable, friendly and work to a high standard. Nothing is too much trouble. We're very pleased that they are looking after our holiday let for us.",
      rating: 5
    },
    {
      name: "Helen",
      date: "6 February 2023",
      content: "Fabulous team of people to work with, prepared to go the extra mile when needed.",
      rating: 5
    },
    {
      name: "Lee Cunnington",
      date: "5 February 2023",
      content: "Great service everytime I've used them! 100% reliable. Professional service and friendly service. Nothing too much hard work. Would recommend. Looking forward to using the service again.",
      rating: 5
    },
    {
      name: "Dylan",
      date: "1 February 2023",
      content: "A good little company who do a good job they very reliable",
      rating: 5
    },
    {
      name: "Hannah Carey",
      date: "17 December 2022",
      content: "Dave, Monica and the rest of the team are excellent. They always respond super quickly to any queries and our guests have been very happy.",
      rating: 5
    },
    {
      name: "David",
      date: "10 December 2022",
      content: "Great service, always happy to help and my property is always spotless.",
      rating: 5
    },
    {
      name: "Bev Cherrington",
      date: "10 December 2022",
      content: "Dave, Monica and team are honest reliable cleaning team who manage our holiday home.",
      rating: 5
    },
    {
      name: "Abi",
      date: "10 December 2022",
      content: "We recently moved to MD property management and wish to express how impressed we are with their service. Reliable, trustworthy and experienced. Our property is well maintained and spotlessly clean. We are so pleased that we found them!",
      rating: 5
    },
    {
      name: "Denise",
      date: "29 November 2022",
      content: "MD Property supported us on our holiday let and offered an excellent cleaning changeover service that we could not fault. They are very reliable in all aspects of their work. We highly recommend MD Property Management Service. Thank you",
      rating: 5
    },
    {
      name: "Louise",
      date: "28 November 2022",
      content: "MD Property Management assisted me to get my property on to holiday letting services. They offer a great service and are very reliable. I took on the property management contract and could not fault their services. I would highly recommend this company.",
      rating: 5
    },
    {
      name: "Hugh",
      date: "28 November 2022",
      content: "Thorough, flexible and responsive company looking after our Snowdonia holiday lets.",
      rating: 5
    },
    {
      name: "Dave",
      date: "16 August 2022",
      content: "MD offer an outstanding property management services. We have had a few unusual problems but they've taken them all in their stride. They keep us up to date on all matters and are very proactive.",
      rating: 5
    },
    {
      name: "Daniel",
      date: "13 August 2022",
      content: "MD property management are a fantastic partner in helping me run a successful holiday let business. As a first time holiday let owner I have received support from MD property management that has exceeded my expectations with guidance, adhoc help for those issues that crop up unexpectedly and 5 star cleaning all helping us to provide a fantastic service to our guests. I fully recommend MD property management as a comprehensive and 100% reliable changeover service. Thanks to all the MD team",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const metadata = pageMetadata.testimonials;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Client Testimonials
              </h1>
              <p className="text-xl">
                Read what our satisfied clients have to say about our services
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.date}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold text-blue-800 mb-2">100%</div>
                <p className="text-gray-600">5-Star Reviews</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-800 mb-2">15+</div>
                <p className="text-gray-600">Recent Reviews</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-800 mb-2">5★</div>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-800 mb-2">2022+</div>
                <p className="text-gray-600">Serving Since</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Satisfied Clients</h2>
            <p className="text-xl mb-8">Experience our professional property management services for yourself</p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
            >
              Get Your Free Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials; 