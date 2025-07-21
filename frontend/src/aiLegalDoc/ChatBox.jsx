import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MessageBubble from './MessageBubble';


export default function ChatBox() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const question = input.trim();
        setChat((prev) => [...prev, { type: 'user', text: question }]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://127.0.0.1:8000/ask', new URLSearchParams({ question }));
            const answer = res.data.answer;
            setChat((prev) => [...prev, { type: 'ai', text: answer }]);
        } catch (err) {
            console.error(err);
            setChat((prev) => [...prev, { type: 'ai', text: '❌ Something went wrong.' }]);
        } finally {
            setLoading(false);
        }
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const handleClearChat = () => {
        setChat([]);
    };

    const handleExportChat = () => {
        if (!chat.length) return;

        const content = chat
            .map((msg) => `${msg.type === 'user' ? 'You' : 'AI'}: ${msg.text}`)
            .join('\n\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat_history.txt';
        a.click();

        URL.revokeObjectURL(url);
    };


    return (
        <Wrapper>
            <Messages>
                {chat.map((msg, idx) => (
                    <MessageBubble key={idx} type={msg.type} text={msg.text} />
                ))}
                {/* {loading && <MessageBubble type="ai" text="🤖 Thinking..." />} */}
                {loading && <MessageBubble type="ai" text={<TypingDots />} />}

                <div ref={messagesEndRef} />
            </Messages>

            <InputRow onSubmit={handleAsk}>
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your legal/medical question..."
                />
                <Button type="submit">Ask</Button>
            </InputRow>
            {chat.length > 0 && !loading && <>
                <UtilityButtons>
                    <button onClick={handleClearChat}>🧹 Clear Chat</button>
                    <button onClick={handleExportChat}>📤 Export Chat</button>
                </UtilityButtons>
            </>}
        </Wrapper >
    );
}

const Wrapper = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Messages = styled.div`
    /* border: 1px solid #f00; */
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 1rem;
`;

const InputRow = styled.form`
    display: flex;
    gap: 0.5rem;
`;

const Input = styled.input`
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 0.75rem 1rem;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const TypingDots = styled.div`
    display: flex;
    gap: 4px;
    &::before, &::after, & span {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #aaa;
        animation: blink 1.2s infinite ease-in-out;
    }
    &::after {
        animation-delay: 0.2s;
    }
    & span {
        animation-delay: 0.4s;
    }

    @keyframes blink {
        0%, 80%, 100% { opacity: 0; }
        40% { opacity: 1; }
    }
`;

const UtilityButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.5rem;

    button {
        background: #eee;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
        border: 1px solid #ccc;
        transition: all 0.2s ease;

        &:hover {
        background: #ddd;
        }
    }
`;

