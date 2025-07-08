import { useState, useTransition } from "react";
import { Form } from "../../../../components/form/Form";
import { Input } from "../../../../components/input/Input";
import { Label } from "../../../../components/label/Label";
import { useForm } from "../../../../hooks/useForm";
import { Button } from "../../../../components/button/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { AuthMessage } from "../message/AuthMessage";
import { Link } from "react-router";
import { notify } from "../../../../utils/notify";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

const INITIAL_FORM_DATA = {
  username: "",
  email: "",
  password: "",
  repassword: "",
};

export const RegisterForm = () => {
  const { values, setValues, handleChange } =
    useForm<RegisterFormData>(INITIAL_FORM_DATA);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { signup, error, setError } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      setError(null);
      const result = await signup(values);
      if (result) {
        setIsSuccess(true);
        setValues(INITIAL_FORM_DATA);
      } else {
        notify("Registration failed.", "error");
      }
    });
  };

  return (
    <>
      {isSuccess ? (
        <>
          <AuthMessage
            title="Welcome!"
            message="Account created successfully!"
            countdownStart={9999}
            navigateTo="/login"
            buttonText="Login now."
            pageName="login"
          />
        </>
      ) : (
        <Form
          className="flex flex-col justify-center items-center w-fit gap-4"
          handleSubmit={handleSubmit}
        >
          {error && (
            <div className="alert alert-error mb-4">{error.message}</div>
          )}
          <Label>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <Input
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength={3}
              maxLength={30}
              title="Only letters, numbers or dash"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </Label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>
          <Label>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <Input
              type="email"
              required
              placeholder="Email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Only valid email providers"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Label>
          <p className="validator-hint hidden">
            Must be a valid email
            <br />
            using only letters, numbers and symbols like @ and .
          </p>
          <Label>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <Input
              type="password"
              required
              placeholder="Password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$"
              minLength={6}
              maxLength={20}
              title="Only letters, numbers or dash"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </Label>
          <p className="validator-hint hidden">
            Must be 6 to 20 characters
            <br />
            including at least one letter and one number
          </p>
          <Label>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <Input
              type="password"
              required
              placeholder="Repeat password"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength={3}
              maxLength={30}
              title="Only letters, numbers or dash"
              name="repassword"
              value={values.repassword}
              onChange={handleChange}
            />
          </Label>
          <p className="validator-hint hidden">
            Must match the password exactly
          </p>
          <Button
            className="btn-primary font-bold w-full"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating account, please wait..." : "Register"}
          </Button>
          <span className="flex gap-1">
            <p className="">Do you have an account?</p>{" "}
            <Link className="text-info font-bold" to="/login">
              Login now.
            </Link>
          </span>
        </Form>
      )}
    </>
  );
};
