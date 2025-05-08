
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Events from './pages/Events';
import News from './pages/News';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NotFound from './pages/NotFound';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/admin/Dashboard';
import Inquiries from './pages/admin/Inquiries';
import Projects_Admin from './pages/admin/Projects';
import Testimonials_Admin from './pages/admin/Testimonials';
import Articles from './pages/admin/Articles';
import Events_Admin from './pages/admin/Events';
import Gallery from './pages/admin/Gallery';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/*" element={<Admin />} />
            
            {/* These routes will be handled by the nested routing in Admin.tsx */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/inquiries" element={<Inquiries />} />
            <Route path="/admin/projects" element={<Projects_Admin />} />
            <Route path="/admin/testimonials" element={<Testimonials_Admin />} />
            <Route path="/admin/articles" element={<Articles />} />
            <Route path="/admin/events" element={<Events_Admin />} />
            <Route path="/admin/gallery" element={<Gallery />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
