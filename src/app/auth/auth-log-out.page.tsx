import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "./store/auth.actions";
import { useAuthSelector } from "./store/auth.selectors";

export default function AuthLogOutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {token} = useAuthSelector();

  useEffect(() => {
    dispatch(logOutUser())
      .then(({ meta }) => {
        if (meta.requestStatus !== "rejected") {
          navigate('/', { replace: true });
        }
      });
  }, [])

  return(<></>);
}