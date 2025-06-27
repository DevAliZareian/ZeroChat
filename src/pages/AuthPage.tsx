import { Box, Button, FormControl, FormErrorMessage, Input, VStack, Text, Center, Heading } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email"),
  password: Yup.string().min(6, "Minimum 6 characters"),
});

const MotionBox = motion(Box);

export default function AuthPage() {
  return (
    <Box minH="100vh" bg="layout.background">
      <Center minH="100vh" px={4}>
        <MotionBox w="100%" maxW={{ base: "300px", md: "360px" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Heading size="lg" mb={6} textAlign="center" color="accent.blue" fontWeight="extrabold">
            Welcome to ZeroChat
          </Heading>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <VStack spacing={4} align="stretch">
                  <Field name="email">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.email && touched.email}>
                        <Input {...field} type="email" placeholder="Email" variant="filled" _focus={{ borderColor: "accent.blue", bg: "white" }} />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.password && touched.password}>
                        <Input {...field} type="password" placeholder="Password" variant="filled" _focus={{ borderColor: "accent.blue", bg: "white" }} />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    color="white"
                    bgColor="accent.blue"
                    isLoading={isSubmitting}
                    w="full"
                    mt={2}
                    _hover={{
                      bg: "text.links", // custom color or darker shade
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
