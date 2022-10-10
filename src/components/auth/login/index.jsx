/* eslint-disable react/no-unstable-nested-components */
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../globals/helpers/button';
import Input from '../../globals/helpers/input';
import { logInUser } from '../actions';
import AuthLayout from '../authLayout';

function Login() {
    const formRef = useRef();
    const formSubmitButtonRef = useRef();
    const navigate = useNavigate();

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
                console.log(error);
                submitBtn.disabled = false;
                event.target.reset();
            }
        );
    }

    useEffect(() => {
        formRef.current.addEventListener('submit', loginExistingUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        classes="mb-6"
                        required
                    />
                    <Input
                        Icon={() => <FontAwesomeIcon icon={faLock} />}
                        type="password"
                        name="password"
                        placeholder="Password"
                        classes="mb-6"
                        required
                    />
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
