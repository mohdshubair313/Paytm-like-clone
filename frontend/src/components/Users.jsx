import { useEffect, useState } from "react"
import Button from "./Button";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export default function Users() {
    const [users, setusers] = useState([]);
    const [filter, setfilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setusers(response.data.User)
        })
    }, [filter])

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>

            <div className="my-2">
                <input onChange={(e) => {
                    setfilter(e.target.value)
                }} type="text" placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-x-slate-200" />
            </div>

            <div>
            {users.map(user => <User user={user} />)}
            </div>
        </>
    )

    function User({user}) {
        const navigate = useNavigate();
        return <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 flex justify-center mt-1 mr-2 ">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastname}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button onclick={(e) => {
                    navigate("/send?Id_" + user._id + "&name=" + user.firstName);
                }} label={"Send Money"} />
            </div>
        </div>
    }
}