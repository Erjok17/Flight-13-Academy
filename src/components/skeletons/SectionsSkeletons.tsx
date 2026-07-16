import SkeletonBase from './SkeletonBase';

// 1. Coaches Section Skeleton
export const CoachesSectionSkeleton = () => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Title & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
          <SkeletonBase type="title" width="240px" height="36px" style={{ margin: '0 auto 16px auto' }} />
          <SkeletonBase type="text" width="480px" height="18px" style={{ margin: '0 auto' }} />
        </div>

        {/* Coaches Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {[1, 2, 3].map((idx) => (
            <div 
              key={idx}
              style={{
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                paddingBottom: '24px'
              }}
            >
              {/* Image box */}
              <SkeletonBase type="rectangle" height="320px" borderRadius="0px" />
              {/* Text metadata */}
              <div style={{ padding: '24px 24px 0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SkeletonBase type="title" width="180px" height="22px" style={{ marginBottom: '8px' }} />
                <SkeletonBase type="text" width="120px" height="15px" style={{ marginBottom: '12px' }} />
                <SkeletonBase type="text" width="100%" height="14px" />
                <SkeletonBase type="text" width="90%" height="14px" style={{ marginBottom: '20px' }} />
                <SkeletonBase type="button" width="160px" height="24px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 2. TrainWithPurpose Section Skeleton (Academy Activities)
export const TrainWithPurposeSkeleton = () => {
  return (
    <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
      <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Title Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
          <SkeletonBase type="title" width="320px" height="40px" style={{ margin: '0 auto 16px auto' }} />
          <SkeletonBase type="text" width="560px" height="18px" style={{ margin: '0 auto' }} />
        </div>

        {/* Activities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #f0f0f0',
                paddingBottom: '24px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.03)'
              }}
            >
              {/* Thumbnail image/video slot */}
              <SkeletonBase type="thumbnail" height="200px" borderRadius="0px" />
              {/* Card Contents */}
              <div style={{ padding: '20px' }}>
                <SkeletonBase type="title" width="140px" height="18px" style={{ marginBottom: '16px' }} />
                <SkeletonBase type="text" width="100%" height="16px" />
                <SkeletonBase type="text" width="95%" height="16px" />
                <SkeletonBase type="text" width="70%" height="16px" style={{ marginBottom: '20px' }} />
                
                {/* Features Badges */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                  <SkeletonBase type="rectangle" width="70px" height="22px" borderRadius="20px" />
                  <SkeletonBase type="rectangle" width="75px" height="22px" borderRadius="20px" />
                  <SkeletonBase type="rectangle" width="80px" height="22px" borderRadius="20px" />
                </div>
                
                <SkeletonBase type="text" width="90px" height="16px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Product Reviews Skeleton
export const ProductReviewsSkeleton = () => {
  return (
    <div style={{ marginTop: '40px', borderTop: '1px solid #e0e0e0', paddingTop: '40px' }}>
      <SkeletonBase type="title" width="200px" height="28px" style={{ marginBottom: '24px' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        {/* Rating Breakdown Layout */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <SkeletonBase type="title" width="80px" height="48px" style={{ margin: '0 auto 8px auto' }} />
            <SkeletonBase type="text" width="120px" height="16px" />
          </div>
          <div style={{ flex: 1, minWidth: '250px' }}>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <SkeletonBase type="text" width="20px" height="14px" style={{ marginBottom: 0 }} />
                <SkeletonBase type="rectangle" height="10px" borderRadius="5px" style={{ flex: 1, marginBottom: 0 }} />
                <SkeletonBase type="text" width="30px" height="14px" style={{ marginBottom: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[1, 2].map((idx) => (
            <div key={idx} style={{ paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <SkeletonBase type="avatar" width="40px" height="40px" />
                  <div>
                    <SkeletonBase type="text" width="100px" height="16px" style={{ marginBottom: '4px' }} />
                    <SkeletonBase type="text" width="80px" height="12px" style={{ marginBottom: 0 }} />
                  </div>
                </div>
                <SkeletonBase type="text" width="70px" height="14px" style={{ marginLeft: 'auto', marginBottom: 0 }} />
              </div>
              <SkeletonBase type="text" width="100%" height="14px" />
              <SkeletonBase type="text" width="85%" height="14px" style={{ marginBottom: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
