import { useState, useTransition } from "react";
import { Form } from "../../../../components/form/Form";
import { Input } from "../../../../components/input/Input";
import { Label } from "../../../../components/label/Label";
import { Button } from "../../../../components/button/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { AuthMessage } from "../message/AuthMessage";
import { Link } from "react-router";
import { notify } from "../../../../utils/notify";
import { useForm, type SubmitHandler } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({ defaultValues: INITIAL_FORM_DATA });
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup, authError, setAuthError } = useAuth();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    startTransition(async () => {
      setAuthError(null);
      const result = await signup(data);
      if (result) {
        setIsSuccess(true);
        reset();
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
            countdownStart={5}
            navigateTo="/login"
            buttonText="Login now."
            pageName="login"
          />
        </>
      ) : (
        <Form
          className="flex flex-col justify-center items-center max-w-72 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {authError && (
            <div className="alert alert-error mb-4">{authError.message}</div>
          )}
          <Label className={errors.username ? "border-error" : ""}>
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
              placeholder="Username"
              title="Only letters, numbers or dash"
              {...register("username", {
                required: "Username is required.",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long.",
                },
                maxLength: {
                  value: 30,
                  message: "Username cannot exceed 30 characters.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9-]{3,30}$/i,
                  message: "Only letters, numbers or dash.",
                },
              })}
            />
          </Label>
          {errors?.username && (
            <p className="text-error text-sm">{errors.username.message}</p>
          )}
          <Label className={errors.email ? "border-error" : ""}>
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
              placeholder="email@site.com"
              title="Only valid email providers"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/i,
                  message:
                    "Please enter a valid email address (must include '@' and a domain).",
                },
              })}
            />
          </Label>
          {errors?.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}
          <Label className={errors.password ? "border-error" : ""}>
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
              placeholder="Password"
              title="Only letters, numbers or dash"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters.",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/i,
                  message:
                    "Password must contain at least one letter and one number.",
                },
              })}
            />
          </Label>
          {errors?.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}

          <Label className={errors.repassword ? "border-error" : ""}>
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
              placeholder="Repeat password"
              title="Only letters, numbers or dash"
              {...register("repassword", {
                required: "Please confirm your password.",
                validate: {
                  matchPassword: (value) => {
                    const password = getValues("password");
                    if (!password) {
                      return "Please enter a password first.";
                    }
                    if (value !== password) {
                      return "Passwords do not match.";
                    }
                    return true;
                  },
                },
              })}
            />
          </Label>
          {errors?.repassword && (
            <p className="text-error text-sm">{errors.repassword.message}</p>
          )}
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
