import { DURATION, SnackbarElementProps } from "baseui/snackbar";
import { MdDone } from "react-icons/md";

const SuccessSnackbar = (
  title: string,
  actionMessage: string,
  enqueue: (elementProps: SnackbarElementProps, duration?: number) => void,
  action: () => void
) => {
  enqueue({
    startEnhancer: () => <MdDone />,
    message: title,
    actionMessage,
    actionOnClick: () => action(),
    overrides: { Root: { style: { background: "green" } } }
  }, DURATION.short);
};

export default SuccessSnackbar;
