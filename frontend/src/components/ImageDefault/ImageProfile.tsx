'use client'
import Image from "next/image"
const ImageProfile = () => {
    return (
        <div className="bg-gray-200 flex items-center justify-center h-32 w-32 border-2 border-color-gray-400 rounded-full">
            <Image height={100} width={100} src={require("@/assets/images/profile.jpg")} className="rounded-full" alt={""} />
        </div>
    )
}
export default ImageProfile