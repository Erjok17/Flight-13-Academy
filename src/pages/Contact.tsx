import { useState } from 'react';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#ED0037',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 48px)',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}>
          Contact Us
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 18px)',
          maxWidth: '600px',
          margin: '0 auto',
          opacity: 0.9
        }}>
          Get in touch with us. We'd love to hear from you!
        </p>
      </section>

      <main style={{ backgroundColor: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Two Column Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start'
          }}>
            
            {/* Left Column - Contact Info & Social Media */}
            <div>
              <h2 style={{ fontSize: '28px', color: 'var(--red)', marginBottom: '24px' }}>
                Get in Touch
              </h2>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
                Have questions about our programs? Want to register your child? 
                Reach out to us through any of the channels below or send us a message.
              </p>
              
              {/* Contact Details */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    backgroundColor: 'rgba(211,47,47,0.1)',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={24} color="var(--red)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Phone</h3>
                    <a href="tel:+256780898611" style={{ color: '#666', textDecoration: 'none' }}>
                      +256 780 898611
                    </a>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    backgroundColor: 'rgba(211,47,47,0.1)',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={24} color="var(--red)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Email</h3>
                    <a href="mailto:flight13@gmail.com" style={{ color: '#666', textDecoration: 'none' }}>
                      flight13@gmail.com
                    </a>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    backgroundColor: 'rgba(211,47,47,0.1)',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={24} color="var(--red)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Location</h3>
                    <p style={{ color: '#666' }}>Abja Parks, Naalya Estate</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links - Using Image Icons */}
              <div>
                <h3 style={{ fontSize: '20px', color: 'var(--red)', marginBottom: '20px' }}>
                  Follow Us
                </h3>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/flight_13_basketball_academy/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.3s',
                      width: '40px',
                      height: '40px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src="/images/ig-icon-white.png" 
                      alt="Instagram"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </a>
                  
                  {/* X (Twitter) */}
                  <a 
                    href="#" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.3s',
                      width: '36px',
                      height: '36px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src="/images/x-icon-white.png" 
                      alt="X (Twitter)"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </a>
                  
                  {/* YouTube */}
                  <a 
                    href="#" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.3s',
                      width: '44px',
                      height: '44px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src="/images/youtube-icon-white.png" 
                      alt="YouTube"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </a>
                  
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/256780898611" 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.3s',
                      width: '40px',
                      height: '40px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src="/images/whatsApp-ic.jpg" 
                      alt="WhatsApp"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </a>
                </div>
              </div>
              
              {/* Training Schedule Note */}
              <div style={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: `4px solid var(--red)`
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Training Days</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Monday, Wednesday, Friday & Saturday
                </p>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div>
              <h2 style={{ fontSize: '28px', color: 'var(--red)', marginBottom: '24px' }}>
                Send Us a Message
              </h2>
              
              {isSubmitted && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #c3e6cb'
                }}>
                  ✓ Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  >
                    <option value="">Select a subject</option>
                    <option value="Registration">Registration Inquiry</option>
                    <option value="Programs">Program Information</option>
                    <option value="Camps">Camp Registration</option>
                    <option value="Scholarship">Scholarship Information</option>
                    <option value="General">General Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    backgroundColor: 'var(--red)',
                    color: 'white',
                    border: 'none',
                    padding: '14px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s',
                    opacity: isLoading ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--red-dark)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--red)';
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      {/* Map Section */}
      <section style={{ backgroundColor: '#f9f9f9', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--red)', marginBottom: '24px', textAlign: 'center' }}>
            Find Us
          </h2>
          <div style={{
            backgroundColor: '#e0e0e0',
            height: '300px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url("/images/map-placeholder.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <MapPin size={32} color="var(--red)" />
              <p style={{ color: 'white', marginTop: '8px' }}>
                Abja Parks, Naalya Estate
              </p>
              <a 
                href="https://maps.google.com/?q=Abja+Parks+Naalya+Estate"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--red)',
                  fontSize: '14px',
                  marginTop: '8px',
                  display: 'inline-block'
                }}
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;