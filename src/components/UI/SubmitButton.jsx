"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ text }){
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending} className="justify-self-end border border-white  hover:bg-purple-800 text-white px-6 py-2 rounded-md font-semibold transition-colors">
            {pending ? "Submitting.." : text }
        </button>
    )
}