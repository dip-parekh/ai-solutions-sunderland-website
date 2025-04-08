
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';

const NEWS_ARTICLES = [
  {
    id: 1,
    title: "How AI is Revolutionizing Employee Onboarding",
    excerpt: "Discover how artificial intelligence is making the employee onboarding process smoother and more effective. From personalized learning paths to automated documentation verification, AI is transforming how new team members join organizations.",
    content: `
      <p>Employee onboarding is a critical process that can significantly impact retention and productivity. Traditional onboarding methods often involve overwhelming paperwork, repetitive orientations, and inconsistent experiences across departments. Artificial intelligence is changing this landscape dramatically.</p>
      
      <h3>Personalized Learning Journeys</h3>
      <p>AI-powered onboarding platforms can analyze a new employee's role, background, and learning style to create tailored training paths. This ensures that each team member receives the most relevant information in a format that works best for them.</p>
      
      <h3>Automated Documentation Handling</h3>
      <p>One of the most tedious aspects of onboarding is documentation. AI systems can now verify, process, and organize employee documents automatically, reducing administrative burden and ensuring compliance.</p>
      
      <h3>Intelligent Virtual Assistants</h3>
      <p>New employees often have many questions during their first weeks. AI assistants provide 24/7 support, answering common questions instantly and directing more complex inquiries to the appropriate department.</p>
      
      <h3>Predictive Analytics for Success</h3>
      <p>AI can analyze patterns from successful onboarding experiences to identify potential challenges for new hires. This allows HR teams to proactively address issues before they impact employee satisfaction or performance.</p>
      
      <p>At AI-Solutions, we've helped organizations reduce onboarding time by up to 35% while improving new hire satisfaction scores. Our AI Virtual Assistant specifically designed for onboarding has shown particular success in large enterprises with frequent hiring needs.</p>
    `,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    author: "Jennifer Parker",
    date: "April 2, 2025",
    category: "AI Trends",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Future of AI in Workplace Communication",
    excerpt: "Learn about emerging AI technologies that are transforming how teams communicate in the digital workplace. From real-time translation to sentiment analysis, these tools are breaking down barriers and enhancing collaboration.",
    content: `
      <p>Workplace communication has evolved dramatically in recent years, with remote and hybrid work arrangements becoming the norm. AI technologies are now playing a crucial role in making these communications more effective, inclusive, and meaningful.</p>
      
      <h3>Breaking Language Barriers</h3>
      <p>Global teams face significant challenges when working across multiple languages. AI-powered real-time translation is eliminating these barriers, allowing team members to communicate in their native language while others receive messages in theirs. The technology has advanced to understand industry-specific terminology and even cultural nuances.</p>
      
      <h3>Enhanced Meeting Experiences</h3>
      <p>AI is transforming virtual meetings through automated transcription, action item extraction, and participation analytics. Some advanced systems can even analyze speaking patterns to encourage more balanced participation from all attendees.</p>
      
      <h3>Sentiment Analysis and Emotional Intelligence</h3>
      <p>Understanding not just what is said but how it's said can be crucial for effective communication. AI tools can now analyze written and verbal communications to detect sentiment, suggesting alternative phrasing when messages might be misinterpreted or received negatively.</p>
      
      <h3>Predictive Communication Tools</h3>
      <p>The next generation of communication tools will anticipate needs before they're expressed. From suggesting relevant documents during discussions to recommending the most appropriate time and medium for reaching out to colleagues, these AI systems will make communication more efficient and effective.</p>
      
      <p>Our Multilingual Collaboration Platform has been implemented by organizations with global workforces, resulting in a 70% increase in cross-regional collaboration and significantly faster decision-making processes.</p>
    `,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    author: "Michael Robertson",
    date: "March 28, 2025",
    category: "Communication",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Case Study: AI-Powered Employee Support at Finance Corp",
    excerpt: "How we helped a leading financial institution improve their employee support with intelligent automation. This implementation resulted in a 45% reduction in support tickets and significant cost savings.",
    content: `
      <p>Finance Corp, a leading financial services provider with over 5,000 employees across 12 countries, was facing significant challenges with their internal employee support systems. Support tickets were taking an average of 24 hours to resolve, employee satisfaction with IT services was declining, and the support team was overwhelmed with repetitive questions.</p>
      
      <h3>The Challenge</h3>
      <p>The company's growth had outpaced their support infrastructure, resulting in:</p>
      <ul>
        <li>Over 3,000 support tickets monthly, 60% of which were for common, repetitive issues</li>
        <li>Average resolution time of 24+ hours</li>
        <li>Employee satisfaction scores of only 65% for IT support</li>
        <li>Support team burnout and high turnover</li>
      </ul>
      
      <h3>Our Solution</h3>
      <p>We implemented our AI Virtual Assistant solution, customized for Finance Corp's specific environment and integrated with their existing systems. The implementation included:</p>
      <ul>
        <li>Natural language processing to understand and respond to employee queries</li>
        <li>Integration with knowledge bases, documentation, and internal systems</li>
        <li>Automated ticket creation and routing for complex issues</li>
        <li>Continuous learning capabilities to improve over time</li>
      </ul>
      
      <h3>The Results</h3>
      <p>Within three months of implementation, Finance Corp experienced:</p>
      <ul>
        <li>45% reduction in support tickets</li>
        <li>Average resolution time reduced to under 5 minutes for common issues</li>
        <li>Employee satisfaction scores increased to 92%</li>
        <li>Support team reallocation to more complex, high-value tasks</li>
        <li>Estimated annual savings of $1.2 million</li>
      </ul>
      
      <p>The AI assistant now handles over 70% of all employee support interactions, learning and improving with each conversation. The system has been particularly valuable for supporting remote employees across different time zones, providing 24/7 assistance regardless of location.</p>
      
      <p>"The AI assistant has transformed how we support our employees," says Sarah Johnson, CIO at Finance Corp. "Issues that used to take days to resolve are now handled in minutes, and our team can focus on more strategic initiatives."</p>
    `,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    author: "Thomas White",
    date: "March 20, 2025",
    category: "Case Study",
    readTime: "8 min read"
  },
  {
    id: 4,
    title: "5 Ways AI is Improving Employee Well-being",
    excerpt: "Discover how organizations are using artificial intelligence to support employee mental health, reduce burnout, and create more balanced work environments.",
    content: `
      <p>Employee well-being has become a top priority for organizations worldwide, particularly in the wake of increasing remote work and the blurring lines between professional and personal life. Artificial intelligence is emerging as a powerful tool to support well-being initiatives in ways that were previously impossible.</p>
      
      <h3>1. Early Detection of Burnout Signals</h3>
      <p>AI systems can analyze patterns in employee digital behavior—such as email response times, after-hours activity, and meeting attendance—to identify potential signs of burnout before they become serious problems. These systems respect privacy while providing aggregated insights that help organizations take proactive measures.</p>
      
      <h3>2. Personalized Well-being Recommendations</h3>
      <p>Just as streaming services recommend content based on viewing habits, AI can suggest personalized well-being activities based on an employee's role, work patterns, and preferences. From microbreaks to mindfulness exercises tailored to individual needs, these recommendations help maintain balance throughout the workday.</p>
      
      <h3>3. Intelligent Workload Distribution</h3>
      <p>AI workforce management tools can identify when teams or individuals are consistently overloaded and recommend workload rebalancing. These systems consider skills, current assignments, and capacity to ensure more equitable distribution of tasks.</p>
      
      <h3>4. Virtual Wellness Coaches</h3>
      <p>AI-powered wellness coaches provide personalized support for physical and mental health goals. These virtual assistants can check in regularly, provide encouragement, and offer resources tailored to each employee's wellness journey.</p>
      
      <h3>5. Enhanced Work Environment Optimization</h3>
      <p>For office environments, AI systems can optimize lighting, temperature, and noise levels based on occupancy and preferences. For remote workers, AI assistants can suggest optimal break times and environmental adjustments to support productivity and comfort.</p>
      
      <p>Our Sentiment Analysis Dashboard has helped organizations identify well-being challenges early and implement targeted interventions, resulting in measurable improvements in employee satisfaction and retention.</p>
    `,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    author: "Emma Chen",
    date: "March 15, 2025",
    category: "Employee Well-being",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "AI Ethics in the Workplace: Balancing Innovation and Privacy",
    excerpt: "As AI becomes more prevalent in workplace tools, organizations must navigate complex ethical considerations around data usage, privacy, and transparency. Learn how to implement AI responsibly.",
    content: `
      <p>The rapid adoption of AI technologies in the workplace brings tremendous benefits but also raises important ethical questions that organizations must address. Striking the right balance between innovation and ethical considerations is crucial for sustainable AI implementation.</p>
      
      <h3>Transparency and Explainability</h3>
      <p>Employees have the right to understand when and how AI systems are being used, particularly when these systems influence decisions that affect them. Organizations should prioritize AI solutions that can explain their reasoning and provide clear documentation on how automated decisions are made.</p>
      
      <h3>Data Privacy and Consent</h3>
      <p>AI systems often rely on large amounts of data to function effectively. Organizations must implement robust data governance frameworks that clearly define what employee data is collected, how it's used, and who has access to it. Obtaining informed consent and providing opt-out options are essential practices.</p>
      
      <h3>Avoiding Algorithmic Bias</h3>
      <p>AI systems can inadvertently perpetuate or amplify existing biases if not carefully designed and monitored. Regular auditing of AI systems for potential bias, particularly in HR applications like recruitment or performance evaluation, is critical for ensuring fairness and equity.</p>
      
      <h3>Human Oversight and Intervention</h3>
      <p>While automation brings efficiency, maintaining appropriate human oversight is essential. Organizations should implement mechanisms for employees to appeal automated decisions and ensure that humans remain accountable for significant decisions affecting people.</p>
      
      <h3>Continuous Ethical Review</h3>
      <p>As AI technologies evolve rapidly, organizations should establish ethics committees or review processes to regularly assess the impact of AI systems and adjust practices as needed. This includes considering not just what can be done with AI, but what should be done.</p>
      
      <p>At AI-Solutions, we've developed an ethical framework that guides all our implementations, ensuring that our AI solutions enhance the workplace while respecting employee rights and organizational values.</p>
    `,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    author: "Dr. Rachel Kim",
    date: "March 8, 2025",
    category: "AI Ethics",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Integrating AI with Legacy Systems: Challenges and Solutions",
    excerpt: "Many organizations struggle to implement AI solutions alongside their existing infrastructure. This article explores practical approaches to overcome integration challenges and maximize ROI.",
    content: `
      <p>Despite the clear benefits of AI for improving digital employee experiences, many organizations face significant challenges when implementing these technologies alongside legacy systems. These integration challenges can limit the effectiveness of AI initiatives and reduce return on investment.</p>
      
      <h3>Common Integration Challenges</h3>
      <p>Organizations typically encounter several obstacles when integrating AI with existing infrastructure:</p>
      <ul>
        <li><strong>Data silos:</strong> Legacy systems often store data in formats that are difficult for AI systems to access and utilize effectively.</li>
        <li><strong>Technical compatibility:</strong> Older systems may use outdated protocols or architectures that don't easily connect with modern AI platforms.</li>
        <li><strong>Performance impacts:</strong> Poorly implemented integrations can negatively affect the performance of critical legacy systems.</li>
        <li><strong>Security concerns:</strong> Creating connections between systems can introduce new security vulnerabilities if not properly managed.</li>
      </ul>
      
      <h3>Strategic Approaches to Integration</h3>
      <p>Based on our experience implementing AI solutions across various organizational environments, we've developed several strategies for successful integration:</p>
      
      <h4>1. API-First Approach</h4>
      <p>Developing API layers that sit between legacy systems and AI solutions allows for data exchange without requiring major modifications to existing systems. This approach minimizes risk while enabling AI systems to access the data they need.</p>
      
      <h4>2. Intelligent Middleware</h4>
      <p>Purpose-built middleware can transform data between formats, handle security requirements, and manage communication between disparate systems. This creates a flexible architecture that can adapt as both legacy systems and AI capabilities evolve.</p>
      
      <h4>3. Phased Implementation</h4>
      <p>Rather than attempting a complete integration at once, organizations can achieve better results by identifying high-value use cases and implementing them sequentially. This approach allows for learning and adjustment throughout the process.</p>
      
      <h4>4. Hybrid Cloud Strategies</h4>
      <p>Using hybrid cloud architectures can provide a bridge between on-premises legacy systems and cloud-based AI capabilities, offering the benefits of both environments while addressing security and compliance requirements.</p>
      
      <p>Our workflow automation solution for MediCare Solutions incorporated these integration strategies to connect with their legacy electronic medical records system, achieving successful integration without disruption to critical services.</p>
    `,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    author: "Robert Chen",
    date: "March 1, 2025",
    category: "Implementation",
    readTime: "10 min read"
  }
];

