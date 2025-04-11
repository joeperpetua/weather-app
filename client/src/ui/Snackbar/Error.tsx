import { DURATION, SnackbarElementProps } from "baseui/snackbar";
import { MdError } from "react-icons/md";

const ErrorSnackbar = (
  title: string,
  error: any, 
  enqueue: (elementProps: SnackbarElementProps, duration?: number) => void,
  dequeue: () => void
) => {
  const message = `${title}${title && "."} ${error}`
  enqueue({
    startEnhancer: () => <MdError />,
    message,
    actionMessage: "Close",
    actionOnClick: () => dequeue(),
    overrides: { Root: { style: { background: "red" } } }
  }, DURATION.medium);
};

export default ErrorSnackbar;