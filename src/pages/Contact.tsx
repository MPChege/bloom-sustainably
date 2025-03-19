
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const formField = "w-full px-4 py-3 rounded-md border border-sage focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/90";

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Contact Us"
        subtitle="Get in touch with our team to discuss your floral needs"
        backgroundImage="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Contact Information */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-panel p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Our Location</h3>
              <p className="text-muted-foreground mb-2">
                Credible Blooms Ltd.<br />
                North Lake Road<br />
                Naivasha, Kenya
              </p>
              <p className="text-sm text-foreground/60">
                2050 meters above sea level
              </p>
            </div>
            
            <div className="glass-panel p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Email Us</h3>
              <a href="mailto:info@credibleblooms.com" className="text-muted-foreground hover:text-primary transition-colors">
                info@credibleblooms.com
              </a>
              <a href="mailto:sales@credibleblooms.com" className="text-muted-foreground hover:text-primary transition-colors mt-1">
                sales@credibleblooms.com
              </a>
              <p className="text-sm text-foreground/60 mt-2">
                We respond within 24 hours
              </p>
            </div>
            
            <div className="glass-panel p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Call Us</h3>
              <a href="tel:+254712345678" className="text-muted-foreground hover:text-primary transition-colors">
                +254 712 345 678
              </a>
              <a href="tel:+254712345679" className="text-muted-foreground hover:text-primary transition-colors mt-1">
                +254 712 345 679
              </a>
              <p className="text-sm text-foreground/60 mt-2">
                Monday-Friday, 8am-5pm (EAT)
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="page-section bg-sage/10">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-2">
                  Send Us A Message
                </h2>
                <p className="text-muted-foreground">
                  Whether you have questions about our products, pricing, or want to arrange a farm visit, 
                  we're here to help.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="glass-panel p-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={formField}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formField}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={formField}
                    >
                      <option value="">Please select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Request a Quote">Request a Quote</option>
                      <option value="Farm Visit">Farm Visit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={formField}
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      fullWidth 
                      disabled={isSubmitting}
                      icon={isSubmitting ? undefined : <Send size={16} />}
                      iconPosition="right"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Map & Quick Contact */}
            <div className="flex flex-col">
              <div className="mb-8">
                <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                  Find Us
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-2">
                  Our Location
                </h2>
                <p className="text-muted-foreground">
                  Visit our farm in the beautiful Naivasha region, at the heart of Kenya's flower industry.
                </p>
              </div>
              
              {/* Map */}
              <div className="glass-panel p-4 mb-8 flex-grow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.42915114827!2d36.379493869803!3d-0.7129653580352632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182910708708d5bf%3A0xc77b043330daefc0!2sNaivasha!5e0!3m2!1sen!2ske!4v1684842940284!5m2!1sen!2ske"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Credible Blooms Location"
                ></iframe>
              </div>
              
              {/* WhatsApp */}
              <div className="glass-panel p-6 flex items-center bg-gradient-to-r from-[#25D366]/10 to-sage/10">
                <div className="p-3 bg-[#25D366] rounded-full mr-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-medium mb-1">Quick WhatsApp Chat</h3>
                  <p className="text-muted-foreground text-sm">
                    Need a quick response? Chat with our sales team on WhatsApp.
                  </p>
                </div>
                <a 
                  href="https://wa.me/254712345678" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Quick Answers
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to our most commonly asked questions. If you can't find what you're looking for,
              please contact us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I place an order for flowers?",
                answer: "For commercial orders, please contact our sales team via email at sales@credibleblooms.com or fill out our contact form. We'll respond within 24 hours with pricing and availability information."
              },
              {
                question: "What is the minimum order quantity?",
                answer: "Our minimum order quantity is typically 10 boxes for international orders, but this can vary depending on the flower type and season. Please contact us for specific requirements."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to Europe, the Middle East, Australia, and parts of Asia. Our logistics team ensures flowers arrive fresh through temperature-controlled transportation."
              },
              {
                question: "Can I visit your farm?",
                answer: "Absolutely! We welcome visitors to our farm. Please contact us at least one week in advance to schedule a tour. We offer guided visits showcasing our sustainable growing practices."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept bank transfers, letters of credit for international customers, and major credit cards. Payment terms are established upon agreement of the order."
              },
              {
                question: "How do you ensure flower quality during shipping?",
                answer: "We use specialized packaging and temperature-controlled shipping methods. Our flowers are cut, processed, and packed within hours, then transported in refrigerated vehicles to ensure maximum freshness."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-panel p-6">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
