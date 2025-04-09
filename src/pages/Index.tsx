import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Zap, LineChart, Globe, Code, MessageCircle } from 'lucide-react';
import NewsletterSignup from '../components/NewsletterSignup';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20 md:py-28">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fade-in">
            <h1 className="heading-xl mb-6">
              AI-Powered Solutions for a Better Digital Experience
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Empowering businesses with intelligent tools to enhance employee productivity 
              and satisfaction across all digital touchpoints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-full h-auto max-w-md rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                  alt="AI Solutions Dashboard"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-400 p-3 rounded-lg text-white">
                <Zap size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <p className="text-center text-gray-500 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Microsoft', 'IBM', 'Siemens', 'Nissan', 'Sage'].map((client) => (
              <div key={client} className="text-xl md:text-2xl font-bold text-gray-400">{client}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Our AI-Powered Services</h2>
            <p className="text-gray-600 text-lg">
              We provide cutting-edge solutions that transform how employees interact with digital systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle size={32} />,
                title: "AI Virtual Assistance",
                description: "24/7 intelligent support for employees to solve common problems and answer questions instantly."
              },
              {
                icon: <Zap size={32} />,
                title: "Workflow Automation",
                description: "Streamline repetitive tasks and processes with intelligent automation powered by machine learning."
              },
              {
                icon: <LineChart size={32} />,
                title: "Predictive Analytics",
                description: "Gain insights from employee data to identify trends and make proactive improvements."
              },
              {
                icon: <Code size={32} />,
                title: "Custom AI Solutions",
                description: "Bespoke AI development tailored to your specific business needs and challenges."
              },
              {
                icon: <Globe size={32} />,
                title: "Multilingual Support",
                description: "Break language barriers with AI-powered translation and communication tools."
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Sentiment Analysis",
                description: "Understand employee satisfaction in real-time through advanced sentiment analysis."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/services" className="inline-flex items-center text-blue-600 font-medium">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Why Choose AI-Solutions?</h2>
              <p className="text-gray-600 mb-8">
                We combine deep technical expertise with a passion for improving the way people work. 
                Our solutions are designed to make digital interactions more intuitive, efficient and enjoyable.
              </p>

              <div className="space-y-4">
                {[
                  "Industry-leading AI technology",
                  "Customized solutions for your specific needs",
                  "Proven 30% increase in employee productivity",
                  "Seamless integration with existing systems",
                  "Ongoing support and optimization"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-teal-500 mr-2 flex-shrink-0 mt-1" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <Button asChild className="btn-primary mt-8">
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                        alt="Client" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Sarah Thompson</h4>
                      <p className="text-gray-500 text-sm">CTO, TechGlobal</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "AI-Solutions transformed our employee experience platform. 
                  The AI assistant they implemented has reduced support tickets by 45% 
                  and improved employee satisfaction scores significantly."
                </p>
                <div className="flex items-center mt-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="absolute top-10 -left-10 w-20 h-20 bg-teal-500 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Preview Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg">
              Take a look at some of our successful implementations across different industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
                title: "GlobalTech AI Assistant",
                category: "Financial Services",
                description: "AI-powered assistant that improved employee onboarding efficiency by 35%"
              },
              {
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
                title: "SmartFlow Automation",
                category: "Healthcare",
                description: "Workflow automation that reduced administrative tasks by 40% for medical staff"
              },
              {
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
                title: "Predictive HR Analytics",
                category: "Manufacturing",
                description: "Employee retention prediction system that improved retention rates by 25%"
              }
            ].map((project, index) => (
              <div key={index} className="group overflow-hidden rounded-lg shadow-md card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-teal-500 text-white text-xs rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link to="/projects" className="inline-flex items-center text-blue-600 font-medium">
                    View case study <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="btn-outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="heading-lg mb-6">Ready to Transform Your Digital Employee Experience?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Let's discuss how our AI solutions can help your organization improve productivity, 
            employee satisfaction, and digital interactions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
      
      {/* Latest News Preview */}
      <section className="section">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-lg">Latest News & Insights</h2>
            <Link to="/news" className="text-blue-600 font-medium flex items-center">
              View all articles <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                date: "April 2, 2025",
                title: "How AI is Revolutionizing Employee Onboarding",
                excerpt: "Discover how artificial intelligence is making the employee onboarding process smoother and more effective."
              },
              {
                image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                date: "March 28, 2025",
                title: "The Future of AI in Workplace Communication",
                excerpt: "Learn about emerging AI technologies that are transforming how teams communicate in the digital workplace."
              },
              {
                image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                date: "March 20, 2025",
                title: "Case Study: AI-Powered Employee Support at Finance Corp",
                excerpt: "How we helped a leading financial institution improve their employee support with intelligent automation."
              }
            ].map((article, index) => (
              <div key={index} className="card-hover">
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white p-6 rounded-b-lg shadow-md">
                  <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link to="/news" className="text-blue-600 font-medium">Read more</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
