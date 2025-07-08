import { toast } from "react-toastify";

interface IToastOptions {
  position?: PositionOptions;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: ThemeOptions;
}

type PositionOptions =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

type ThemeOptions = "light" | "dark" | "colored";

type ToastType = "info" | "success" | "warning" | "error" | "default";

const defaultOptions: IToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
};

export const notify = (
  text: string,
  type: ToastType = "default",
  options?: IToastOptions
) => {
  const finalOptions = { ...defaultOptions, ...options };
  
  switch (type) {
    case "info":
      toast.info(text, finalOptions);
      break;
    case "success":
      toast.success(text, finalOptions);
      break;
    case "warning":
      toast.warning(text, finalOptions);
      break;
    case "error":
      toast.error(text, finalOptions);
      break;
    default:
      toast(text, finalOptions);
      break;
  }
};