import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-5 xl:mx-[10%]">
      {/* Hero section */}
      <section className="md:min-h-screen py-[5%] flex justify-center items-center">
        <div className="w-full border-r-2 border-b-2 border-dashed border-[#5A5A66] p-[5%] flex flex-col items-center justify-center gap-6 xl:gap-8">
          <Image
            src={"/logo/logo-main.svg"}
            width={700}
            height={220}
            alt="feature craft js"
            className="h-auto w-full md:w-1/2 dark:hidden block transition-all"
          />
          <Image
            src={"/logo/logo-main-dark.svg"}
            width={700}
            height={220}
            alt="feature craft js"
            className="h-auto w-full md:w-1/2 hidden dark:block transition-all"
          />
          <h3 className="font-semibold text-3xl xl:text-5xl 2xl:text-6xl max-w-[75%] lg:max-w-[60%] text-center">
            <span className="text-primary-blue">One</span> Feature at a{" "}
            <span className="text-primary-blue">Time</span>.
          </h3>
          <p className="text-lg lg:text-xl 2xl:text-2xl text-center md:max-w-[75%]">
            Discover the ultimate playground for{" "}
            <b>next-gen web technologies</b>. FeatureCraftJs offers more than
            code examples - it&apos;s where developers actively explore and{" "}
            <b>master advanced features</b>.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              className="w-64 flex justify-center py-3 lg:py-4 !rounded-full bg-primary text-white text-xl font-semibold"
              href={"/auth/login"}
            >
              Get Started
            </Link>
            <Link
              className="w-64 flex justify-center py-3 lg:py-4 !rounded-full bg-primary-blue text-white text-xl font-semibold"
              href={"/auth/login"}
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
