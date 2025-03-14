import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const fetchChatbotResponse = async (message: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: fetchChatbotResponse,
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);

    mutate(input);
    setInput("");
  };

  return (
    <div className="p-4 border rounded w-96">
      <h2 className="text-lg font-bold mb-2">Chatbot</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
              }
              style={{
                padding: "5px",
                borderRadius: "5px",
                display: "inline-block",
                marginBottom: "4px",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border p-1 flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
          onClick={handleSend}
          disabled={isPending}
        >
          {isPending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
