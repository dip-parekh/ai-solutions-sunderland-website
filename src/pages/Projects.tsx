
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Quote } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    title: "GlobalTech AI Assistant",
    client: "FinanceCorp International",
    industry: "Financial Services",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    challenge: "FinanceCorp was struggling with a high volume of internal support requests from employees, leading to delays, frustration, and decreased productivity. Their existing ticketing system was inefficient and couldn't handle the complexity of employee queries.",
    solution: "We implemented our AI Virtual Assistant solution, integrated with their knowledge base and internal systems. The AI assistant could handle common queries instantly, escalate complex issues, and continuously learn from interactions.",
    results: [
      "45% reduction in support tickets within the first month",
      "Average response time reduced from 24 hours to under 5 minutes",
      "92% employee satisfaction rate with the AI assistant",
      "Support team freed up to focus on complex, high-value tasks"
    ],
    testimonial: {
      quote: "The AI assistant has transformed how we support our employees. Issues that used to take days to resolve are now handled in minutes, and our team can focus on more strategic initiatives.",
      author: "Sarah Johnson",
      title: "CIO, FinanceCorp International"
    },
    categories: ["AI Assistant", "Financial Services"]
  },
  {
    id: 2,
    title: "SmartFlow Workflow Automation",
    client: "MediCare Solutions",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    challenge: "Medical staff at MediCare Solutions were spending up to 40% of their time on administrative tasks, taking away from patient care. Manual processes were error-prone and inefficient.",
    solution: "We developed a custom workflow automation solution that streamlined documentation, approval processes, and scheduling. The AI-powered system could recognize patterns, prioritize tasks, and make intelligent routing decisions.",
    results: [
      "40% reduction in administrative workload",
      "60% faster document processing time",
      "85% decrease in data entry errors",
      "Estimated annual savings of $1.2 million"
    ],
    testimonial: {
      quote: "The SmartFlow system has given our medical staff back precious time that they now spend with patients. The reduction in errors and improvement in efficiency has been remarkable.",
      author: "Dr. Michael Lee",
      title: "Medical Director, MediCare Solutions"
    },
    categories: ["Workflow Automation", "Healthcare"]
  },
  {
    id: 3,
    title: "Predictive HR Analytics",
    client: "ManufactTech Industries",
    industry: "Manufacturing",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    challenge: "ManufactTech was experiencing high employee turnover, particularly among skilled workers. They had no system to predict which employees might be at risk of leaving or what factors were contributing to turnover.",
    solution: "We implemented our Predictive HR Analytics solution, which analyzed multiple data sources including performance reviews, attendance patterns, compensation data, and employee surveys to identify at-risk employees and recommend retention strategies.",
    results: [
      "25% improvement in employee retention rate within 6 months",
      "Identified key factors contributing to turnover",
      "Enabled proactive intervention for at-risk employees",
      "Estimated savings of $3.5M in recruitment and training costs"
    ],
    testimonial: {
      quote: "The insights from the predictive analytics tool have been invaluable. We've been able to address issues before they lead to resignations and create a more supportive work environment.",
      author: "Emma Wilson",
      title: "Head of HR, ManufactTech Industries"
    },
    categories: ["Predictive Analytics", "Manufacturing"]
  },
  {
    id: 4,
    title: "Multilingual Collaboration Platform",
    client: "GlobalRetail Corporation",
    industry: "Retail",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    challenge: "With operations in 12 countries, GlobalRetail struggled with language barriers that hampered collaboration, slowed decision-making, and created information silos between regional teams.",
    solution: "We developed a multilingual collaboration platform with real-time translation for chat, documents, and video meetings. The AI-powered system could understand industry-specific terminology and cultural nuances.",
    results: [
      "70% increase in cross-regional collaboration",
      "50% reduction in time spent on translation activities",
      "More inclusive meetings with participation from non-native English speakers",
      "Accelerated global product launches by 35%"
    ],
    testimonial: {
      quote: "The language barriers that once divided our global team have virtually disappeared. Ideas and information now flow freely between regions, and we're seeing the benefits in our innovation and execution speed.",
      author: "Thomas Garcia",
      title: "Global Operations Director, GlobalRetail Corporation"
    },
    categories: ["Multilingual Support", "Retail"]
  },
  {
    id: 5,
    title: "Sentiment Analysis Dashboard",
    client: "TechNova Solutions",
    industry: "Technology",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    challenge: "TechNova had no reliable way to gauge employee satisfaction and engagement in real-time. Annual surveys were too infrequent, and issues often went unnoticed until they became serious problems.",
    solution: "We implemented our Sentiment Analysis solution that anonymously analyzed communications, feedback, and system interactions to provide real-time insights into employee sentiment, with early warning systems for potential issues.",
    results: [
      "Identified and addressed 12 significant employee concerns before they escalated",
      "15% improvement in overall employee satisfaction scores",
      "Real-time visibility into the impact of organizational changes",
      "More targeted and effective employee engagement initiatives"
    ],
    testimonial: {
      quote: "Having a real-time pulse on employee sentiment has transformed how we manage our organization. We can see the immediate impact of our decisions and course-correct quickly when needed.",
      author: "Jennifer Patel",
      title: "Chief People Officer, TechNova Solutions"
    },
    categories: ["Sentiment Analysis", "Technology"]
  },
  {
    id: 6,
    title: "Custom AI Training Assistant",
    client: "EduLearn Academy",
    industry: "Education",
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    challenge: "EduLearn needed to provide personalized learning experiences for thousands of students while supporting instructors with limited time and resources. Their existing learning management system lacked adaptive capabilities.",
    solution: "We developed a custom AI Training Assistant that could provide personalized learning paths, answer student questions, generate practice materials, and provide instructors with insights into student performance and engagement.",
    results: [
      "32% improvement in course completion rates",
      "Student satisfaction increased from 3.6/5 to 4.7/5",
      "Instructors reported saving 15+ hours per week on routine tasks",
      "More equitable support for all students regardless of instructor availability"
    ],
    testimonial: {
      quote: "The AI Training Assistant has revolutionized how we deliver education. Our students receive more personalized support than ever before, and our instructors can focus on high-value interactions rather than routine questions.",
      author: "Professor David Kim",
      title: "Academic Director, EduLearn Academy"
    },
    categories: ["Custom AI", "Education"]
  }
];

