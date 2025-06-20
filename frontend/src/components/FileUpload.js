import React, { useState } from 'react';
import styled from 'styled-components';
import JSZip from 'jszip';

// Styled components
const UploadContainer = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    transform: translateY(-3px);
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 0.8rem;
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const UploadText = styled.p`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const UploadSubText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const BrowseButton = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  margin: 0.5rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #5910a8, #1e63d3);
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin-top: 1rem;
  text-align: left;
  max-height: 150px;
  overflow-y: auto;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 6px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  
  svg {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    color: white;
  }
  
  span {
    font-size: 0.85rem;
    color: white;
    max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const FileSize = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 10px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 3px;
  
  &:hover {
    color: #ff6b6b;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const UploadControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ClearButton = styled.button`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 12px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const CompressButton = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: linear-gradient(45deg, #5910a8, #1e63d3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: linear-gradient(45deg, #a591c4, #8fabda);
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.progress || 0}%;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border-radius: 50px;
  transition: width 0.3s ease-out;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`;

// Utility functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const generateCompressionResults = (files) => {
  return files.map(file => {
    const compressionRatio = Math.random() * 0.4 + 0.2;
    const originalSize = file.size;
    const compressedSize = Math.round(originalSize * compressionRatio);
    const savedSize = originalSize - compressedSize;
    const savedPercentage = Math.round((1 - compressionRatio) * 100);
    
    return {
      name: file.name,
      originalSize,
      compressedSize,
      savedSize,
      savedPercentage
    };
  });
};

const calculateCompressionSummary = (results) => {
  const totalOriginalSize = results.reduce((total, file) => total + file.originalSize, 0);
  const totalCompressedSize = results.reduce((total, file) => total + file.compressedSize, 0);
  const totalSavedSize = totalOriginalSize - totalCompressedSize;
  const averageSavedPercentage = Math.round((totalSavedSize / totalOriginalSize) * 100);
  
  return {
    totalFiles: results.length,
    totalOriginalSize,
    totalCompressedSize,
    totalSavedSize,
    averageSavedPercentage,
    processingTime: (Math.random() * 5 + 1).toFixed(2)
  };
};

// Main component
const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [compressionResults, setCompressionResults] = useState([]);
  const [compressionSummary, setCompressionSummary] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const simulateCompression = () => {
    setIsCompressing(true);
    setCompressionProgress(0);
    
    const interval = setInterval(() => {
      setCompressionProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 10;
      });
    }, 150);
    
    setTimeout(() => {
      const results = generateCompressionResults(files);
      const summary = calculateCompressionSummary(results);
      
      setCompressionProgress(100);
      setCompressionResults(results);
      setCompressionSummary(summary);
      
      setTimeout(() => {
        setIsCompressing(false);
        setShowResults(true);
        clearInterval(interval);
      }, 300);
    }, 1500);
  };

  return (
    <>
      <UploadContainer 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </UploadIcon>
        <UploadText>
          {isDragging ? 'Lepaskan untuk mengunggah' : 'Letakkan file di sini'}
        </UploadText>
        <UploadSubText>atau</UploadSubText>
                <FileInput 
                  type="file" 
          id="file-input"
                  onChange={handleFileChange}
                  multiple
                />
        <label htmlFor="file-input">
          <BrowseButton as="span">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
              Pilih File
            </BrowseButton>
        </label>
      </UploadContainer>
      
      {files.length > 0 && (
        <>
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <FileName>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{file.name}</span>
                </FileName>
                <FileSize>{formatFileSize(file.size)}</FileSize>
                <RemoveButton onClick={() => removeFile(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </RemoveButton>
              </FileItem>
            ))}
          </FileList>

          <UploadControls>
            <ClearButton onClick={clearAllFiles}>
              Hapus
            </ClearButton>
          <CompressButton 
            onClick={simulateCompression} 
            disabled={isCompressing}
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {isCompressing ? 'Mengompres...' : 'Kompres'}
          </CompressButton>
          </UploadControls>

      {isCompressing && (
              <ProgressContainer>
                <ProgressBar progress={compressionProgress} />
              </ProgressContainer>
          )}
        </>
      )}

      {showResults && compressionSummary && (
        <ModalOverlay onClick={() => setShowResults(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2 style={{
              color: '#6a11cb',
              marginBottom: '1rem',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>Kompresi Selesai!</h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.8rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: '#f4f0ff',
                padding: '1rem',
                borderRadius: '12px',
                textAlign: 'center',
                flex: '1',
                minWidth: '120px',
                boxShadow: '0 8px 16px rgba(106, 17, 203, 0.1)'
              }}>
                <h3 style={{color: '#6a11cb', fontSize: '1rem', marginBottom: '0.3rem'}}>File</h3>
                <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#2c2179'}}>{compressionSummary.totalFiles}</div>
              </div>
              
              <div style={{
                background: '#f4f0ff',
                padding: '1rem',
                borderRadius: '12px',
                textAlign: 'center',
                flex: '1',
                minWidth: '120px',
                boxShadow: '0 8px 16px rgba(106, 17, 203, 0.1)'
              }}>
                <h3 style={{color: '#6a11cb', fontSize: '1rem', marginBottom: '0.3rem'}}>Tersimpan</h3>
                <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#2c2179'}}>{formatFileSize(compressionSummary.totalSavedSize)}</div>
              </div>
              
              <div style={{
                background: '#f4f0ff',
                padding: '1rem',
                borderRadius: '12px',
                textAlign: 'center',
                flex: '1',
                minWidth: '120px',
                boxShadow: '0 8px 16px rgba(106, 17, 203, 0.1)'
              }}>
                <h3 style={{color: '#6a11cb', fontSize: '1rem', marginBottom: '0.3rem'}}>Rasio</h3>
                <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#2c2179'}}>{compressionSummary.averageSavedPercentage}%</div>
              </div>
            </div>
            
            <div style={{ 
              border: '1px solid #eee',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '1.2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                padding: '0.8rem 1rem',
                background: '#f0ebfa',
                fontWeight: 'bold',
                color: '#2c2179',
                borderBottom: '1px solid #eee',
                fontSize: '0.85rem'
              }}>
                <div style={{flex: '2'}}>Nama File</div>
                <div style={{flex: '1'}}>Asli</div>
                <div style={{flex: '1'}}>Terkompresi</div>
                <div style={{flex: '1'}}>Tersimpan</div>
              </div>
              
              {compressionResults.map((result, index) => (
                <div key={index} style={{
                  display: 'flex',
                  padding: '0.7rem 1rem',
                  borderBottom: index < compressionResults.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: index % 2 === 0 ? '#f9f7fc' : 'white',
                  fontSize: '0.85rem'
                }}>
                  <div style={{flex: '2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{result.name}</div>
                  <div style={{flex: '1'}}>{formatFileSize(result.originalSize)}</div>
                  <div style={{flex: '1'}}>{formatFileSize(result.compressedSize)}</div>
                  <div style={{flex: '1', color: '#6a11cb', fontWeight: '600'}}>{result.savedPercentage}%</div>
                </div>
              ))}
            </div>
            
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <button 
                style={{
                  background: 'linear-gradient(45deg, #11cb4a, #25fc9e)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  boxShadow: '0 4px 15px rgba(17, 203, 106, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  // Create a zip file using JSZip
                  const zip = new JSZip();
                  
                  // Add a text file with the compression summary
                  zip.file("summary.txt", 
                    `Total Files: ${compressionSummary.totalFiles}\n` +
                    `Original Size: ${formatFileSize(compressionSummary.totalOriginalSize)}\n` +
                    `Compressed Size: ${formatFileSize(compressionSummary.totalCompressedSize)}\n` +
                    `Saved Size: ${formatFileSize(compressionSummary.totalSavedSize)}\n` +
                    `Average Saved: ${compressionSummary.averageSavedPercentage}%\n` +
                    `Processing Time: ${compressionSummary.processingTime}s\n`
                  );
                  
                  // Add mock compressed files
                  compressionResults.forEach(result => {
                    // In a real app, we would have the actual compressed content
                    // Here we just simulate it with a text file
                    zip.file(`${result.name}.flat`, 
                      `This is a simulation of the compressed content for ${result.name}\n` +
                      `Original Size: ${formatFileSize(result.originalSize)}\n` +
                      `Compressed Size: ${formatFileSize(result.compressedSize)}\n` +
                      `Saved: ${result.savedPercentage}%`
                    );
                  });
                  
                  // Generate and download the zip file
                  zip.generateAsync({type: "blob"})
                    .then(function(content) {
                      // Create a download link
                      const url = URL.createObjectURL(content);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'compressed_files.zip';
                      document.body.appendChild(a);
                      a.click();
                      
                      // Clean up
                      URL.revokeObjectURL(url);
                      document.body.removeChild(a);
                    });
                }}
              >
                Unduh
              </button>
              <button 
                style={{
                  background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  boxShadow: '0 4px 15px rgba(106, 17, 203, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setShowResults(false)}
              >
                Tutup
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default FileUpload; 