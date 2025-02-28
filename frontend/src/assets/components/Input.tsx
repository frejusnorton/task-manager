import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    return (
        <input
            ref={ref}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            {...props} 
        />
    );
});

export default Input;
