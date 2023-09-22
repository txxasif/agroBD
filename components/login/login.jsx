"use client"
import { loginUserAsync } from '@/store/reducers/user.reducer';
import { currentUserSelector, currentUserErrorSelector, currentUserErrorTextSelector } from '@/store/reducers/user.selector';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const defaultValue = {
    email: '',
    password: ''
}
export default function LogIn() {
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelector);
    const isError = useSelector(currentUserErrorSelector);
    const isErrorMessage = useSelector(currentUserErrorTextSelector);
    const [form, setForm] = useState(defaultValue);
    const router = useRouter();
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    }
    useEffect(() => {
        if (user) {

            router.push('/');
        }

    }, [user]);
    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(loginUserAsync(form));
    }
    return (
        <div className="form-control w-full max-w-xs border border-gray-600">
            <form className="space-y-1 px-2 py-3" onSubmit={handleSubmit}>

                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" onChange={handleChange} placeholder="Enter Your Email" name='email' value={form.email} className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" onChange={handleChange} placeholder="Enter Your Password" name='password' value={form.password} className="input input-bordered w-full max-w-xs" />
                {
                    isError ? <p>{isErrorMessage}</p> : ''
                }
                <div className="flex flex-col items-center justify-center">
                    <button className="btn w-fit">Login</button>
                    <p>Not a member? <Link href={'/signup'} className='text-red-500'>SignUp Now</Link></p>
                </div>

            </form>
        </div>
    )
}