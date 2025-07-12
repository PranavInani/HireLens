const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header style={{
      ...headerStyles,
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
      boxShadow: isDarkMode 
        ? '0 2px 10px rgba(0, 0, 0, 0.3)' 
        : '0 2px 10px rgba(0, 0, 0, 0.1)'
    }} className="header">
      <div style={headerContentStyles}>
        <h1 style={{
          ...titleStyles,
          color: isDarkMode ? '#f9fafb' : '#1f2937'
        }}>
          AI Interview Platform
        </h1>
        
        <div style={headerActionsStyles}>
          <button
            onClick={toggleDarkMode}
            style={{
              ...darkModeButtonStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#f9fafb' : '#1f2937',
              border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`
            }}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <div style={participantCountStyles}>
            <span style={{
              ...participantTextStyles,
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}>
              2 participants
            </span>
          </div>
        </div>
      </div>
    </header>
  );
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
  maxWidth: '1400px',
  margin: '0 auto'
};

const headerActionsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const titleStyles = {
  margin: 0,
  fontSize: '1.8rem',
  fontWeight: '600',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  transition: 'color 0.3s ease'
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

const participantCountStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const participantTextStyles = {
  fontSize: '0.9rem',
  fontWeight: '500'
};

export default Header;
