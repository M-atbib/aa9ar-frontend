import Footer from "@/components/layout/Footer";
import HomeNavbar from "@/components/layout/HomeNavbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";

export default function Home() {
  return (
    <>
      <HomeNavbar />

      <div className="relative flex flex-col md:flex-row justify-between items-center w-[90%] mx-auto my-5 bg-primaryDark text-white rounded-lg shadow-md overflow-hidden">
        <div className="relative z-10 w-full md:w-[50%] p-10 space-y-10">
          <h1 className="text-4xl md:text-7xl leading-[1.3] font-bold">
            Rejoignez <br />
            <span className="text-primary">AA9AR</span> dès <br />
            <span className="text-secondary">Aujourd’hui !</span>
          </h1>
          <p className="text-lg md:text-xl font-light leading-[1.5] w-full md:w-[80%]">
            Créez votre compte et découvrez comment AA9AR peut transformer votre
            manière de gérer vos projets. Tout ce dont vous avez besoin, en un
            seul endroit – commencez dès maintenant !
          </p>

          <Button className="text-xl h-12 px-5">
            <Link href="/signup" className="flex items-center gap-2">
              Commencer
              <IoMdArrowForward />
            </Link>
          </Button>
        </div>

        <div className="absolute inset-0 md:relative md:w-[50%] h-full">
          <Image
            src="/images/home.jpeg"
            alt="aa9ar"
            width={800}
            height={600}
            className="w-full h-full object-cover md:max-h-[calc(100vh-170px)] md:rounded-r-lg opacity-20 md:opacity-100"
            priority
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
