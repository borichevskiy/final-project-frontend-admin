import { useAppDispatch } from "hooks/redux";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "./auth-form.component";
import { signInUser } from "./store/auth.actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "./auth-schemas.yap";
import { SignInDto } from "./types/sign-in-dto.type";

export default function AuthSignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignIn),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmitForm = (data: FieldValues) => {
    const dto: SignInDto = {
      email: data.email,
      password: data.password,
    };

    dispatch(signInUser({ dto })).then(({ meta }) => {
      if (meta.requestStatus !== "rejected") {
        reset();
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <Form
      title="Sign In"
      nameBtn="Sign In"
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
      control={control}
      errors={errors}
      isSignIn={true}
    />
  );
}