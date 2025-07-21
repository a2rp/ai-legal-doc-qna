import React from 'react';
import styled from 'styled-components';


export default function MessageBubble({ type, text }) {
    return <Bubble type={type}>{text}</Bubble>;
}

const Bubble = styled.div`
    background: ${({ type }) => (type === 'user' ? '#daf6e9' : '#f1f1f1')};
    align-self: ${({ type }) => (type === 'user' ? 'flex-end' : 'flex-start')};
    padding: 0.75rem;
    border-radius: 8px;
    margin: 0.25rem 0;
    max-width: 80%;
`;
