export default function Button({label, onclick}) {
    return <button onClick={onclick} type="button" className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:required:">{label}</button>
    
}