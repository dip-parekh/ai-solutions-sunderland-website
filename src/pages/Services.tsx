
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, MessageCircle, Zap, LineChart, Code, Globe, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'ai-assistance',
      icon: <MessageCircle size={36} />,
      title: 'AI Virtual Assistance',
      description: 'Our AI virtual assistants provide 24/7 intelligent support for employees, answering questions, solving common problems, and guiding users through complex processes.',
      features: [
        'Natural language understanding and processing',
        'Knowledge base integration',
        'Multi-channel availability (chat, email, voice)',
        'Personalized responses based on user history',
        'Continuous learning from interactions'
      ]
    },
    {
      id: 'workflow',
      icon: <Zap size={36} />,
      title: 'Workflow Automation',
      description: 'Streamline repetitive tasks and processes with our intelligent automation solutions powered by machine learning algorithms that adapt and improve over time.',
      features: [
        'Custom workflow design and implementation',
        'Integration with existing business systems',
        'Anomaly detection and handling',
        'Performance analytics and reporting',
        'Scalable architecture for growth'
      ]
    },
    {
      id: 'data-analytics',
      icon: <LineChart size={36} />,
      title: 'Predictive Analytics',
      description: 'Gain valuable insights from your employee data to identify trends, anticipate needs, and make proactive improvements to your digital workplace.',
      features: [
        'Advanced data visualization',
        'Trend identification and forecasting',
        'Employee engagement metrics',
        'Productivity analysis',
        'Custom reporting dashboards'
      ]
    },
    {
      id: 'custom-ai',
      icon: <Code size={36} />,
      title: 'Custom AI Solutions',
      description: 'Our team of AI specialists can develop bespoke artificial intelligence solutions tailored to your specific business needs and challenges.',
      features: [
        'Requirements analysis and solution design',
        'Custom AI model development',
        'Integration with existing infrastructure',
        'Training and knowledge transfer',
        'Ongoing support and optimization'
      ]
    },
    {
      id: 'multilingual',
      icon: <Globe size={36} />,
      title: 'Multilingual Support',
      description: 'Break language barriers in your global workforce with our AI-powered translation and communication tools that enable seamless collaboration.',
      features: [
        'Real-time translation for 100+ languages',
        'Cultural context awareness',
        'Document translation and localization',
        'Multilingual chatbots and assistants',
        'Voice recognition and translation'
      ]
    },
    {
      id: 'sentiment',
      icon: <Users size={36} />,
      title: 'Sentiment Analysis',
      description: 'Understand employee satisfaction and engagement in real-time through advanced sentiment analysis of communications, feedback, and interactions.',
      features: [
        'Real-time emotion and sentiment detection',
        'Trend analysis and alerting',
        'Anonymous feedback aggregation',
        'Action recommendation engine',
        'Integration with HR and management systems'
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-white mb-6">Our Services</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            We provide cutting-edge AI solutions designed to transform digital employee experiences 
            and drive productivity, satisfaction, and engagement across your organization.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Transforming Digital Workplaces</h2>
            <p className="text-gray-600 text-lg">
              Our comprehensive suite of AI-powered services is designed to make digital interactions 
              more intuitive, efficient, and enjoyable for your employees.
            </p>
          </div>
          
          <div className="space-y-20">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-50 rounded-tl-[100px] -z-0"></div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white mb-6">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="text-teal-500 mr-2 flex-shrink-0 mt-1" size={18} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button asChild className="btn-primary">
                        <Link to="/contact">Get Started <ArrowRight size={16} className="ml-1" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <div className="w-20 h-1 bg-teal-500 mb-6"></div>
                  <p className="text-lg text-gray-600 mb-6">
                    {index % 2 === 0 
                      ? `Our ${service.title.toLowerCase()} solution is designed to deliver measurable improvements in employee productivity and satisfaction.`
                      : `With our innovative approach to ${service.title.toLowerCase()}, your organization can expect significant enhancements to digital employee experience.`}
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
                    <h4 className="font-bold mb-2">Key Benefits:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Increased employee productivity and efficiency</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Enhanced digital workplace satisfaction</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Reduced friction in digital experiences</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span>Data-driven insights for continuous improvement</span>
                      </li>
                    </ul>
                  </div>
                  <blockquote className="italic text-gray-600 border-l-4 border-blue-600 pl-4 py-2">
                    "Our implementation of AI-Solutions' {service.title} resulted in a significant improvement in employee satisfaction scores and reduced support requests by over 30%."
                    <footer className="text-gray-500 mt-2 not-italic">- A satisfied client</footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Our Implementation Process</h2>
            <p className="text-gray-600 text-lg">
              We follow a structured, collaborative approach to ensure your AI solution delivers 
              maximum value with minimal disruption.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
            
            {/* Process steps */}
            <div className="space-y-12">
              {[
                {
                  number: '01',
                  title: 'Discovery & Analysis',
                  description: 'We begin with a comprehensive assessment of your current digital employee experience, identifying pain points and opportunities for AI-driven improvements.'
                },
                {
                  number: '02',
                  title: 'Solution Design',
                  description: 'Our team designs a tailored solution that addresses your specific needs, integrates with existing systems, and aligns with your organizational goals.'
                },
                {
                  number: '03',
                  title: 'Development & Testing',
                  description: 'We develop your AI solution using industry best practices, with rigorous testing to ensure performance, security, and user satisfaction.'
                },
                {
                  number: '04',
                  title: 'Implementation & Training',
                  description: 'We deploy the solution with minimal disruption to your operations and provide comprehensive training to ensure successful adoption.'
                },
                {
                  number: '05',
                  title: 'Ongoing Support & Optimization',
                  description: 'Our relationship continues after implementation with proactive monitoring, regular updates, and continuous optimization based on performance data and feedback.'
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className={`lg:flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    {/* Timeline dot for desktop */}
                    <div className="hidden lg:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 text-right' : 'lg:pl-16 text-left'}`}>
                      {/* Timeline dot for mobile */}
                      <div className="lg:hidden w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Empty space for alignment */}
                    <div className="lg:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our services and technologies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly can we expect to see results?",
                answer: "Most clients begin seeing measurable improvements within 4-6 weeks of implementation, with continued optimization and benefits over time."
              },
              {
                question: "Will your solutions work with our existing technology stack?",
                answer: "Yes, our solutions are designed to integrate seamlessly with most common enterprise systems. We'll assess compatibility during the discovery phase."
              },
              {
                question: "How do you ensure data security and privacy?",
                answer: "We implement industry-leading security practices, including encryption, secure access controls, and compliance with regulations like GDPR."
              },
              {
                question: "Do we need to have technical expertise in-house?",
                answer: "No, our solutions are designed to be user-friendly, and we provide comprehensive training and support. No specialized AI knowledge is required."
              },
              {
                question: "Can your solutions be customized to our specific industry?",
                answer: "Absolutely. We have experience across multiple industries and tailor our solutions to meet the specific needs and challenges of each sector."
              },
              {
                question: "What ongoing support do you provide?",
                answer: "We offer various support packages including regular maintenance, updates, performance monitoring, and consultative guidance on optimization."
              }
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold mb-3">{item.question}</h4>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Transform Your Digital Workplace?</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Contact us today to discuss your needs and discover how our AI solutions can enhance your employee experience.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
