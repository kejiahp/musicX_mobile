import Button from "@/components/button";
import Container from "@/components/container";
import { FormInputField } from "@/components/formtext-field";
import ThemedActivityIndicator from "@/components/themed-activityindicator";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SIZES } from "@/constants/theme";
import {
  signup_validation_schema,
  TSignUpValidatonSchema,
} from "@/schema/auth-schema";
import { SIGN_UP_OPERATION } from "@/service/auth-queries";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";

type SignUpResponse = {
  signup: {
    data: { email: string; name: string };
    message: string;
    success: boolean;
  };
};

export default function SignUpScreen() {
  const toast = useToast();
  const router = useRouter();
  const [createNewUser, { loading }] = useMutation(SIGN_UP_OPERATION, {
    onCompleted(data) {
      const data_t: SignUpResponse = data as unknown as SignUpResponse;
      toast.show(data_t.signup.message, {
        type: "success",
      });
      router.replace("/login");
    },
    onError(error) {
      toast.show(error.message ?? "Something went wrong", {
        type: "danger",
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSignUpValidatonSchema>({
    resolver: zodResolver(signup_validation_schema),
    mode: "all",
  });

  const handleOnSubmitHandler = (inputData: TSignUpValidatonSchema) => {
    createNewUser({
      variables: {
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
      },
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
        <ThemedText type="title">Sign Up</ThemedText>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInputField
              label="Name"
              placeholder="Jeffery Epstein"
              keyboardType="default"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
          name="name"
          defaultValue=""
        />

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

        <Button
          disabled={loading}
          onPress={handleSubmit(handleOnSubmitHandler)}
        >
          {loading ? (
            <ThemedActivityIndicator />
          ) : (
            <ThemedText>Create Account</ThemedText>
          )}
        </Button>
      </ThemedView>

      <ThemedText style={{ fontSize: SIZES.xsmall, textAlign: "center" }}>
        Already have an account?{" "}
        <Link replace href={"/login"}>
          <Link.Trigger>
            <ThemedText style={{ fontSize: SIZES.xsmall }} type="link">
              Login
            </ThemedText>
          </Link.Trigger>
        </Link>
      </ThemedText>
    </Container>
  );
}
