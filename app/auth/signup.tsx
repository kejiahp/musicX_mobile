import Button from "@/components/button";
import Container from "@/components/container";
import { FormInputField } from "@/components/formtext-field";
import { ThemedText } from "@/components/themed-text";
import {
  signup_validation_schema,
  TSignUpValidatonSchema,
} from "@/schema/auth-schema";
import { SIGN_UP_OPERATION } from "@/service/auth-queries";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Alert } from "react-native";

export default function SignUpScreen() {
  const [createNewUser, { data, loading, error }] =
    useMutation(SIGN_UP_OPERATION);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSignUpValidatonSchema>({
    resolver: zodResolver(signup_validation_schema),
    mode: "all",
  });

  const handleOnSubmitHandler = (inputData: TSignUpValidatonSchema) => {
    console.log(inputData);
    Alert.alert("LOL", "lolcat");
    // createNewUser();
  };

  return (
    <Container isScrollable>
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

      <Button onPress={handleSubmit(handleOnSubmitHandler)}>
        <ThemedText>Create Account</ThemedText>
      </Button>
    </Container>
  );
}
