// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';


// export default function UploadBox() {
//     const [uploading, setUploading] = useState(false);
//     const [message, setMessage] = useState('');

//     const onDrop = async (acceptedFiles) => {
//         if (!acceptedFiles.length) return;

//         const file = acceptedFiles[0];
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             setUploading(true);
//             setMessage('');
//             const res = await axios.post('http://127.0.0.1:8000/upload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setMessage('✅ PDF uploaded & embedded successfully!');
//         } catch (err) {
//             console.error(err);
//             setMessage('❌ Upload failed!');
//         } finally {
//             setUploading(false);
//         }
//     };

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': [] } });

//     return (
//         <Box {...getRootProps()}>
//             <input {...getInputProps()} />
//             {isDragActive ? (
//                 <p>📂 Drop the PDF here ...</p>
//             ) : (
//                 <p>📁 Drag & drop a legal/medical PDF here, or click to browse</p>
//             )}
//             {uploading && <p>⏳ Uploading...</p>}
//             {message &&
//                 <Message $success={message.startsWith('✅')}>
//                     {message}
//                 </Message>
//             }
//         </Box>
//     );
// }

// const Box = styled.div`
//     border: 2px dashed #aaa;
//     padding: 2rem;
//     text-align: center;
//     margin-bottom: 2rem;
//     border-radius: 8px;
//     background: #fafafa;
// `;

// const Message = styled.p`
//     margin-top: 1rem;
//     color: ${({ $success }) => ($success ? 'green' : 'red')};
// `;




import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

export default function UploadBox({ setIsPdfUploaded, setPdfUrl }) {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const onDrop = async (acceptedFiles) => {
        if (!acceptedFiles.length) return;
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            setMessage('');
            const res = await axios.post('http://127.0.0.1:8000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('✅ PDF uploaded & embedded successfully!');
            setPdfUrl(URL.createObjectURL(file));
            setIsPdfUploaded(true);
        } catch (err) {
            console.error(err);
            setMessage('❌ Upload failed!');
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': [] },
    });

    return (
        <Box {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>📂 Drop the PDF here ...</p>
            ) : (
                <p>📁 Drag & drop a legal/medical PDF here, or click to browse</p>
            )}
            {uploading && <p>⏳ Uploading...</p>}
            {message && (
                <Message $success={message.startsWith('✅')}>
                    {message}
                </Message>
            )}
        </Box>
    );
}

const Box = styled.div`
    border: 2px dashed #aaa;
    padding: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    border-radius: 8px;
    background: #fafafa;
`;

const Message = styled.p`
    margin-top: 1rem;
    color: ${({ $success }) => ($success ? 'green' : 'red')};
`;
