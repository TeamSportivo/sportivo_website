import React, { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (form.current) {
      emailjs
        .sendForm('service_idz9fng', 'template_65paboo', form.current, {
          publicKey: '_t7IV5i7ByCPkgniv',
        })
        .then(
          () => {
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            if (form.current) {
              form.current.reset();
            }
          },
          (error) => {
            console.error('EmailJS error:', error.text);
            toast.error('Failed to send message. Please try again.');
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="pt-20">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Contact Us</h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Whether you're interested in joining a team, becoming a sponsor, or just have a question, we'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 mt-1">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        Future Institute of Engineering and Management<br />
                        Sonarpur Station Road, Mission Pally, Narendrapur,<br />
                        Kolkata, West Bengal 700150
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 mt-1">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone Number</h3>
                      <p className="text-gray-600">
                        <a href="tel: +91 9830116661" className="hover:text-primary transition-colors">
                          +91 98301 16661 [ Rohit Yadav ]
                        </a>
                      <p className="text-gray-600">
                          <a href="tel: +91 96935 53439" className="hover:text-primary transition-colors">
                              +91 96935 53439 [ Aman Agastya ]
                          </a>
                      </p>
                      <p className="text-gray-600">
                          <a href="tel: +91 74797 03520" className="hover:text-primary transition-colors">
                              +91 74797 03520 [ Chhavinav Verma ]
                          </a>
                      </p>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 mt-1">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Address</h3>
                      <p className="text-gray-600">
                        <a href="mailto:sportivo@teamfuture.in" className="hover:text-primary transition-colors">
                        sportivo@teamfuture.in
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9am - 5pm<br />
                        Saturday: 10am - 2pm [On call] <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary text-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Follow Us</h2>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.facebook.com/FIEMsportivo/" 
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/sportivoteamfuture/?igsh=OWs1N3Bhc3JjN3hi#" 
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Youtube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="user_phone"
                        name="user_phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Join a Team">Join a Team</option>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Event Information">Event Information</option>
                        <option value="Facility Rental">Facility Rental</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-right">
                    <CustomButton 
                      type="submit"
                      isLoading={loading}
                      icon={<Send size={16} />}
                      iconPosition="right"
                    >
                      Send Message
                    </CustomButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative h-[400px]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.6193195499627!2d88.41285357490642!3d22.44334967958391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272166e4cb263%3A0x27f12170efd9ddee!2sFuture%20Institute%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2sin!4v1742926494794!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          title="Map of Future Institute of Engineering and Management"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
