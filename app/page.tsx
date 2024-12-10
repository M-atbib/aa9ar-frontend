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

      <div className="flex justify-between items-center w-[90%] mx-auto my-5 bg-primaryDark text-white rounded-lg shadow-md">
        <div className="w-[50%] pl-10 space-y-10">
          <h1 className="text-7xl leading-[1.3] font-bold">
            Rejoignez <br />
            <span className="text-primary">AA9AR</span> dès <br />
            <span className="text-secondary">Aujourd’hui !</span>
          </h1>
          <p className="text-xl font-light leading-[1.5] w-[80%]">
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

        <div className="w-[50%]">
          <Image
            src="/images/home.jpeg"
            alt="aa9ar"
            width={200}
            height={200}
            className="w-full max-h-[calc(100vh-170px)] object-cover rounded-lg"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
