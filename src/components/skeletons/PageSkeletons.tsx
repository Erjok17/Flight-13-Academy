import SkeletonBase from './SkeletonBase';
import { CoachesSectionSkeleton, TrainWithPurposeSkeleton } from './SectionsSkeletons';

// 1. Home Page Skeleton
export const HomeSkeleton = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section Skeleton */}
      <div style={{ backgroundColor: '#111', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '85%', maxWidth: '1400px', display: 'flex', flexDirection: 'column', padding: '0 10%' }}>
          <SkeletonBase type="title" width="300px" height="24px" style={{ backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: '8px' }} />
          <SkeletonBase type="title" width="180px" height="18px" style={{ backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: '24px' }} />
          <SkeletonBase type="title" width="80%" height="48px" style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '12px' }} />
          <SkeletonBase type="title" width="400px" height="32px" style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '32px' }} />
          {/* Glass Card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '16px 20px',
            borderRadius: '12px',
            maxWidth: '500px',
            marginBottom: '24px'
          }}>
            <SkeletonBase type="title" width="160px" height="18px" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <SkeletonBase type="text" width="100%" height="14px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <SkeletonBase type="text" width="90%" height="14px" style={{ backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 0 }} />
          </div>
          <SkeletonBase type="button" width="220px" height="48px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* TrainWithPurpose Skeleton */}
      <TrainWithPurposeSkeleton />

      {/* Scholarship Slideshow Section */}
      <div style={{ padding: '60px 0', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SkeletonBase type="title" width="280px" height="32px" style={{ marginBottom: '16px' }} />
        <SkeletonBase type="text" width="480px" height="16px" style={{ marginBottom: '40px' }} />
        <SkeletonBase type="rectangle" width="800px" height="280px" borderRadius="20px" />
      </div>

      {/* Coaches Section Skeleton */}
      <CoachesSectionSkeleton />
    </div>
  );
};

