
import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialProps {
  testimonial: {
    content: string;
    author: string;
    role: string;
    avatar: string;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial, index }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.5,
            delay: index * 0.2
          } 
        }
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex-grow">
          <div className="text-primary text-4xl font-serif leading-none mb-2">"</div>
          <p className="text-gray-700 italic">
            {testimonial.content}
          </p>
          <div className="text-primary text-4xl font-serif leading-none text-right mt-2">"</div>
        </div>
        
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.author} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-purple-900">{testimonial.author}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
