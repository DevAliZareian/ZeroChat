import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, FormControl, FormErrorMessage } from "@chakra-ui/react";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field name="email">
            {({ field }: any) => (
              <FormControl isInvalid={!!errors.email && touched.email}>
                <Input {...field} placeholder="Email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="password">
            {({ field }: any) => (
              <FormControl mt={4} isInvalid={!!errors.password && touched.password}>
                <Input {...field} type="password" placeholder="Password" />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button mt={6} colorScheme="blue" isLoading={isSubmitting} type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}
