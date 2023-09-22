"use client"
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { currentUserIdSelector, currentUserSelector } from '@/store/reducers/user.selector'
import { setCurrentUser } from '@/store/reducers/user.reducer'
import { useRouter } from 'next/navigation'
export default function Header() {
    const currentUser = useSelector(currentUserSelector);
    const currentUserId = useSelector(currentUserIdSelector);
    const dispatch = useDispatch();
    const router = useRouter();
    console.log(currentUserId, 'hii');
    function logOut() {
        dispatch(setCurrentUser());
        router.push('/')
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost normal-case text-xl">Home</Link>
            </div>
            <div className="flex-none">
                {currentUser ? <Link href={`/${currentUserId}`} className='btn btn-ghost normal-case text-lg'>Profile</Link> : ""}
                {
                    currentUser ? <div className='btn btn-ghost normal-case text-lg' onClick={logOut}>Sign Out</div> :
                        <Link href='/login' className='btn btn-ghost normal-case text-lg'>LogIn</Link>
                }
            </div>
        </div>
    )
}