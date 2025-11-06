const ConfidenceOverlay = ({ confidence, isDarkMode }) => {
  const getConfidenceColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getConfidenceStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs improvement';
  };

  return (
    <div style={{
      ...overlayStyles,
      backgroundColor: isDarkMode 
        ? 'rgba(0, 0, 0, 0.8)' 
        : 'rgba(255, 255, 255, 0.9)',
      border: `2px solid ${getConfidenceColor(confidence)}`,
      boxShadow: isDarkMode 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.15)'
    }} className="confidence-pulse">
      <div style={confidenceHeaderStyles}>
        <span style={{
          ...confidenceLabelStyles,
          color: isDarkMode ? '#f9fafb' : '#374151'
        }}>
          AI Concentration
        </span>
        <div style={{
          ...confidenceIndicatorStyles,
          backgroundColor: getConfidenceColor(confidence)
        }} />
      </div>
      
      <div style={confidenceValueStyles}>
        <span style={{
          ...confidencePercentStyles,
          color: getConfidenceColor(confidence)
        }}>
          {confidence}%
        </span>
        <span style={{
          ...confidenceStatusStyles,
          color: isDarkMode ? '#9ca3af' : '#6b7280'
        }}>
          {getConfidenceStatus(confidence)}
        </span>
      </div>
      
      {/* Progress bar */}
      <div style={{
        ...progressBarContainerStyles,
        backgroundColor: isDarkMode ? '#374151' : '#e5e7eb'
      }}>
        <div style={{
          ...progressBarFillStyles,
          width: `${confidence}%`,
          backgroundColor: getConfidenceColor(confidence)
        }} />
      </div>
    </div>
  );
};

const overlayStyles = {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  backdropFilter: 'blur(8px)',
  padding: '1rem',
  borderRadius: '12px',
  zIndex: 10,
  minWidth: '180px',
  transition: 'all 0.3s ease'
};

const confidenceHeaderStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.75rem'
};

const confidenceLabelStyles = {
  fontSize: '0.875rem',
  fontWeight: '600',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const confidenceIndicatorStyles = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  animation: 'pulse 2s infinite'
};

const confidenceValueStyles = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.5rem',
  marginBottom: '0.75rem'
};

const confidencePercentStyles = {
  fontSize: '1.5rem',
  fontWeight: '700',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const confidenceStatusStyles = {
  fontSize: '0.75rem',
  fontWeight: '500'
};

const progressBarContainerStyles = {
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  overflow: 'hidden'
};

const progressBarFillStyles = {
  height: '100%',
  borderRadius: '2px',
  transition: 'width 0.5s ease-in-out'
};

export default ConfidenceOverlay;
