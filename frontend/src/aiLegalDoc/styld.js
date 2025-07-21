import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        max-width: 1440px;
        margin: auto;
        padding: 50px;
    `,

    Title: styled.h1`
        margin-bottom: 30px;
    `,

    UploadBoxWrapper: styled.div`
        margin-bottom: 30px;
    `,

    ChatBoxPreviewPdfWrapper: styled.div`
        display: flex;
        justify-content: space-between;
        gap: 50px;

        @media (width<1000px) {
            flex-wrap: wrap;
        }

        .col {
            width: 100%;
        }
    `,

    PreviewPdf: styled.div`
        iframe {
            width: 100%;
            height: 500px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
    `,
};
