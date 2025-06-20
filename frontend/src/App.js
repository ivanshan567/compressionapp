import React from 'react';
import styled from 'styled-components';
import FileUpload from './components/FileUpload';

const AppContainer = styled.div`
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  width: 90%;
  z-index: 1;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 3px;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-weight: 300;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SubTitle = styled.h2`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
`;

const Credits = styled.div`
  position: absolute;
  bottom: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  text-align: center;
  font-weight: 300;
  z-index: 10;
`;

// Simple background elements
const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 0;
`;

const Circle1 = styled(Circle)`
  width: 400px;
  height: 400px;
  top: -150px;
  right: -150px;
`;

const Circle2 = styled(Circle)`
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: -100px;
`;

const Circle3 = styled(Circle)`
  width: 200px;
  height: 200px;
  top: 50%;
  left: 20%;
`;

function App() {
  return (
    <AppContainer>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <ContentContainer>
        <TitleContainer>
          <Title>FLATSIZE</Title>
          <Description>
            Kompres file Anda secara efisien dengan algoritma canggih kami
          </Description>
        </TitleContainer>
        <Card>
          <SubTitle>Unggah File Anda</SubTitle>
          <FileUpload />
        </Card>
      </ContentContainer>
      <Credits>
        Dibuat oleh: Muhammad Rizky Ivandy (231240001343) & Ahmad Bintang Eka Rahman Nazal (231240001478)
      </Credits>
    </AppContainer>
  );
}

export default App;
