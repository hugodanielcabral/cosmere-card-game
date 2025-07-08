import { RegisterForm } from "../components/register/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="hero bg-linear-to-b from-base-100 to-base-300 min-h-screen flex flex-col">
      <h1 className="text-3xl sm:text-4xl text-primary font-bold my-10 sm:my-12 md:my-14 lg:my-16">Cosmere Card Game</h1>
      <RegisterForm />
    </div>
  );
};
