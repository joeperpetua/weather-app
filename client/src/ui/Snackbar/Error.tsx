import { DURATION, SnackbarElementProps } from "baseui/snackbar";
import { MdError } from "react-icons/md";

const ErrorSnackbar = (
  title: string,
  error: any, 
  enqueue: (elementProps: SnackbarElementProps, duration?: number) => void,
  dequeue: () => void
) => {
  console.log(error);
  enqueue({
    startEnhancer: () => <MdError />,
    message: `${title}. ${error}`,
    actionMessage: "Close",
    actionOnClick: () => dequeue(),
    overrides: { Root: { style: { background: "red" } } }
  }, DURATION.long);
};

export default ErrorSnackbar;