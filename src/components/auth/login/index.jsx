/* eslint-disable react/no-unstable-nested-components */
import { faCircleExclamation, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../helpers/button';
import Input from '../../helpers/input';
import AuthLayout from '../authLayout';
import { logInUser } from '../helpers';

function Login() {
    const formRef = useRef();
    const formSubmitButtonRef = useRef();
    const navigate = useNavigate();

    const [loginErrorMessage, setloginErrorMessage] = useState(null);

    // login error types
    const loginErrorsTypes = {
        'auth/user-not-found': 'Your password or username is incorrect',
        'auth/network-request-failed': 'Your internet connection is lost',
    };

    // create new user
    function loginExistingUser(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const submitBtn = formSubmitButtonRef.current;
        // make submit button disabled
        submitBtn.disabled = true;

        logInUser(
            email,
            password,
            () => {
                navigate('/', { replace: true });
            },
            (error) => {
                submitBtn.disabled = false;
                event.target.classList.add('error');
                setloginErrorMessage(loginErrorsTypes[error.code]);
            }
        );
    }

    useEffect(() => {
        formRef.current.addEventListener('submit', loginExistingUser);
    }, []);

    return (
        <AuthLayout>
            <div className="text-center">
                <h1 className="text-[16px] font-medium text-dark-600 leading-[24px] pb-1">Login Account</h1>
                <p className="text-dark-400">Login and access your dashboard</p>
                <form className="pt-7" ref={formRef}>
                    <Input
                        Icon={() => <FontAwesomeIcon icon={faEnvelope} />}
                        type="email"
                        name="email"
                        placeholder="Email"
                        classes="mb-6 display-error"
                        required
                    />
                    <Input
                        Icon={() => <FontAwesomeIcon icon={faLock} />}
                        type="password"
                        name="password"
                        placeholder="Password"
                        classes="mb-6 display-error"
                        required
                    />
                    <div className="error-notice">
                        <p className="text-[#d93025] text-[12px]">
                            <span className="inline-block mr-1">
                                <FontAwesomeIcon icon={faCircleExclamation} />
                            </span>
                            {loginErrorMessage || 'Some unknown occured'}
                        </p>
                    </div>
                    <Button type="submit" text="Login" classes="block w-full mt-7" ref={formSubmitButtonRef} />
                </form>

                <p className="pt-10">
                    Don't have an account ?{' '}
                    <Link to="/register" className="text-blue">
                        Register
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}

export default Login;
