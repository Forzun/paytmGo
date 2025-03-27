import {Link} from "react-router-dom"

interface ButtonWarningProps { 
    label: string; 
    buttonText: string; 
    to: string;
}

export function ButtonWarning({label , buttonText , to} : ButtonWarningProps){
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to} >
            {buttonText}
        </Link>
    </div>
}

