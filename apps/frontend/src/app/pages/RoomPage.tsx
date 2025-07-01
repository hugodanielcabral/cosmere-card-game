import { useParams } from "react-router";
import { handleCopy } from "../utils/copyToClipboard";
import heroWp from "../../assets/stormlight-archive-1.webp";

type RoomStatus = "waiting" | "ready";

export const RoomPage = () => {
  const { id } = useParams();
  const isHost = true; //! placeholder
  const roomInvCode = "drt23sa"; //! placeholder
  const roomStatus: RoomStatus = "waiting"; //! placeholder
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroWp})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Room name: {id}</h1>
          <div className="flex flex-row">
            <h3 className="mb-5 text-2xl font-bold">Invite your friend using the next code: {roomInvCode}</h3>
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
