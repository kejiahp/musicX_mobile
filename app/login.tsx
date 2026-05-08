import Button from "@/components/button";
import Container from "@/components/container";
import { FormInputField } from "@/components/formtext-field";
import ThemedActivityIndicator from "@/components/themed-activityindicator";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SIZES } from "@/constants/theme";
import { useAuthSession } from "@/context/AuthSessionContext";
import {
  login_validation_schema,
  TLoginValidationSchema,
} from "@/schema/auth-schema";
import { LOGIN_OPERATION } from "@/service/auth-queries";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";

type LoginResponse = {
  login: {
    success: boolean;
    message: string;
    data: { token: string };
  };
};

export default function LoginScreen() {
  const toast = useToast();
  const router = useRouter();
  const { signIn } = useAuthSession();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginValidationSchema>({
    resolver: zodResolver(login_validation_schema),
    mode: "all",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_OPERATION, {
    onCompleted(data) {
      const data_t: LoginResponse = data as unknown as LoginResponse;

      signIn(data_t.login.data.token)
        .then(() => {
          toast.show(data_t.login.message, {
            type: "success",
          });
          router.dismissTo("/");
        })
        .catch((err) => {
          console.error("FAILED TO SAVE AUTH TOKEN TO KEYCHAIN", err.message);
        });
    },
    onError(error) {
      toast.show(error.message ?? "Something went wrong", {
        type: "danger",
      });
    },
  });

  const onSubmitHandler = (inputData: TLoginValidationSchema) => {
    loginUser({
      variables: { email: inputData.email, password: inputData.password },
    });
  };

  return (
    <Container
      isScrollable
      innerViewStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <ThemedView>
        <ThemedText type="title">Login Screen</ThemedText>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Email"
              placeholder="diddy@babyoil.com"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
          name="email"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Password"
              placeholder="Example123@"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
          name="password"
          defaultValue=""
        />

        <Button disabled={loading} onPress={handleSubmit(onSubmitHandler)}>
          {loading ? (
            <ThemedActivityIndicator />
          ) : (
            <ThemedText>Login</ThemedText>
          )}
        </Button>
      </ThemedView>

      <ThemedText style={{ fontSize: SIZES.xsmall, textAlign: "center" }}>
        You don&apos;t have an account?{" "}
        <Link replace href={"/signup"}>
          <Link.Trigger>
            <ThemedText style={{ fontSize: SIZES.xsmall }} type="link">
              Sign up
            </ThemedText>
          </Link.Trigger>
        </Link>
      </ThemedText>
    </Container>
  );
}
