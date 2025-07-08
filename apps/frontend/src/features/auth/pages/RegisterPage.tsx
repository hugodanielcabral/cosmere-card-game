import { RegisterForm } from "../components/register/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="hero bg-linear-to-b from-primary to-base-300 min-h-screen flex flex-col">
      <h1 className="text-4xl text-white font-bold my-20">Cosmere Card Game</h1>
      <RegisterForm />
    </div>
  );
};
