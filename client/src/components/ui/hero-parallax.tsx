// components/ui/hero-parallax.tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);

  return (
    <div ref={ref} className="h-[300vh] py-40 overflow-hidden relative flex flex-col bg-gradient-to-b from-blue-900 to-gray-900 text-white">
      <div className="flex flex-wrap justify-center gap-10">
        {products.map((product) => (
          <motion.div
            key={product.title}
            className="h-40 w-40"
            style={{ x: translateX }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href={product.link}>
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={160}
                height={160}
                className="rounded-lg shadow-md"
              />
            </Link>
            <h3 className="text-center mt-2">{product.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
