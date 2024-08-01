import Image from "next/image";
import { Button } from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PassKeyModel from "@/components/PassKeyModel";

export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';
  return (
    <div className="flex h-screen max-h-screen">

      {isAdmin && <PassKeyModel />} 


      <section className="remove-scrollbar container ">
        <div className="sun-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/eclLogo.png"
            height={1000}
            width={1000}
            style={{ filter: 'invert(100%)' }}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 ECL</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
