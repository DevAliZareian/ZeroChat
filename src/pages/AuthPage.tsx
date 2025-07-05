import { PATHS } from "@/config/paths";
import { useLogin } from "@/hooks/useLogin";
import colors from "@/theme/colors";
import { Box, Button, FormControl, FormErrorMessage, Input, VStack, Text, Center, Heading, useColorMode, useToast } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const MotionBox = motion(Box);

export default function AuthPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { mutateAsync: login } = useLogin();

  const handleSubmit = async (values: { email: string; password: string }, actions: any) => {
    try {
      const result = await login({
        username: values.email,
        password: values.password,
      });

      actions.setSubmitting(false);

      if (result?.access_token) {
        navigate(PATHS.app);
      }
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response.statusText || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      actions.setSubmitting(false);
    }
  };

  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  return (
    <Box minH="100vh" bg="layout.background">
      <Center minH="100vh" px={4}>
        <MotionBox w="100%" maxW={{ base: "300px", md: "360px" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Heading size="lg" mb={6} textAlign="center" color={currentColors.accent.blue} fontWeight="extrabold">
            Welcome to ZeroChat
          </Heading>
          <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={(values, actions) => handleSubmit(values, actions)}>
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Form>
                <VStack spacing={4} align="stretch">
                  <Field name="email">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.email && touched.email}>
                        <Input {...field} type="email" placeholder="Email" variant="filled" _focus={{ borderColor: currentColors.accent.blue, bg: currentColors.layout.background }} />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.password && touched.password}>
                        <Input {...field} type="password" placeholder="Password" variant="filled" _focus={{ borderColor: currentColors.accent.blue, bg: currentColors.layout.background }} />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    color={colorMode === "dark" ? "#2B2B2B" : "white"}
                    bgColor={currentColors.accent.blue}
                    isLoading={isSubmitting}
                    isDisabled={!isValid || !dirty}
                    w="full"
                    mt={2}
                    _hover={{
                      bg: currentColors.text.links,
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                  >
                    Login
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </MotionBox>
      </Center>
    </Box>
  );
}
