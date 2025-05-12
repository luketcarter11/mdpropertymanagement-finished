import React from 'react';
import Link from 'next/link';

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
          viewBox="0 0 24 24"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
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
        <div className="text-center">
          <Link 
            href="/testimonials" 
            className="inline-block bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            View All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialShowcase; 