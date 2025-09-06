import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      avatar: "SJ",
      content: "PharmaGo has been a lifesaver! I can find my medications at the best prices and check availability before leaving home. It's saved me so much time and money.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "General Practitioner",
      avatar: "MC",
      content: "As a doctor, I often recommend PharmaGo to my patients. The real-time availability data helps them make informed decisions about their medication needs.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Caregiver",
      avatar: "PS",
      content: "Managing medications for my elderly parents became so much easier with PharmaGo. I can compare prices and find nearby pharmacies instantly.",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-pharma-cream dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-pharma-dark dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Trusted by <motion.span 
              className="text-pharma-brown dark:text-pharma-blue"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Patients
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-pharma-dark dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            See what our users have to say about their PharmaGo experience
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="card bg-white dark:bg-gray-800 group hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className="w-16 h-16 bg-pharma-brown dark:bg-pharma-blue rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className="font-bold text-pharma-dark dark:text-white text-lg">{testimonial.name}</h4>
                  <p className="text-pharma-brown dark:text-pharma-blue font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              <motion.div 
                className="flex mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.5 + i * 0.1 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </motion.div>
              
              <motion.p 
                className="text-pharma-dark dark:text-gray-300 leading-relaxed italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                "{testimonial.content}"
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-r from-pharma-blue to-pharma-brown dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 text-white transition-colors duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Experience PharmaGo?
            </motion.h3>
            <motion.p 
              className="text-xl mb-6 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Join thousands of satisfied users who trust PharmaGo for their medication needs
            </motion.p>
            <motion.button 
              className="bg-white dark:bg-gray-800 text-pharma-brown dark:text-pharma-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
