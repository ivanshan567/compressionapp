import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const rotateScrew = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const wave = keyframes`
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(0); }
  75% { transform: rotate(-5deg); }
`;

const IllustrationContainer = styled.div`
  width: 100%;
  max-width: 460px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  animation: ${float} 6s ease-in-out infinite;
  transform: translateZ(0);
  
  @media (max-height: 700px) {
    transform: scale(0.85) translateZ(0);
  }
  
  @media (max-height: 600px) {
    transform: scale(0.75) translateZ(0);
  }
`;

// File illustration
const FileGraphic = styled.div`
  width: 300px;
  height: 350px;
  background: linear-gradient(135deg, #ffb866 0%, #ffa347 100%);
  border-radius: 16px;
  position: relative;
  box-shadow: 0 15px 35px rgba(255, 184, 102, 0.25);
  overflow: hidden;
  transform: translateZ(0);
  
  &:before {
    content: '';
    position: absolute;
    width: 70px;
    height: 70px;
    background-color: #f8f5fa;
    top: 0;
    right: 0;
    border-radius: 0 0 0 16px;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }

  // File content lines
  &:after {
    content: '';
    position: absolute;
    top: 80px;
    left: 50px;
    right: 50px;
    height: 200px;
    background: repeating-linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 10px,
      rgba(255, 255, 255, 0) 10px,
      rgba(255, 255, 255, 0) 20px
    );
    border-radius: 8px;
  }
`;

// Compression screw illustration
const CompressionScrew = styled.div`
  position: absolute;
  top: 110px;
  left: -25px;
  width: 50px;
  height: 160px;
  background: linear-gradient(180deg, #3b3150 0%, #4d4169 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  box-shadow: -5px 5px 15px rgba(59, 49, 80, 0.3);
  z-index: 10;
  transform: translateZ(0);
`;

const ScrewHead = styled.div`
  width: 70px;
  height: 35px;
  background: linear-gradient(180deg, #4d4169 0%, #3b3150 100%);
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ScrewNut = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f8d26a 0%, #e6b94c 100%);
  border: 6px solid #3b3150;
  position: absolute;
  bottom: 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  will-change: transform;
  animation: ${rotateScrew} 8s linear infinite;
  transform: translateZ(0);
`;

// Person illustration
const Person = styled.div`
  position: absolute;
  bottom: -10px;
  right: 10px;
  width: 150px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateZ(0);
`;

const Head = styled.div`
  width: 45px;
  height: 55px;
  background: linear-gradient(135deg, #ffd2b9 0%, #ffc1a0 100%);
  border-radius: 50% 50% 45% 45%;
  position: relative;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.05);
`;

const Hair = styled.div`
  width: 55px;
  height: 65px;
  background: linear-gradient(180deg, #3b3150 0%, #4d4169 100%);
  border-radius: 50% 50% 0 0;
  position: absolute;
  top: -30px;
  left: -5px;
`;

const Eyes = styled.div`
  position: relative;
  width: 30px;
  height: 8px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

const Eye = styled.div`
  width: 8px;
  height: 8px;
  background-color: #3b3150;
  border-radius: 50%;
`;

const Smile = styled.div`
  width: 15px;
  height: 8px;
  border-bottom: 2px solid #3b3150;
  border-radius: 50%;
  margin-top: 8px;
`;

const Body = styled.div`
  width: 75px;
  height: 110px;
  background: linear-gradient(180deg, #b1a3ca 0%, #9a86c4 100%);
  border-radius: 16px 16px 0 0;
  margin-top: -15px;
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Arm = styled.div`
  width: 65px;
  height: 18px;
  background: linear-gradient(180deg, #b1a3ca 0%, #9a86c4 100%);
  position: absolute;
  top: 25px;
  left: -45px;
  border-radius: 10px;
  transform-origin: right center;
  will-change: transform;
  animation: ${wave} 3s ease-in-out infinite;
  transform: translateZ(0);
  box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.1);
`;

const Legs = styled.div`
  width: 75px;
  height: 90px;
  background: linear-gradient(180deg, #3b3150 0%, #524873 100%);
  border-radius: 16px 16px 0 0;
  margin-top: -15px;
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Shadow = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 30px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
  border-radius: 50%;
`;

const CompressionIllustration = () => {
  return (
    <IllustrationContainer>
      <FileGraphic>
        <CompressionScrew>
          <ScrewHead />
          <ScrewHead style={{ marginTop: '80px' }} />
          <ScrewNut />
        </CompressionScrew>
      </FileGraphic>
      <Person>
        <Head>
          <Hair />
          <Eyes>
            <Eye />
            <Eye />
          </Eyes>
          <Smile />
        </Head>
        <Body>
          <Arm />
        </Body>
        <Legs />
      </Person>
      <Shadow />
    </IllustrationContainer>
  );
};

export default CompressionIllustration; 