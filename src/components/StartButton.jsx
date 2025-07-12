const StartButton = ({ onClick, isStarted, isLoading, isDarkMode }) => {
  if (isStarted) {
    return (
      <button
        style={{
          ...buttonStyles,
          backgroundColor: '#ef4444',
          color: 'white'
        }}
        onClick={() => window.location.reload()}
      >
        🔴 End Interview
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      style={{
        ...buttonStyles,
        backgroundColor: isLoading 
          ? (isDarkMode ? '#374151' : '#9ca3af')
          : '#3b82f6',
        opacity: isLoading ? 0.6 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transform: isLoading ? 'none' : 'translateY(0)'
      }}
    >
      {isLoading ? (
        <span style={loadingContentStyles}>
          <span style={spinnerStyles}>⏳</span>
          Starting Camera...
        </span>
      ) : (
        <span style={buttonContentStyles}>
          📹 Start Interview
        </span>
      )}
    </button>
  );
};

const buttonStyles = {
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  minWidth: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const buttonContentStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const loadingContentStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const spinnerStyles = {
  animation: 'spin 1s linear infinite'
};

export default StartButton;
