export default function InputBox({label,placeholder,onchange}) {   // label prop hai pata hai agar ham sirf naam likte to ham prop.label aisa kar ke likte par usko ham destructing kar rahe hai 
        return (
            <div>
                <div className="text-sm font-medium text-left py-2 ">
                    {label}
                </div>
            <input onChange={onchange} className="w-full px-2 py-1 border" placeholder={placeholder} type="text" />
            </div>
        )
}