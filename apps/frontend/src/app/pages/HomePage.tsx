import { Link } from "react-router";
import heroWp from "../../assets/stormlight-archive-1.webp";

export const HomePage = () => {
  const isAuth = true; //! placeholder

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
          <h1 className="mb-5 text-4xl font-bold">Cosmere Card Game</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {!isAuth ? (
            <button className="btn btn-primary">Create an account now</button>
          ) : (
            <div>
              <Link className="btn btn-primary" to={"/room/123"}>Create a room</Link>{" "}
              <button className="btn btn-primary">Join a room</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
