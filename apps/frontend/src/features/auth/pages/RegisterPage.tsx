import { RegisterForm } from "../components/register/RegisterForm";
import heroWp from "../../../assets/mistborn-1.webp";

export const RegisterPage = () => {
  return (
    <div
      className="hero bg-base-200 min-h-screen"
      style={{
        backgroundImage: `url(${heroWp})`,
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100/60 w-full max-w-sm shrink-0">
          <div className="card-body">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};
