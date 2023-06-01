import Head from 'next/head';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
    const router = useRouter();
    const { id } = router.query;
    const formik = useFormik({
        initialValues: {
            userID: '',
            policy: false
        },
        validationSchema: Yup.object({

            userID: Yup
                .string()
                .max(255)
                .required('User ID is required'),

            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'This field must be checked'
                )
        }),
        onSubmit: values => {
            fetch(`/api/organizations/${encodeURIComponent(id)}/members`, {method: 'POST', body: JSON.stringify({members: [values.userID]}), headers: {"Content-type": "application/json"}}).then(response => {
                if (response.ok) {

                } else {
                    alert("Adding user to organization failed");
                }
            })
            //   fetch(`/api/users`, {
            //         method: 'POST', 
            //         body: JSON.stringify({
            //           given_name: values.firstName, 
            //           family_name: values.lastName, 
            //           email: values.email, 
            //           password: values.password,
            //           connection: 'Username-Password-Authentication'
            //         }),
            //         headers: {
            //             'Content-type': 'application/json; charset=UTF-8',
            //         }
            //     }).then(response => {console.log(response); response.ok ? (() => {})() : alert(`Connection error`);});
        }
    });

    return (
        <>
            <Head>
                <title>
                    Add member | Controlcognizant
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
                <Container maxWidth="sm">
                    <NextLink
                        href="/"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NextLink>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Add member to organization
                            </Typography>
                            {/* <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography> */}
                        </Box>
                        
                        <TextField
                            // error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                            fullWidth
                            // helperText={formik.touched.lastName && formik.errors.lastName}
                            label="User ID"
                            margin="normal"
                            name="userID"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            variant="outlined"
                        />

                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <Checkbox
                                checked={formik.values.policy}
                                name="policy"
                                onChange={formik.handleChange}
                            />
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                I have read the
                                {' '}
                                <NextLink
                                    href="#"
                                    passHref
                                >
                                    <Link
                                        color="primary"
                                        underline="always"
                                        variant="subtitle2"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </NextLink>
                            </Typography>
                        </Box>
                        {Boolean(formik.touched.policy && formik.errors.policy) && (
                            <FormHelperText error>
                                {formik.errors.policy}
                            </FormHelperText>
                        )}
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Add member to organization
                            </Button>
                        </Box>
                        
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
