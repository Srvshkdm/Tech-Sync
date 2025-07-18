import { useState } from 'react';
import { CHATBX } from '../assets/images/index.js';

export default function ChatBot() {
    const [userInput, setUserInput] = useState('');
    const [chat, setChat] = useState([]);
    const [recommendedQuestions, setRecommendedQuestions] = useState([]);

    // Predefined questions and answers
    const qaPairs = [
        {
            keywords: ['what is AYUSH?'],
            answer: 'AYUSH stands for Ayurveda, Yoga and Naturopathy, Unani, Siddha, and Homeopathy—an extraordinary blend of India’s traditional healthcare systems rooted in ancient wisdom.',
        },
        {
            keywords: ['What does your AYUSH startup focus on?'],
            answer: 'We aim to revolutionize healthcare by championing the wisdom of traditional medicine, providing transformative holistic health solutions.',
        },
        {
            keywords: ['what do you do?'],
            answer: 'I assist with your queries.',
        },
        {
            keywords: ['Why is a dedicated portal for AYUSH startups needed?'],
            answer: 'The AYUSH sector has unique challenges and opportunities.',
        },
        {
            keywords: ['Does the portal itself provide funding?'],
            answer: 'Not yet, but we offer tailored resources and mentorship.',
        },
        {
            keywords: ['What are the benefits of AYUSH?'],
            answer: 'AYUSH promotes holistic well-being by integrating natural and preventive treatments, enhancing mental, physical, and emotional health.',
        },
        {
            keywords: [
                'How does traditional medicine help in modern healthcare?',
            ],
            answer: 'Traditional medicine offers a holistic approach, focusing on prevention and natural remedies, complementing modern treatments for overall health.',
        },
        {
            keywords: ['What makes your AYUSH startup different from others?'],
            answer: 'We blend ancient wisdom with modern science, offering personalized, evidence-based health solutions to our clients.',
        },
        {
            keywords: ['What kind of mentorship does the AYUSH portal offer?'],
            answer: 'The portal connects startups with experienced mentors who provide guidance on business development, regulatory challenges, and scaling opportunities.',
        },
        {
            keywords: ['What are the key challenges faced by AYUSH startups?'],
            answer: 'AYUSH startups face challenges such as lack of awareness, regulatory hurdles, limited access to funding, and the need for market validation.',
        },
        {
            keywords: [
                'What is the role of the AYUSH portal in supporting startups?',
            ],
            answer: 'The portal serves as a platform for networking, providing resources, mentorship, and connecting startups with industry experts to foster growth.',
        },
        {
            keywords: [
                'How can startups gain visibility through the AYUSH portal?',
            ],
            answer: 'Startups can showcase their services and products on the portal, gaining exposure to potential partners, investors, and customers.',
        },
        {
            keywords: [
                'What types of resources does the portal offer to AYUSH startups?',
            ],
            answer: 'The portal offers access to training, market research, legal advice, and connections with potential investors and collaborators.',
        },
        {
            keywords: [
                'How can AYUSH startups connect with investors through the portal?',
            ],
            answer: 'Startups can use the portal to present their business models and innovations, enabling direct connections with investors interested in the AYUSH sector.',
        },
        {
            keywords: [
                'What impact do AYUSH startups have on global health trends?',
            ],
            answer: 'AYUSH startups are contributing to the global shift towards preventive healthcare and natural remedies, influencing wellness trends worldwide.',
        },
    ];

    // Function to get the most relevant recommendations based on user input
    const getRecommendedQuestions = (input) => {
        if (input.trim() === '') {
            return setRecommendedQuestions([]);
        }

        // Find the questions with the highest number of keyword matches
        const matchingQuestions = qaPairs.filter((qa) =>
            qa.keywords.some((keyword) =>
                keyword.toLowerCase().includes(input.toLowerCase())
            )
        );

        setRecommendedQuestions(matchingQuestions);
    };

    // Handle user input and send the message
    const handleSend = (inputText) => {
        if (inputText.trim() === '') return;

        const matchedQA = qaPairs.find((qa) =>
            qa.keywords.some((keyword) =>
                inputText.toLowerCase().includes(keyword.toLowerCase())
            )
        );

        const userMessage = { sender: 'user', text: inputText };
        const answer = matchedQA
            ? matchedQA.answer
            : "Sorry, I don't understand that question.";

        // Add user message to chat without overwriting the previous messages
        setChat((prevChat) => [...prevChat, userMessage]);
        setUserInput(''); // Clear input field

        // Add bot's response to chat
        setChat((prevChat) => [...prevChat, { sender: 'bot', text: answer }]);
        setRecommendedQuestions([]); // Clear recommendations after submitting
    };

    // Handle recommendation click to auto-fill and submit
    const handleRecommendationClick = (question) => {
        setUserInput(question); // Auto-fill the question
        handleSend(question); // Submit the question when clicked
    };

    return (
        <div className="min-h-[calc(100vh-110px)] bg-gray-100">
            <div
                className="flex justify-center p-4"
                style={{
                    backgroundImage: `url('${CHATBX}')`,
                }}
            >
                <div className="bg-white shadow-lg rounded-lg w-full max-w-lg flex flex-col overflow-hidden h-auto relative">
                    {/* Header */}
                    <div className="bg-orange-500 text-white text-center py-6">
                        <h1 className="text-3xl font-bold">AYUSH Chatbot</h1>
                        <p className="text-sm mt-2">
                            Ask me anything about AYUSH!
                        </p>
                    </div>

                    {/* Chat Display */}
                    <div
                        className="flex-1 overflow-y-auto p-6 space-y-4 bg-orange-50 rounded-tl-lg rounded-tr-lg shadow-inner relative"
                        style={{ maxHeight: '400px' }}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10"
                            style={{
                                backgroundImage:
                                    "url('https://png.pngtree.com/png-vector/20220802/ourmid/pngtree-3d-rpa-cute-robot-cartoon-sky-blue-gradients-color-chatbot-png-image_6093532.png')",
                            }}
                        ></div>
                        {chat.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* User's Question */}
                                {message.sender === 'user' && (
                                    <div className="flex items-center space-x-2">
                                        <div className="px-5 py-3 max-w-xs rounded-lg text-white shadow-lg bg-orange-500">
                                            {message.text}
                                        </div>
                                        <span role="img" aria-label="human">
                                            👤
                                        </span>
                                    </div>
                                )}

                                {/* Bot's Answer */}
                                {message.sender === 'bot' && (
                                    <div className="flex items-center space-x-2">
                                        <span role="img" aria-label="bot">
                                            🤖
                                        </span>
                                        <div className="px-5 py-3 max-w-xs rounded-lg text-white bg-black">
                                            {message.text}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white flex items-center space-x-4 rounded-bl-lg rounded-br-lg shadow-lg">
                        <input
                            type="text"
                            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
                            placeholder="Type your question..."
                            value={userInput}
                            onChange={(e) => {
                                setUserInput(e.target.value);
                                getRecommendedQuestions(e.target.value); // Update recommendations on input change
                            }}
                        />
                        <button
                            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-110"
                            onClick={() => handleSend(userInput)}
                        >
                            Submit
                        </button>
                    </div>

                    {/* Recommended Questions */}
                    {recommendedQuestions.length > 0 && (
                        <div className="p-4 bg-gray-300 rounded-lg text-orange-700 text-sm mt-2 shadow-lg">
                            <p className="font-semibold text-orange-600">
                                Suggested Questions:
                            </p>
                            {recommendedQuestions.map((qa, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer hover:bg-orange-100 rounded-lg py-2 px-4 mt-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                                    onClick={() =>
                                        handleRecommendationClick(
                                            qa.keywords[0]
                                        )
                                    }
                                >
                                    {qa.keywords[0]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
