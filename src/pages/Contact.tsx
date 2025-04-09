import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import NewsletterSignup from '../components/NewsletterSignup';

// Interface for form data
interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  jobTitle: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    jobTitle: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form data submitted:', formData);
      
      // Store the inquiry in local storage for demo purposes
      // In a real app, this would be sent to a backend API
      const existingInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      const newInquiry = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'new'
      };
      
      localStorage.setItem('inquiries', JSON.stringify([...existingInquiries, newInquiry]));
      
      toast({
        title: "Inquiry Submitted",
        description: "Thank you! We'll get back to you shortly.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        country: '',
        jobTitle: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-white mb-6">Get In Touch</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Have a project in mind or want to learn more about our AI solutions? 
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="heading-md mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+44 123 4567890"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Company Ltd."
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={formData.country} onValueChange={handleSelectChange} required>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="CTO / HR Manager"
                        required
                        value={formData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Job Description / Requirements *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your project requirements or how we can help you..."
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-blue-600 p-8 rounded-lg shadow-lg text-white h-full">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Address</h4>
                      <p className="text-blue-100">123 Tech Park, Sunderland, SR1 1AA, United Kingdom</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-blue-100">info@ai-solutions.com</p>
                      <p className="text-blue-100">support@ai-solutions.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Phone</h4>
                      <p className="text-blue-100">+44 191 123 4567</p>
                      <p className="text-blue-100">+44 191 765 4321</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-blue-500 my-8 pt-8">
                  <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
                  <p className="mb-2">Monday - Friday: 9am - 6pm</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36397.638039862666!2d-1.4030604!3d54.9060025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e64ee57691c93%3A0x515967a9cb3b8a3b!2sSunderland!5e0!3m2!1sen!2suk!4v1681123456789!5m2!1sen!2suk"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AI-Solutions Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="section bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our services and process.</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What types of businesses do you work with?",
                answer: "We work with businesses of all sizes across various industries including finance, healthcare, manufacturing, retail, and technology. Our AI solutions can be customized to fit the specific needs of your organization."
              },
              {
                question: "How long does implementation typically take?",
                answer: "Implementation timelines vary depending on the complexity of the project and your specific requirements. Simple integrations can be completed in as little as 2-3 weeks, while more comprehensive solutions may take 2-3 months. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Can your solutions integrate with our existing systems?",
                answer: "Yes! Our AI solutions are designed to integrate seamlessly with your existing tech stack. We have experience working with a wide range of platforms, CRMs, ERPs, and custom-built systems."
              },
              {
                question: "What kind of support do you offer after implementation?",
                answer: "We provide comprehensive ongoing support including regular maintenance, performance monitoring, updates, and dedicated customer service. We offer various support packages to meet your needs."
              },
              {
                question: "How do you handle data privacy and security?",
                answer: "We take data privacy and security very seriously. All our solutions are built with security-first principles, comply with GDPR and other relevant regulations, and implement industry-standard encryption and security protocols."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold mb-3">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Our team is ready to discuss your needs and show you how our AI solutions can transform your digital employee experience.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <a href="#top">Contact Us Today <ArrowRight size={16} className="ml-2" /></a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
