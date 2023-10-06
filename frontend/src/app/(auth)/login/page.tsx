import ImageProfile from "@/components/ImageDefault/ImageProfile"
import SignInForm from "@/components/form/SignInForm"
import ClockTime from "@/components/utils/ClockTime"

const Login = () => {

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-screen-login">
            <div className="md:w-3/12 bg-gray-middle p-4 rounded-xl border-2 border-white shadow-lg">
                <div className="flex items-start justify-between border-b border-gray-200">
                    <h1 className="text-sm font-medium text-blue-dark">Faça login em sua conta</h1>
                    <span className="text-sm font-medium text-blue-dark"><ClockTime /></span>
                </div>
                <div className="h-44 flex items-center justify-center">
                    <ImageProfile />
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <SignInForm />
                </div>
            </div>
        </div>
    )

}

export default Login