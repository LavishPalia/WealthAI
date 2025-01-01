"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imageElement = imageRef && imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI Powered Finance management platform that helps you track,
          analyze and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button className="px-8" size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="px-8" size="lg" variant="outline">
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-12">
          <div className="hero-image" ref={imageRef}>
            <Image
              src="/banner.jpeg"
              alt="Banner image"
              className="rounded-lg shadow-2xl border mx-auto"
              width={1280}
              height={720}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;