import { signup } from "../lib/actions"

export default function SignupForm() {
    return (
        <form action={signup} className="flex flex-col gap-4">
            <input type="text" name="email" className="bg-gray-50 w-100 text-gray-900"/>
            <input type="text" name="name" className="bg-gray-50 w-100 text-gray-900"/>
            <input type="password" name="password" className="bg-gray-50 w-100 text-gray-900"/>
            <button type="submit">Sign Up</button>
        </form>
    )
}