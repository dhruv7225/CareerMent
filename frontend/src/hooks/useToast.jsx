import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setToasts } from "../app/slices/MeetingSlice";

function useToast() {
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  const dispatch = useAppDispatch();

  const createToast = ({ title, type }) => {
    dispatch(
      setToasts(
        toasts.concat({
          id: new Date().toISOString(),
          title,
          color: type,
        })
      )
    );
  };

  return [createToast];
}

export default useToast;
