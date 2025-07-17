import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import VideoPanel from './components/VideoPanel'
import ConfidenceOverlay from './components/ConfidenceOverlay'
import StartButton from './components/StartButton'
import SettingsModal from './components/SettingsModal'
import PreInterviewSetup from './components/PreInterviewSetup'
import ThankYouPage from './components/ThankYouPage'
import './App.css'

function App() {
  const [confidence, setConfidence] = useState(87)
  const [webcamStarted, setWebcamStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode like Google Meet
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState('setup') // 'setup', 'interview', or 'thankyou'
  const [userStream, setUserStream] = useState(null)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true)
  const [deviceSettings, setDeviceSettings] = useState({
    camera: '',
    microphone: '',
    speaker: ''
  })
  
  const candidateVideoRef = useRef(null)
  const interviewerVideoRef = useRef(null)

  // Ensure video element always receives the latest stream
  useEffect(() => {
    if (candidateVideoRef.current && userStream) {
      candidateVideoRef.current.srcObject = userStream;
    }
  }, [userStream]);

  // Simulate confidence score updates
  // ...existing code...

const API_ENDPOINT = 'https://pranavinani-gaze-emotion-api.hf.space/analyze'; // Replace with your actual endpoint

useEffect(() => {
  if (webcamStarted && currentPage === 'interview') {
    const interval = setInterval(async () => {
      const video = candidateVideoRef.current;
      if (video && video.srcObject) {
        // Create a canvas and draw the current video frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the frame as a JPG image (base64)
        const imageData = canvas.toDataURL('image/jpeg');

        // Helper to convert base64 dataURL to Blob
        function dataURLtoBlob(dataurl) {
          const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
          return new Blob([u8arr], { type: mime });
        }

        // Send the JPG image as a file to your FastAPI endpoint
        try {
          const formData = new FormData();
          formData.append('file', dataURLtoBlob(imageData), 'frame.jpg');

          const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          if (data.concentration_score !== undefined) {
            setConfidence(data.concentration_score);
          }
        } catch (error) {
          console.error('Error fetching confidence:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }
}, [webcamStarted, currentPage]);

// ...existing code...

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleStartInterview = (stream) => {
    setUserStream(stream)
    setCurrentPage('interview')
    setWebcamStarted(true)
    setIsCameraOn(true)
    setIsMicrophoneOn(true)
    
    if (candidateVideoRef.current && stream) {
      candidateVideoRef.current.srcObject = stream
    }
  }

  const handleSettingsClick = () => {
    setShowSettingsModal(true)
  }

  const handleSaveSettings = (settings) => {
    setDeviceSettings(settings)
    console.log('Settings saved:', settings)
  }

  const handleEndInterview = () => {
    if (userStream) {
      userStream.getTracks().forEach(track => track.stop())
    }
    setUserStream(null)
    setWebcamStarted(false)
    setIsCameraOn(true)
    setIsMicrophoneOn(true)
    setCurrentPage('thankyou')
  }

  const handleBackToSetup = () => {
    setCurrentPage('setup')
  }

  const handleToggleCamera = () => {
    if (userStream) {
      const videoTracks = userStream.getVideoTracks()
      videoTracks.forEach(track => {
        track.enabled = !track.enabled
      })
      setIsCameraOn(!isCameraOn)
    }
  }

  const handleToggleMicrophone = () => {
    if (userStream) {
      const audioTracks = userStream.getAudioTracks()
      audioTracks.forEach(track => {
        track.enabled = !track.enabled
      })
      setIsMicrophoneOn(!isMicrophoneOn)
    }
  }

  // Show thank you page
  if (currentPage === 'thankyou') {
    return (
      <ThankYouPage 
        onBackToSetup={handleBackToSetup}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    )
  }

  // Show setup page first
  if (currentPage === 'setup') {
    return (
      <>
        <PreInterviewSetup 
          onStartInterview={handleStartInterview}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          isDarkMode={isDarkMode}
          onSaveSettings={handleSaveSettings}
        />
      </>
    )
  }

  // Main interview room
  return (
    <div style={{
      ...appStyles,
      backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
    }}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main style={{
        ...mainStyles,
        backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
      }} className="main-content">
        {/* Google Meet style video grid */}
        <div style={{
          ...videoGridStyles,
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff'
        }} className="video-grid">
          {/* Main video area */}
          <div style={mainVideoAreaStyles}>
            <div style={candidateContainerStyles}>
              <VideoPanel 
                ref={candidateVideoRef}
                title="You"
                isActive={webcamStarted}
                isDarkMode={isDarkMode}
                isMainVideo={true}
                onToggleCamera={handleToggleCamera}
                onToggleMicrophone={handleToggleMicrophone}
                isCameraOn={isCameraOn}
                isMicrophoneOn={isMicrophoneOn}
              />
              {webcamStarted && <ConfidenceOverlay confidence={confidence} isDarkMode={isDarkMode} />}
            </div>
          </div>
          
          {/* Side panel for interviewer */}
          <div style={sidePanelStyles}>
            <VideoPanel 
              ref={interviewerVideoRef}
              title="Interviewer"
              isActive={false}
              isDarkMode={isDarkMode}
              isMainVideo={false}
            />
          </div>
        </div>
        
        {/* Bottom controls bar */}
        <div style={{
          ...controlsBarStyles,
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
        }}>
          <div style={controlsLeftStyles}>
            <div style={{
              ...statusIndicatorStyles,
              color: isDarkMode ? '#10b981' : '#059669'
            }}>
              🟢 Interview in progress
            </div>
          </div>
          
          <div style={controlsCenterStyles}>
            <button
              onClick={handleEndInterview}
              style={{
                ...endButtonStyles,
                backgroundColor: '#ef4444'
              }}
            >
              🔴 End Interview
            </button>
          </div>
          
          <div style={controlsRightStyles}>
            <button 
              onClick={handleSettingsClick}
              style={{
                ...actionButtonStyles,
                backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                color: isDarkMode ? '#f9fafb' : '#1f2937'
              }}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </main>

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        isDarkMode={isDarkMode}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  )
}

const appStyles = {
  minHeight: '100vh',
  transition: 'background-color 0.3s ease'
}

const mainStyles = {
  paddingTop: '5rem', // Account for fixed header
  padding: '5rem 1rem 0',
  minHeight: 'calc(100vh - 5rem)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'background-color 0.3s ease'
}

// Google Meet style video grid
const videoGridStyles = {
  flex: 1,
  display: 'flex',
  borderRadius: '12px',
  overflow: 'hidden',
  margin: '1rem',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  minHeight: '500px',
  transition: 'all 0.3s ease'
}

const mainVideoAreaStyles = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  position: 'relative'
}

const sidePanelStyles = {
  width: '300px',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
}

const candidateContainerStyles = {
  position: 'relative',
  width: '100%',
  maxWidth: '800px'
}

// Google Meet style bottom controls
const controlsBarStyles = {
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 2rem',
  margin: '0 1rem',
  borderRadius: '0 0 12px 12px',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease'
}

const controlsLeftStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flex: 1
}

const controlsCenterStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}

const controlsRightStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  flex: 1
}

const statusIndicatorStyles = {
  fontSize: '0.9rem',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
}

const actionButtonStyles = {
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: 'none',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
}

const endButtonStyles = {
  padding: '1rem 2rem',
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
}

export default App
