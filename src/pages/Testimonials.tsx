
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Quote, MessageSquare } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Thompson",
    title: "CTO, TechGlobal",
    company: "TechGlobal",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "AI-Solutions transformed our employee experience platform. The AI assistant they implemented has reduced support tickets by 45% and improved employee satisfaction scores significantly.",
    rating: 5,
    category: "AI Assistant"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Head of Innovation, Finance Forward",
    company: "Finance Forward",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "Working with AI-Solutions was a game-changer for our organization. Their workflow automation solution streamlined our processes and freed up our team to focus on high-value activities. The ROI has been exceptional.",
    rating: 5,
    category: "Workflow Automation"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "HR Director, HealthPlus",
    company: "HealthPlus",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "The predictive analytics tool has revolutionized our approach to talent management. We've seen a 25% improvement in retention rates since implementation, and the insights we've gained have been invaluable.",
    rating: 5,
    category: "Predictive Analytics"
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Operations Manager, Global Retail",
    company: "Global Retail",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "The multilingual support system has been a game-changer for our global operations. Communication between our international teams is seamless now, and we're seeing the benefits in increased collaboration and faster decision-making.",
    rating: 5,
    category: "Multilingual Support"
  },
  {
    id: 5,
    name: "Amanda Lee",
    title: "People Operations Lead, Tech Innovate",
    company: "Tech Innovate",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "The sentiment analysis dashboard has given us unprecedented insight into employee satisfaction. We can now address issues before they become problems and have seen a significant improvement in our workplace culture.",
    rating: 4,
    category: "Sentiment Analysis"
  },
  {
    id: 6,
    name: "James Patterson",
    title: "IT Director, Manufacturing Plus",
    company: "Manufacturing Plus",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "AI-Solutions delivered exactly what we needed - a custom AI system that understood our unique manufacturing processes. The implementation was smooth, and the team was knowledgeable and responsive throughout.",
    rating: 5,
    category: "Custom AI"
  },
  {
    id: 7,
    name: "Olivia Martinez",
    title: "Digital Workplace Manager, EduTech",
    company: "EduTech",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "The AI virtual assistant we implemented with AI-Solutions has transformed how our employees get help with technical issues. Response times are down by 90%, and satisfaction is up. I couldn't be happier with the results.",
    rating: 5,
    category: "AI Assistant"
  },
  {
    id: 8,
    name: "Robert Kim",
    title: "Chief Digital Officer, FinTech Solutions",
    company: "FinTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote: "Working with AI-Solutions was a breath of fresh air. They took the time to understand our complex workflows and delivered an automation solution that has saved us thousands of hours of manual work.",
    rating: 4,
    category: "Workflow Automation"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
              <Quote size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.title}</p>
            <p className="text-gray-500 text-sm">{testimonial.company}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
        
        <blockquote className="italic text-gray-600 mb-4">
          "{testimonial.quote}"
        </blockquote>
        
        <div className="text-right">
          <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-full text-xs">
            {testimonial.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredTestimonials = filter === "all" 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.category.toLowerCase().includes(filter.toLowerCase()));
    
  const averageRating = TESTIMONIALS.reduce((acc, curr) => acc + curr.rating, 0) / TESTIMONIALS.length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-white mb-6">Customer Testimonials</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with AI-Solutions 
            and the impact our solutions have had on their organizations.
          </p>
        </div>
      </section>
      
      {/* Overall Rating Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="bg-blue-50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Overall Customer Satisfaction</h2>
              <p className="text-gray-600">Based on {TESTIMONIALS.length} verified reviews</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      className={i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Customer rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Testimonial */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We take pride in delivering exceptional results and building lasting 
              relationships with our clients.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 h-64 lg:h-full bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <MessageSquare size={300} className="absolute -right-20 -bottom-20 text-white transform rotate-12" />
                </div>
                <div className="relative h-full flex items-center justify-center p-6">
                  <div className="text-white text-center">
                    <Quote size={48} className="mx-auto mb-4 opacity-40" />
                    <blockquote className="text-2xl font-light italic mb-8">
                      "AI-Solutions transformed our digital workplace in ways we couldn't have imagined."
                    </blockquote>
                    <div className="inline-flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                          alt="James Patterson"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">James Patterson</div>
                        <div className="text-blue-200 text-sm">IT Director, Manufacturing Plus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Our Partnership with Manufacturing Plus</h3>
                <p className="text-gray-600 mb-6">
                  Manufacturing Plus came to us facing significant challenges with their legacy systems and manual processes. 
                  Their employees were spending countless hours on repetitive tasks, and collaboration between departments was hindered by siloed information.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Implemented a custom AI solution tailored to their specific manufacturing processes</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Reduced manual data entry by 78% through intelligent automation</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Improved cross-departmental collaboration with our integrated platform</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Achieved an estimated annual savings of $2.3 million in operational costs</p>
                  </div>
                </div>
                <div className="flex">
                  <Button asChild>
                    <Link to="/projects">Read the full case study</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All Reviews</TabsTrigger>
                  <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                  <TabsTrigger value="workflow">Workflow</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="custom">Custom AI</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Review Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">96%</div>
              <p className="text-gray-600">Would recommend to others</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <p className="text-gray-600">Reported significant ROI</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <p className="text-gray-600">Industries served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">Client satisfaction guaranteed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Transform Your Digital Workplace?</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Join our satisfied clients and experience the benefits of AI-powered solutions for your organization.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