const ArticlePreview = ({ article }: { article: typeof NEWS_ARTICLES[0] }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            {article.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={14} className="mr-1" /> {article.readTime}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" /> {article.date}
          </div>
          <Link to={`/news/${article.id}`} className="text-blue-600 font-medium inline-flex items-center">
            Read more <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const ArticleDetail = ({ article, onBack }: { article: typeof NEWS_ARTICLES[0], onBack: () => void }) => {
  return (
    <div>
      <Button variant="outline" onClick={onBack} className="mb-6">
        &larr; Back to all articles
      </Button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-80 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              {article.category}
            </Badge>
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" /> {article.date}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" /> {article.readTime}
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-500 mb-8">By {article.author}</p>
          
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}></div>
          
          <hr className="my-8" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p className="font-bold">Share this article:</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <Button asChild className="mt-6 sm:mt-0">
              <Link to="/contact">Get in touch about this topic</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.filter(a => a.id !== article.id)
            .filter(a => a.category === article.category || Math.random() > 0.5)
            .slice(0, 3)
            .map(article => (
              <ArticlePreview key={article.id} article={article} />
            ))}
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  
  const selectedArticle = selectedArticleId 
    ? NEWS_ARTICLES.find(a => a.id === selectedArticleId) 
    : null;
    
  const filteredArticles = searchQuery 
    ? NEWS_ARTICLES.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : NEWS_ARTICLES;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is handled by the state already
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-white mb-6">News & Insights</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest trends, case studies, and insights on AI technology 
            and digital employee experience.
          </p>
        </div>
      </section>
      
      <section className="section bg-white">
        <div className="container-custom">
          {selectedArticle ? (
            <ArticleDetail 
              article={selectedArticle} 
              onBack={() => setSelectedArticleId(null)} 
            />
          ) : (
            <>
              {/* Search Bar */}
              <div className="max-w-xl mx-auto mb-12">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    placeholder="Search articles by title, content or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </form>
              </div>
              
              {/* Featured Article */}
              <div className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-80 lg:h-auto">
                    <img 
                      src={NEWS_ARTICLES[0].image}
                      alt={NEWS_ARTICLES[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {NEWS_ARTICLES[0].category}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" /> {NEWS_ARTICLES[0].date}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{NEWS_ARTICLES[0].title}</h2>
                    <p className="text-gray-600 mb-6">{NEWS_ARTICLES[0].excerpt}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500">By {NEWS_ARTICLES[0].author}</p>
                      <Button 
                        onClick={() => setSelectedArticleId(NEWS_ARTICLES[0].id)}
                        className="btn-primary"
                      >
                        Read Article
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <div 
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="cursor-pointer"
                  >
                    <ArticlePreview article={article} />
                  </div>
                ))}
              </div>
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
                  <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      {!selectedArticle && (
        <section className="section bg-blue-50">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest insights, case studies, and AI advancements. 
              We'll send you our best content, no more than once a week.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                placeholder="Enter your email address"
                type="email"
                required
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default News;
