import { Link,useNavigate } from "react-router-dom";
import logoImage from "../assets/images/lws-logo-light.svg";
import {useEffect, useState} from 'react';
import { useRegisterMutation } from "../features/auth/authApi";
import Error from "../components/ui/Error";


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const [register, {data, isLoading, error:registerError, status}] = useRegisterMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            setError('Confirm password not matched!')
        }else{
            register({
                name,
                email,
                password
            })
        }
        console.log('details', name, email, password, confirmPassword, agreed)
    }

    useEffect(() => {
        if(registerError){
            setError(registerError.data)
        }
        if(data){
            navigate('/inbox');
            console.log('data', data)

        }
    }, [data, registerError, navigate])
    
    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                       
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" method="POST" onSubmit={(e)=> handleSubmit(e)}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="Name"
                                    type="Name"
                                    autoComplete="Name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="sr-only"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="confirmPassword"
                                    autoComplete="current-confirmPassword"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="confirmPassword"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="agreed"
                                    name="agreed"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                    onChange={() => setAgreed(true)}
                                />
                                <label
                                    htmlFor="accept-terms"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Agreed with the terms and condition
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                Sign up
                            </button>
                        </div>
                       {
                        error &&  <Error message={error}/>
                       }
                    </form>
                </div>
            </div>
        </div>
    );
}
