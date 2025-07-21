// import { useState } from 'react';
// import ChatBox from './ChatBox';
// import { Styled } from './styld';
// import UploadBox from './UploadBox';

// const AiLegalDoc = () => {
//     const [isPdfUploaded, setIsPdfUploaded] = useState(false);

//     return (
//         <>
//             <Styled.Wrapper>
//                 <Styled.Title>AI Legal DOC</Styled.Title>
//                 <UploadBox />
//                 {isPdfUploaded && <>
//                     <Styled.PreviewPdf>PreviewPdf</Styled.PreviewPdf>
//                     <ChatBox />
//                 </>}
//             </Styled.Wrapper>
//         </>
//     )
// }

// export default AiLegalDoc


import { useState } from 'react';
import ChatBox from './ChatBox';
import UploadBox from './UploadBox';
import { Styled } from './styld';

const AiLegalDoc = () => {
    const [isPdfUploaded, setIsPdfUploaded] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    return (
        <Styled.Wrapper>
            <Styled.Title>AI Legal Document QnA</Styled.Title>

            <Styled.UploadBoxWrapper>
                <UploadBox
                    setIsPdfUploaded={setIsPdfUploaded}
                    setPdfUrl={setPdfUrl}
                />
            </Styled.UploadBoxWrapper>

            {isPdfUploaded && (
                <>
                    <Styled.ChatBoxPreviewPdfWrapper>
                        <div className="col">
                            <Styled.PreviewPdf>
                                <h4>📄 Uploaded Document Preview:</h4>
                                <iframe
                                    src={pdfUrl}
                                    width="100%"
                                    height="500px"
                                    style={{ border: '1px solid #ccc', borderRadius: '6px' }}
                                    title="Uploaded PDF Preview"
                                />
                            </Styled.PreviewPdf>
                        </div>
                        <div className="col col2">
                            <ChatBox />
                        </div>

                    </Styled.ChatBoxPreviewPdfWrapper>
                </>
            )}
        </Styled.Wrapper>
    );
};

export default AiLegalDoc;
