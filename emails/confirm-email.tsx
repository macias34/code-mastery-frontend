import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ConfirmEmail() {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Text>Hello world</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