const Projects = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredProjects = filter === "all" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(project => project.categories.some(cat => cat.toLowerCase().includes(filter.toLowerCase())));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-white mb-6">Our Success Stories</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Explore our portfolio of successful AI implementations that have transformed 
            digital employee experiences across various industries.
          </p>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="section bg-white">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="assistant">AI Assistants</TabsTrigger>
                  <TabsTrigger value="workflow">Workflow</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="custom">Custom Solutions</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      {project.industry}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-500 mb-4">{project.client}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.challenge.substring(0, 120)}...
                  </p>
                  <Link 
                    to={`#project-${project.id}`} 
                    className="text-blue-600 font-medium inline-flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`project-${project.id}`)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                  >
                    View case study <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Case Studies */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Detailed Case Studies</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Dive deeper into our transformative AI implementations and the measurable results they've delivered.
            </p>
          </div>
          
          <div className="space-y-20">
            {CASE_STUDIES.map((project) => (
              <div key={project.id} id={`project-${project.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-full">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {project.industry}
                      </Badge>
                      <div className="flex space-x-2">
                        {project.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-500 mb-6">Client: {project.client}</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold mb-2">Challenge</h4>
                        <p className="text-gray-600">{project.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold mb-2">Solution</h4>
                        <p className="text-gray-600">{project.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold mb-2">Results</h4>
                        <ul className="space-y-2">
                          {project.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mt-1 mr-2 w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 relative">
                        <div className="absolute top-4 left-4">
                          <Quote size={24} className="text-blue-300" />
                        </div>
                        <blockquote className="pl-8 pt-4">
                          <p className="italic text-gray-700 mb-4">"{project.testimonial.quote}"</p>
                          <footer>
                            <strong>{project.testimonial.author}</strong>
                            <p className="text-gray-500">{project.testimonial.title}</p>
                          </footer>
                        </blockquote>
                      </div>
                      
                      <div className="pt-4">
                        <Button asChild>
                          <Link to="/contact">
                            Discuss a similar project
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Transform Your Digital Workplace?</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            Let's discuss how our AI solutions can deliver similar results for your organization.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