// 2. About Page Skeleton
export const AboutSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Title */}
        <SkeletonBase type="title" width="220px" height="40px" style={{ marginBottom: '40px' }} />

        {/* Content Splits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '60px', marginBottom: '80px' }}>
          <div>
            <SkeletonBase type="title" width="280px" height="30px" style={{ marginBottom: '24px' }} />
            <SkeletonBase type="text" width="100%" height="16px" />
            <SkeletonBase type="text" width="100%" height="16px" />
            <SkeletonBase type="text" width="95%" height="16px" />
            <SkeletonBase type="text" width="98%" height="16px" />
            <SkeletonBase type="text" width="80%" height="16px" style={{ marginBottom: '24px' }} />
            
            <SkeletonBase type="title" width="240px" height="30px" style={{ marginBottom: '24px' }} />
            <SkeletonBase type="text" width="100%" height="16px" />
            <SkeletonBase type="text" width="90%" height="16px" style={{ marginBottom: 0 }} />
          </div>
          <div>
            <SkeletonBase type="rectangle" height="400px" borderRadius="12px" />
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          padding: '40px 0',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
          marginBottom: '80px',
          textAlign: 'center'
        }}>
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SkeletonBase type="title" width="100px" height="48px" style={{ marginBottom: '8px' }} />
              <SkeletonBase type="text" width="120px" height="16px" style={{ marginBottom: 0 }} />
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <SkeletonBase type="title" width="200px" height="32px" style={{ marginBottom: '40px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {[1, 2, 3].map((idx) => (
            <div key={idx}>
              <SkeletonBase type="thumbnail" height="320px" style={{ marginBottom: '20px' }} />
              <SkeletonBase type="title" width="160px" height="22px" style={{ marginBottom: '8px' }} />
              <SkeletonBase type="text" width="100px" height="14px" style={{ marginBottom: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Programs Page Skeleton
export const ProgramsSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <SkeletonBase type="title" width="260px" height="40px" style={{ marginBottom: '40px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
          {/* Left Sidebar List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4].map((idx) => (
              <SkeletonBase key={idx} type="rectangle" height="70px" borderRadius="8px" />
            ))}
          </div>

          {/* Right Main Content */}
          <div>
            <SkeletonBase type="thumbnail" height="400px" style={{ marginBottom: '32px' }} />
            <SkeletonBase type="title" width="360px" height="32px" style={{ marginBottom: '16px' }} />
            <SkeletonBase type="text" width="100%" height="16px" />
            <SkeletonBase type="text" width="100%" height="16px" />
            <SkeletonBase type="text" width="90%" height="16px" style={{ marginBottom: '32px' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
              <div>
                <SkeletonBase type="title" width="140px" height="20px" style={{ marginBottom: '16px' }} />
                <SkeletonBase type="text" width="80%" height="15px" />
                <SkeletonBase type="text" width="70%" height="15px" style={{ marginBottom: 0 }} />
              </div>
              <div>
                <SkeletonBase type="title" width="140px" height="20px" style={{ marginBottom: '16px' }} />
                <SkeletonBase type="text" width="90%" height="15px" />
                <SkeletonBase type="text" width="85%" height="15px" style={{ marginBottom: 0 }} />
              </div>
            </div>

            <SkeletonBase type="button" width="180px" height="44px" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Shop Page Skeleton
export const ShopSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <SkeletonBase type="title" width="180px" height="40px" style={{ marginBottom: '40px' }} />

        {/* Filters and Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
          {/* Sidebar Filters */}
          <div>
            <SkeletonBase type="title" width="120px" height="20px" style={{ marginBottom: '20px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <SkeletonBase type="rectangle" width="18px" height="18px" borderRadius="3px" style={{ marginBottom: 0 }} />
                  <SkeletonBase type="text" width="100px" height="14px" style={{ marginBottom: 0 }} />
                </div>
              ))}
            </div>
            
            <SkeletonBase type="title" width="120px" height="20px" style={{ marginBottom: '20px' }} />
            <SkeletonBase type="rectangle" height="30px" borderRadius="4px" />
          </div>

          {/* Product cards list */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <SkeletonBase type="text" width="140px" height="16px" style={{ marginBottom: 0 }} />
              <SkeletonBase type="rectangle" width="160px" height="36px" borderRadius="4px" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} style={{ border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden', paddingBottom: '20px' }}>
                  <SkeletonBase type="thumbnail" height="260px" borderRadius="0px" style={{ marginBottom: '16px' }} />
                  <div style={{ padding: '0 16px' }}>
                    <SkeletonBase type="text" width="80px" height="12px" style={{ marginBottom: '8px' }} />
                    <SkeletonBase type="title" width="100%" height="18px" style={{ marginBottom: '8px' }} />
                    <SkeletonBase type="text" width="60px" height="16px" style={{ marginBottom: '16px' }} />
                    <SkeletonBase type="button" width="100%" height="40px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Product Detail Page Skeleton
export const ProductDetailSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <SkeletonBase type="text" width="220px" height="16px" style={{ marginBottom: '32px' }} />

        {/* Gallery + Meta details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '60px', marginBottom: '60px' }}>
          {/* Gallery slot */}
          <div>
            <SkeletonBase type="thumbnail" height="480px" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              {[1, 2, 3, 4].map((idx) => (
                <SkeletonBase key={idx} type="rectangle" width="80px" height="80px" borderRadius="8px" />
              ))}
            </div>
          </div>

          {/* Details metadata */}
          <div>
            <SkeletonBase type="text" width="100px" height="12px" style={{ marginBottom: '12px' }} />
            <SkeletonBase type="title" width="90%" height="36px" style={{ marginBottom: '12px' }} />
            <SkeletonBase type="title" width="120px" height="28px" style={{ marginBottom: '24px' }} />
            
            <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '20px 0', marginBottom: '24px' }}>
              <SkeletonBase type="text" width="100%" height="14px" />
              <SkeletonBase type="text" width="100%" height="14px" />
              <SkeletonBase type="text" width="85%" height="14px" style={{ marginBottom: 0 }} />
            </div>

            {/* Selector Option values */}
            <div style={{ marginBottom: '24px' }}>
              <SkeletonBase type="text" width="60px" height="14px" style={{ marginBottom: '12px' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <SkeletonBase key={size} type="rectangle" width="40px" height="40px" borderRadius="6px" />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <SkeletonBase type="rectangle" width="120px" height="48px" borderRadius="6px" />
              <SkeletonBase type="button" width="100%" height="48px" style={{ flex: 1 }} />
            </div>
            
            <SkeletonBase type="text" width="180px" height="14px" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Contact Page Skeleton
export const ContactSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Title */}
        <SkeletonBase type="title" width="220px" height="40px" style={{ marginBottom: '48px' }} />

        {/* Splits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '60px' }}>
          {/* Details splits */}
          <div>
            <SkeletonBase type="title" width="260px" height="28px" style={{ marginBottom: '20px' }} />
            <SkeletonBase type="text" width="90%" height="16px" style={{ marginBottom: '32px' }} />

            {[1, 2, 3].map((idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <SkeletonBase type="avatar" width="48px" height="48px" />
                <div>
                  <SkeletonBase type="text" width="120px" height="16px" style={{ marginBottom: '6px' }} />
                  <SkeletonBase type="text" width="180px" height="14px" style={{ marginBottom: 0 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Message form skeleton */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
            <SkeletonBase type="title" width="180px" height="24px" style={{ marginBottom: '24px' }} />
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}><SkeletonBase type="rectangle" height="40px" borderRadius="6px" /></div>
              <div style={{ flex: 1 }}><SkeletonBase type="rectangle" height="40px" borderRadius="6px" /></div>
            </div>
            <div style={{ marginBottom: '20px' }}><SkeletonBase type="rectangle" height="40px" borderRadius="6px" /></div>
            <div style={{ marginBottom: '20px' }}><SkeletonBase type="rectangle" height="120px" borderRadius="6px" /></div>
            <SkeletonBase type="button" width="100%" height="44px" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Checkout Page Skeleton
export const CheckoutSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <SkeletonBase type="title" width="220px" height="40px" style={{ marginBottom: '40px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>
          {/* Shipping Form inputs */}
          <div>
            <SkeletonBase type="title" width="180px" height="24px" style={{ marginBottom: '20px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
            </div>
            <SkeletonBase type="rectangle" height="40px" borderRadius="6px" style={{ marginBottom: '16px' }} />
            <SkeletonBase type="rectangle" height="40px" borderRadius="6px" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
            </div>

            <SkeletonBase type="title" width="180px" height="24px" style={{ marginBottom: '20px' }} />
            <SkeletonBase type="rectangle" height="40px" borderRadius="6px" style={{ marginBottom: '16px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
              <SkeletonBase type="rectangle" height="40px" borderRadius="6px" />
            </div>

            <SkeletonBase type="button" width="200px" height="48px" />
          </div>

          {/* Cart summary list */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', alignSelf: 'start' }}>
            <SkeletonBase type="title" width="140px" height="20px" style={{ marginBottom: '20px' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[1, 2].map((idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <SkeletonBase type="rectangle" width="50px" height="50px" borderRadius="6px" />
                  <div style={{ flex: 1 }}>
                    <SkeletonBase type="text" width="120px" height="14px" style={{ marginBottom: '4px' }} />
                    <SkeletonBase type="text" width="40px" height="12px" style={{ marginBottom: 0 }} />
                  </div>
                  <SkeletonBase type="text" width="50px" height="14px" style={{ marginBottom: 0 }} />
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <SkeletonBase type="text" width="60px" height="14px" style={{ marginBottom: 0 }} />
                <SkeletonBase type="text" width="50px" height="14px" style={{ marginBottom: 0 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <SkeletonBase type="text" width="60px" height="14px" style={{ marginBottom: 0 }} />
                <SkeletonBase type="text" width="40px" height="14px" style={{ marginBottom: 0 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '16px', marginTop: '8px' }}>
                <SkeletonBase type="title" width="80px" height="18px" style={{ marginBottom: 0 }} />
                <SkeletonBase type="title" width="60px" height="18px" style={{ marginBottom: 0 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Media Gallery Page Skeleton
export const MediaSkeleton = () => {
  return (
    <div style={{ width: '100%', padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <SkeletonBase type="title" width="160px" height="40px" style={{ marginBottom: '24px' }} />

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          <SkeletonBase type="rectangle" width="100px" height="36px" borderRadius="6px" />
          <SkeletonBase type="rectangle" width="100px" height="36px" borderRadius="6px" />
          <SkeletonBase type="rectangle" width="100px" height="36px" borderRadius="6px" />
        </div>

        {/* Media grid items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} style={{ border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden', paddingBottom: '16px' }}>
              <SkeletonBase type="thumbnail" height="200px" borderRadius="0px" style={{ marginBottom: '16px' }} />
              <div style={{ padding: '0 16px' }}>
                <SkeletonBase type="title" width="80%" height="20px" style={{ marginBottom: '8px' }} />
                <SkeletonBase type="text" width="40%" height="12px" style={{ marginBottom: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
