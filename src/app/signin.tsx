"use client"
import { provider,auth } from "./config"
import {signInWithPopup} from 'firebase/auth'
import { useEffect, useState } from "react"
import Protected from "./potected"
export default function Signin()
{
    const [value,setvalue]=useState<string | null>("")
   
    function handleauth()
    {
        signInWithPopup(auth,provider).then((data)=>{
            setvalue(data.user.email)
            console.log(data)
            // localStorage.setItem("email",data.user.email)
        })
    }
    // useEffect(()=>setvalue(localStorage.getItem("email")))
    return <div>
       
        {value?<Protected email={value}/>:<button className=" bg-blue-600 text-white p-2 px-5 rounded-md" onClick={handleauth}>sign in with google</button>}

    </div>
}