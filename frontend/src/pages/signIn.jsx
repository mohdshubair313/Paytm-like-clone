import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";

export default function SignIn() {
    return (
        <div className="bg-slate-400 h-screen flex justify-center">
        <div className=" flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} /> &nbsp;
                <SubHeading comment={"Enter Your credentials to Login Your Account"} /> &nbsp;
                <InputBox label={"Email"} placeholder={"John@gmail.com"} /> &nbsp;
                <InputBox label={"Password"} placeholder={"john123"} /> &nbsp;
                <div className="pt-4">
                <Button label={"Sign In"}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"sign Up"} to={"/signup"}/>
            </div>
        </div>
        </div>
    )
}