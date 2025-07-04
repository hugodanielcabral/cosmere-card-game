import { useParams } from "react-router";
import { handleCopy } from "../../utils/copyToClipboard";
import heroWp from "../../assets/stormlight-archive-1.webp";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io("http://localhost:3000");

type RoomStatus = "waiting" | "ready";

export const RoomPage = () => {
  const { id } = useParams();
  const mySocketID = socket.id?.slice(0, 6);
  const isHost = true; //! placeholder
  const roomInvCode = "drt23sa"; //! placeholder
  const roomStatus: RoomStatus = "waiting"; //! placeholder
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ body: string; from: string }[]>(
    []
  );

  useEffect(() => {
    socket
      .timeout(5000)
      .on("chat message", (object: { body: string; from: string }) => {
        setMessages((prev) => [...prev, object]); //
      });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) return;

    try {
      const response = await socket.timeout(5000).emitWithAck("chat message", {
        body: message,
        from: socket.id?.slice(0, 6),
      });
      console.log(response.status);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroWp})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        {/* Chat */}

        <div className="max-w-md">
          <ul id="messages" className="mb-4 max-h-72 overflow-y-auto p-4 bg-amber-600">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <li
                  key={index}
                  className={`text-left p-2 mb-1 rounded ${
                    message.from === mySocketID ? "bg-amber-700 mr-6" : "bg-gray-700 ml-6"
                  }`}
                >
                  Message from {message.from}: {message.body}
                </li>
              ))}
          </ul>
          <form onSubmit={handleOnSubmit} className="space-y-2">
            <input
              type="text"
              id="input"
              autoComplete="off"
              placeholder="Type here"
              className="input"
              value={message}
              onChange={handleOnChange}
            />
            <button type="submit" disabled={!message} className="btn btn-info">
              Send message
            </button>
          </form>
        </div>

        {/* Chat */}
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Room name: {id}</h1>
          <div className="flex flex-row">
            <h3 className="mb-5 text-2xl font-bold">
              Invite your friend using the next code: {roomInvCode}
            </h3>
            <button className="btn" onClick={() => handleCopy(roomInvCode)}>
              Copy code
            </button>
          </div>
          {isHost && (
            <button className="btn btn-primary">
              {roomStatus === "waiting"
                ? "Waiting for an opponent..."
                : "Ready to start!"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
