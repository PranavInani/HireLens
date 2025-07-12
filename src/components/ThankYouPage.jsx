import { useState, useEffect } from 'react';

const ThankYouPage = ({ onBackToSetup, isDarkMode, toggleDarkMode }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onBackToSetup();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBackToSetup]);

  return (
    <div style={{
      ...containerStyles,
      backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
    }}>
      {/* Header */}
      <header style={{
        ...headerStyles,
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
      }}>
        <div style={headerContentStyles}>
          <h1 style={{
            ...titleStyles,
            color: isDarkMode ? '#f9fafb' : '#1f2937'
          }}>
            AI Interview Platform
          </h1>
          <button
            onClick={toggleDarkMode}
            style={{
              ...darkModeButtonStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={mainStyles}>
        <div style={{
          ...thankYouCardStyles,
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
            : '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Success Icon */}
          <div style={iconContainerStyles}>
            <div style={successIconStyles}>
              ✅
            </div>
          </div>

          {/* Thank You Message */}
          <div style={messageContainerStyles}>
            <h2 style={{
              ...thankYouTitleStyles,
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}>
              Interview Completed!
            </h2>
            <p style={{
              ...thankYouSubtitleStyles,
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}>
              Thank you for participating in the AI interview session.
            </p>
          </div>

          {/* Interview Summary */}
          <div style={summaryContainerStyles}>
            <div style={{
              ...summaryBoxStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
            }}>
              <h3 style={{
                ...summaryTitleStyles,
                color: isDarkMode ? '#f9fafb' : '#1f2937'
              }}>
                Session Summary
              </h3>
              <div style={summaryItemsStyles}>
                <div style={summaryItemStyles}>
                  <span style={{
                    ...summaryLabelStyles,
                    color: isDarkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Duration:
                  </span>
                  <span style={{
                    ...summaryValueStyles,
                    color: isDarkMode ? '#f9fafb' : '#1f2937'
                  }}>
                    Session completed
                  </span>
                </div>
                <div style={summaryItemStyles}>
                  <span style={{
                    ...summaryLabelStyles,
                    color: isDarkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Status:
                  </span>
                  <span style={{
                    ...summaryValueStyles,
                    color: '#10b981'
                  }}>
                    ✅ Successful
                  </span>
                </div>
                <div style={summaryItemStyles}>
                  <span style={{
                    ...summaryLabelStyles,
                    color: isDarkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    AI Analysis:
                  </span>
                  <span style={{
                    ...summaryValueStyles,
                    color: isDarkMode ? '#f9fafb' : '#1f2937'
                  }}>
                    Results will be shared soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-redirect countdown */}
          <div style={countdownContainerStyles}>
            <p style={{
              ...countdownTextStyles,
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}>
              Redirecting to setup in {countdown} seconds...
            </p>
            <div style={{
              ...progressBarStyles,
              backgroundColor: isDarkMode ? '#374151' : '#e5e7eb'
            }}>
              <div style={{
                ...progressFillStyles,
                width: `${((10 - countdown) / 10) * 100}%`
              }} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={actionsStyles}>
            <button
              onClick={onBackToSetup}
              style={backButtonStyles}
            >
              🔄 Start New Interview
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const containerStyles = {
  minHeight: '100vh',
  transition: 'background-color 0.3s ease'
};

const headerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: '1rem 2rem',
  zIndex: 1000,
  transition: 'all 0.3s ease'
};

const headerContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto'
};

const titleStyles = {
  fontSize: '1.5rem',
  fontWeight: '600',
  margin: 0
};

const darkModeButtonStyles = {
  padding: '0.5rem',
  borderRadius: '50%',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const mainStyles = {
  paddingTop: '6rem',
  padding: '6rem 2rem 2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 6rem)'
};

const thankYouCardStyles = {
  width: '100%',
  maxWidth: '600px',
  borderRadius: '20px',
  padding: '3rem 2rem',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  animation: 'fadeInUp 0.6s ease-out'
};

const iconContainerStyles = {
  marginBottom: '2rem'
};

const successIconStyles = {
  fontSize: '4rem',
  animation: 'bounceIn 0.8s ease-out'
};

const messageContainerStyles = {
  marginBottom: '2rem'
};

const thankYouTitleStyles = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '1rem'
};

const thankYouSubtitleStyles = {
  fontSize: '1.2rem',
  margin: 0,
  lineHeight: 1.6
};

const summaryContainerStyles = {
  marginBottom: '2rem'
};

const summaryBoxStyles = {
  padding: '1.5rem',
  borderRadius: '12px',
  textAlign: 'left'
};

const summaryTitleStyles = {
  fontSize: '1.2rem',
  fontWeight: '600',
  marginBottom: '1rem'
};

const summaryItemsStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const summaryItemStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const summaryLabelStyles = {
  fontSize: '0.9rem',
  fontWeight: '500'
};

const summaryValueStyles = {
  fontSize: '0.9rem',
  fontWeight: '600'
};

const countdownContainerStyles = {
  marginBottom: '2rem'
};

const countdownTextStyles = {
  fontSize: '0.9rem',
  marginBottom: '0.5rem'
};

const progressBarStyles = {
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  overflow: 'hidden'
};

const progressFillStyles = {
  height: '100%',
  backgroundColor: '#3b82f6',
  borderRadius: '2px',
  transition: 'width 1s ease-out'
};

const actionsStyles = {
  display: 'flex',
  justifyContent: 'center'
};

const backButtonStyles = {
  padding: '1rem 2rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

export default ThankYouPage;
