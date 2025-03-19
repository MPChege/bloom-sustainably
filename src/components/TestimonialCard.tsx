
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

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
  const { isRTL } = useLanguage();

  return (
    <motion.div 
      className={cn(
        "bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary",
        isRTL && "text-right"
      )}
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
          <div className={cn("text-primary text-4xl font-serif leading-none mb-2", isRTL ? "text-right" : "text-left")}>"</div>
          <p className="text-gray-700 italic">
            {testimonial.content}
          </p>
          <div className={cn("text-primary text-4xl font-serif leading-none mt-2", isRTL ? "text-left" : "text-right")}>"</div>
        </div>
        
        <div className={cn("flex items-center mt-4 pt-4 border-t border-gray-100", isRTL && "flex-row-reverse")}>
          <div className={cn("w-12 h-12 rounded-full overflow-hidden border-2 border-primary", isRTL ? "ml-4" : "mr-4")}>
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
