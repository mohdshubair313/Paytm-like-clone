import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setamount] = useState("");
    return (
        <div className="flex justify-center h-screen bg-gray-200">
            <div className="h-full flex flex-col justify-center">
                <div className=" border rounded-3xl w-[400px] h-[350px] bg-blue-400">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-500 flex items-center justify-center">
                                <span className="text-2xl text-slate-600">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="amount">Amount (in Rs) </label>
                            <input onChange={(e) => {setamount(e.target.value)}} type="number" id="amount" placeholder="Enter Amount" className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm"/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                    <div className="flex justify-center mt-7 bg-slate-500 rounded-3xl w-[150px] h-[40px] hover:bg-teal-400">
                    <button onClick={() => {
                            axios.post("http://localhost:8080/api/v1/account/transfer", {
                                to:id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                        }} className="justify-center rounded-md text-sm font-medium ring-offset-background transitions"> Initiate Transfer</button>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}