import Button from "@/components/button";
import Container from "@/components/container";
import { FormInputField } from "@/components/formtext-field";
import { ThemedText } from "@/components/themed-text";

export default function LoginScreen() {
  return (
    <Container isScrollable>
      <ThemedText type="title">Login Screen</ThemedText>

      <FormInputField label={"Name"} errorMessage={"something went wrong"} />
      <FormInputField label={"Email"} errorMessage={"something went wrong"} />
      <FormInputField
        label={"Passowrd"}
        errorMessage={"something went wrong"}
      />

      <Button>
        <ThemedText>Login</ThemedText>
      </Button>
    </Container>
  );
}
