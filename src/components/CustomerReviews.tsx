
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "VP Sales, TechCorp",
    rating: 5,
    review: "This AI platform completely transformed our outreach strategy. We went from ignored emails to meaningful conversations in just weeks.",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Head of Growth, StartupXYZ",
    rating: 5,
    review: "The personalization is incredible. Our prospects actually respond now because the messages feel genuinely relevant to them.",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    title: "Sales Director, Enterprise Co",
    rating: 5,
    review: "Finally, an AI tool that understands context and timing. Our conversion rates have tripled since we started using this platform.",
    avatar: "LR"
  },
  {
    id: 4,
    name: "David Kim",
    title: "CEO, GrowthLab",
    rating: 5,
    review: "The relationship building aspect is what sets this apart. It's not just about sending messages, it's about creating genuine connections.",
    avatar: "DK"
  },
  {
    id: 5,
    name: "Emma Thompson",
    title: "Marketing Lead, InnovateCo",
    rating: 5,
    review: "I was skeptical about AI outreach, but this tool proved me wrong. The responses we get are warmer and more engaged than ever.",
    avatar: "ET"
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Business Development, ScaleUp",
    rating: 5,
    review: "The insights provided by the AI are game-changing. We now know exactly when and how to reach out for maximum impact.",
    avatar: "JW"
  }
];

const CustomerReviews = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-section max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-convrt-dark-blue">What Our Customers Say</h2>
          <p className="text-xl text-convrt-dark-blue/80 max-w-3xl mx-auto">
            Join thousands of sales professionals who've transformed their outreach with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-convrt-purple/20 flex items-center justify-center mr-4">
                  <span className="font-bold text-convrt-purple">{review.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.title}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-convrt-purple/20" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {review.review}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
            <span className="font-semibold text-green-800">4.9/5 average rating from 2,847 reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
