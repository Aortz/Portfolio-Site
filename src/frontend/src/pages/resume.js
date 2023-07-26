import React from 'react';
import styled from "styled-components";
import resumePDF from '../assets/resume/Resume_Lee Junwei.pdf'

const AboutContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: left;
    text-align: left;
    background: #000;
    width: 100%;
    height: 100vh;
    color: #fff;
    align-items: center;
    min-height: 20vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 60px;
    padding: 20px;
    // border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    // border-radius: 25px;
    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: hidden;

    /* Hide the scrollbar during the animation */
    overflow: auto;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-left: 0px;
        border-top: none;
        border-left: none;
        padding: 0px;
    } 
`;

// const PDFViewer = ({ pdfLink }) => {
//   return (
//     <div>
//       <Document file={pdfLink}>
//         <Page pageNumber={1} />
//       </Document>
//     </div>
//   );
// };
  
const Resume = () => {
  const pdflink = "https://drive.google.com/file/d/1QeQm0LcSlfjTgE2V3MM4wfj12yfvp7IF/view?usp=drive_link";
  return (
    <AboutContainer>
      <a href={pdflink}>
        <h1>Welcome to my Resume page</h1>
      </a>
    </AboutContainer>
  );
};
  
export default Resume;