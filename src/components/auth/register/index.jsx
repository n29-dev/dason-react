/* eslint-disable react/no-unstable-nested-components */
import { faEnvelope, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../globals/helpers/button';
import Input from '../../globals/helpers/input';
import { createNewUser } from '../actions';
import AuthLayout from '../authLayout';

function Register() {
    const formRef = useRef();
    const navigate = useNavigate();

    // create new user
    function registerNewUser(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        createNewUser(email, password, (user) => {
            console.log(user);
            navigate('/', {
                replace: true,
            });
        });
    }

    useEffect(() => {
        formRef.current.addEventListener('submit', registerNewUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthLayout>
            <div className="text-center">
                <h1 className="text-[16px] font-medium text-dark-600 leading-[24px] pb-1">Register Account</h1>
                <p className="text-dark-400">Create your free account now</p>
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
                        Icon={() => <FontAwesomeIcon icon={faUsers} />}
                        type="text"
                        name="username"
                        placeholder="Username"
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
                    <p className="pb-9 text-left">
                        By registering you agree to the <span className="text-blue">Terms of Use</span>
                    </p>
                    <Button type="submit" text="Register" classes="block w-full" />
                </form>

                <p className="pt-10">
                    Already have an account ?{' '}
                    <a className="text-blue" href="#">
                        Login
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
}

export default Register;
