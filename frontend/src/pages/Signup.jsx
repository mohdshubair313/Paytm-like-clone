import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from "axios"

export default function Signup() {
    const [firstName,setfirstname] = useState("");
    const [Lastname,setlastname] = useState("");
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    return (
        <div className="bg-slate-400 h-screen flex justify-center"> 
        <div className=" flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} /> &nbsp;
                <SubHeading comment={"Enter Your informatiom to create your account"} /> &nbsp;
                <InputBox onchange={ e => {setfirstname(e.target.value)}} label={"firstName"} placeholder={"John"} /> &nbsp;
                <InputBox onchange={ e => {setlastname(e.target.value)}}  label={"Lastname"} placeholder={"abraham"} /> &nbsp;
                <InputBox onchange={ e => {setusername(e.target.value)}}     label={"Email address"} placeholder={"John@gmail.com"} /> &nbsp;
                <InputBox onchange={ e => {setpassword(e.target.value)}}  label={"Password"} placeholder={"john123"} /> &nbsp;
                <div className="pt-4">
                <Button onclick={ async () => {
                   const response = await axios.post("http://localhost:8080/api/v1/user/signup", {
                        username:username,
                        firstName:firstName,
                        lastname:Lastname,
                        password:password,
                    });
                    localStorage.setItem("token",response.data.token);
                }} label={"Sign Up"}/> 
                </div>
                <BottomWarning label={"already have an account?"} buttonText={"sign In"} to={"/signin"}/>
            </div>
        </div>
        </div>
    )
}