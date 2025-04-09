
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, ChevronRight, Users, Clock, Globe, TrendingUp, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl text-white mb-6">About AI-Solutions</h1>
            <p className="text-lg text-blue-100">
              We're on a mission to transform digital employee experiences through
              intelligent, human-centered AI solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2021 in Sunderland, AI-Solutions began with a simple yet powerful idea: 
                to make workplace technology more intuitive, helpful, and human. Our founders, a team of 
                AI researchers and UX specialists, recognized that despite rapid advancements in artificial 
                intelligence, most workplace tools remained frustrating, complicated, and disconnected.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a small team of five innovators has grown into a thriving company 
                of over 50 specialists, working with organizations across industries to reimagine 
                how employees interact with technology. We believe that when people have better 
                digital tools, they can focus on what truly matters - creativity, collaboration, 
                and meaningful work.
              </p>
              <Button asChild className="btn-primary">
                <Link to="/contact">Work With Us</Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="AI-Solutions team collaborating" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-5 -left-5 bg-teal-500 rounded-lg p-4 text-white">
                <span className="text-xl font-bold">Since 2021</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 text-lg">
              We're guided by strong principles that shape everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To create AI-powered solutions that transform the digital employee experience, 
                making work more intuitive, efficient, and satisfying across all industries.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where technology adapts to humans, not the other way around - where 
                every digital interaction in the workplace is seamless, intelligent, and empowering.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={32} />,
                title: "Human-Centered",
                description: "We design for people first, focusing on real needs and experiences."
              },
              {
                icon: <Award size={32} />,
                title: "Excellence",
                description: "We pursue the highest quality in everything we create and deliver."
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Innovation",
                description: "We continuously explore new possibilities and push boundaries."
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Integrity",
                description: "We operate with transparency, honesty and ethical responsibility."
              },
              {
                icon: <Clock size={32} />,
                title: "Adaptability",
                description: "We embrace change and evolve quickly to meet emerging needs."
              },
              {
                icon: <Globe size={32} />,
                title: "Impact",
                description: "We measure success by the positive difference we make."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-blue-600 text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 text-lg">
              The passionate experts behind our innovative AI solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                bio: "Former AI research lead with 15+ years experience in tech innovation."
              },
              {
                name: "James Wilson",
                role: "Chief Technology Officer",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                bio: "Machine learning expert with previous experience at leading tech companies."
              },
              {
                name: "Mira Patel",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                bio: "Award-winning UX designer dedicated to creating human-centered interfaces."
              },
              {
                name: "Thomas Okonkwo",
                role: "Head of Client Solutions",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                bio: "10+ years experience delivering digital transformation projects."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Team Members" },
              { value: "100+", label: "Projects Delivered" },
              { value: "30+", label: "Global Clients" },
              { value: "96%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Join Our Journey</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Whether you're looking to partner with us or join our growing team,
            we're always looking for new opportunities to make an impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/contact">Work With Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-outline">
              <Link to="/contact">
                Careers <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
