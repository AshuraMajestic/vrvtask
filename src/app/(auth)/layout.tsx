import "@/app/globals.css"
import Image from "next/image"
import studyImg from "/public/left.png"
import logo from "/public/globe.svg"
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className=" h-screen md:h-screen  w-screen text-black flex flex-col md:flex-row ">
            {/* register image */}
            <div className="md:w-1/2 max-h-[45%] md:h-full flex-shrink-0 md:min-h-screen overflow-hidden relative">
                <Image
                    src={studyImg}
                    alt="register-image"
                    className="w-full h-full md:min-h-screen object-cover -z-10"
                />
                <div className=" md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-40% to-bgColor "></div>
            </div>
            {/* register main content */}
            <div className=" flex flex-col h-full  justify-between items-center border border-borderColor rounded-t-3xl md:w-1/2 md:py-10 md:border-0">
                {/* logo and tagline */}
                <div className="absolute md:static -translate-y-[90px] md:translate-y-0 ">
                    <div className=" flex flex-col items-center gap-2 ">
                        <Image src={logo} alt="logo" />
                        <span className="text-center">
                            Journey to a trillion miles starts from here!!
                        </span>
                    </div>
                </div>
                {/* Signup/signin content */}
                <div className="w-full h-full  flex justify-center items-center">
                    <div className="md:w-96 max-w-3/4 md:border md:border-white/50 md:rounded-2xl md:bg-white/5 py-6 px-6 ">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}
