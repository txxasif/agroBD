'use client'
import Profile from "@/components/profile/profile";
import { currentUserSelector } from "@/store/reducers/user.selector"
import { store } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux"
export default function Page() {
    //console.log(store.getState().user.currentUser, 'from store');
    console.log('mm');
    const isCurrentUser = useSelector(currentUserSelector);
    console.log(isCurrentUser, 'hiiiiiiiii v');
    useEffect(() => {
        console.log('hii v');
    })

    return (
        <div>
            {
                !isCurrentUser ? 'Please Login' : <Profile />
            }
        </div>
    )
}