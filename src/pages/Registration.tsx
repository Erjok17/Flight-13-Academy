import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { API_URL } from '../config/api';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Athlete Info
    athleteName: '',
    dateOfBirth: '',
    gender: '',
    school: '',
    grade: '',
    experienceLevel: '',
    jerseySize: '',
    medicalConditions: '',
    
    // Parent Info
    parentName: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    
    // Program Selection
    programType: '',
    preferredDays: '',
    hearAboutUs: '',
    
    // Terms
    agreeTerms: false,
    agreeMedical: false,
    agreePhoto: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to submit a registration.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          athlete_name: formData.athleteName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          school: formData.school,
          grade: formData.grade,
          experience_level: formData.experienceLevel,
          jersey_size: formData.jerseySize,
          medical_conditions: formData.medicalConditions,
          parent_name: formData.parentName,
          relationship: formData.relationship,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          emergency_contact: formData.emergencyContact,
          program_type: formData.programType,
          preferred_days: formData.preferredDays,
          hear_about_us: formData.hearAboutUs
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit registration. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Failed to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ color: 'var(--red)', marginBottom: '16px' }}>Registration Submitted!</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Thank you for registering with Flight 13! We'll contact you within 48 hours to confirm your spot.
            </p>
            <Link to="/" style={{ backgroundColor: 'var(--red)', color: 'white', padding: '12px 28px', borderRadius: '30px', textDecoration: 'none', display: 'inline-block' }}>
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--red)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Register for Flight 13</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
          Join our elite basketball program. Fill out the form below to get started.
        </p>
      </section>

      <main style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Progress Steps */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            {['Athlete Info', 'Parent Info', 'Program', 'Terms'].map((label, idx) => (
              <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: step === idx + 1 ? 'var(--red)' : step > idx + 1 ? 'var(--red)' : '#ddd',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  fontWeight: 'bold'
                }}>
                  {step > idx + 1 ? '✓' : idx + 1}
                </div>
                <div style={{ fontSize: '12px', color: step === idx + 1 ? 'var(--red)' : '#888' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            
            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                {error}
              </div>
            )}
            {/* Step 1: Athlete Information */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '24px', color: 'var(--red)', marginBottom: '24px' }}>Athlete Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name *</label>
                  <input type="text" name="athleteName" value={formData.athleteName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>School *</label>
                    <input type="text" name="school" value={formData.school} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Grade</label>
                    <input type="text" name="grade" value={formData.grade} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Basketball Experience</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Jersey Size</label>
                  <select name="jerseySize" value={formData.jerseySize} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <option value="">Select</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Medical Conditions / Allergies</label>
                  <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} placeholder="Please list any medical conditions or allergies..." />
                </div>
              </div>
            )}

            {/* Step 2: Parent/Guardian Information */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '24px', color: 'var(--red)', marginBottom: '24px' }}>Parent/Guardian Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Parent/Guardian Full Name *</label>
                  <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Relationship to Athlete</label>
                  <input type="text" name="relationship" value={formData.relationship} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} placeholder="e.g., Father, Mother, Guardian" />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Physical Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Emergency Contact (Name & Phone) *</label>
                  <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} placeholder="e.g., Jane Doe - 0777123456" />
                </div>
              </div>
            )}

            {/* Step 3: Program Selection */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '24px', color: 'var(--red)', marginBottom: '24px' }}>Program Selection</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Program Type *</label>
                  <select name="programType" value={formData.programType} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <option value="">Select a program</option>
                    <option value="Weekly Practices">Weekly Practices</option>
                    <option value="Holiday Camps">Holiday Camps</option>
                    <option value="Private Sessions">Private Sessions</option>
                    <option value="Competitive Games">Competitive Games</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Preferred Training Days</label>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {['Monday', 'Wednesday', 'Friday', 'Saturday'].map(day => (
                      <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input type="checkbox" name="preferredDays" value={day} onChange={handleChange} />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>How did you hear about us?</label>
                  <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <option value="">Select</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Friend/Family">Friend/Family</option>
                    <option value="School">School</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Terms & Submit */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: '24px', color: 'var(--red)', marginBottom: '24px' }}>Terms & Conditions</h2>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                    <span>I agree to the <a href="#" style={{ color: 'var(--red)' }}>Terms and Conditions</a> of Flight 13</span>
                  </label>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" name="agreeMedical" checked={formData.agreeMedical} onChange={handleChange} required />
                    <span>I confirm that the medical information provided is accurate and consent to emergency treatment</span>
                  </label>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" name="agreePhoto" checked={formData.agreePhoto} onChange={handleChange} />
                    <span>I consent to photos/videos of my child being used for promotional purposes</span>
                  </label>
                </div>
                
                <div style={{
                  backgroundColor: '#f9f9f9',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                    <strong>Registration Fee:</strong> UGX 50,000 (non-refundable)
                  </p>
                  <p style={{ fontSize: '12px', color: '#888' }}>
                    Payment details will be sent to your email after submission.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
              {step > 1 && (
                <button type="button" onClick={prevStep} style={{ backgroundColor: '#ddd', color: '#333', padding: '12px 24px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                  ← Back
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={nextStep} style={{ backgroundColor: 'var(--red)', color: 'white', padding: '12px 24px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto' }}>
                  Next →
                </button>
              ) : (
                <button type="submit" disabled={isLoading} style={{ backgroundColor: 'var(--red)', color: 'white', padding: '12px 24px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto', opacity: isLoading ? 0.7 : 1 }}>
                  {isLoading ? 'Submitting...' : 'Submit Registration'}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Registration;