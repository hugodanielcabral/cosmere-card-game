import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuth";
import { notify } from "../../../../utils/notify";
import { AuthMessage } from "../message/AuthMessage";
import { Form } from "../../../../components/form/Form";
import { Label } from "../../../../components/label/Label";
import { MdEmail, MdPassword } from "react-icons/md";
import { Input } from "../../../../components/input/Input";
import { Button } from "../../../../components/button/Button";
import { Link } from "react-router";

export interface ILoginInput {
  email: string;
  password: string;
}

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginInput>({ defaultValues: INITIAL_FORM_DATA });
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { signin, authError, setAuthError } = useAuth(); // server errors

  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    startTransition(async () => {
      setAuthError(null);
      const result = await signin(data);
      if (result) {
        setIsSuccess(true);
        reset();
      } else {
        notify("Login failed.", "error");
      }
    });
  };

  return (
    <>
      {isSuccess ? (
        <AuthMessage
          title="Welcome back!"
          message="Logged in successfully!!"
          countdownStart={5}
          navigateTo="/"
          buttonText="Go home now."
          pageName="home"
        />
      ) : (
        <Form
          className="flex flex-col justify-center items-center max-w-72 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {authError && (
            <div className="alert alert-error mb-4">{authError?.message}</div>
          )}
          <Label className={errors.email || authError ? "border-error" : ""}>
            <MdEmail color="#666666" />
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
          <Label className={errors.password || authError ? "border-error" : ""}>
            <MdPassword color="#666666" />
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
              })}
            />
          </Label>
          {errors?.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}

          <Button
            className="btn-primary font-bold w-full"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Just a moment, logging you in..." : "Login"}
          </Button>
          <span className="flex gap-1">
            <p className="">Don't have an account?</p>{" "}
            <Link className="text-warning font-bold" to="/register">
              Register now.
            </Link>
          </span>
        </Form>
      )}
    </>
  );
};
