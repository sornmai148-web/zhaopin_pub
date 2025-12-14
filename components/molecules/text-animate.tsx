"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  type?: "heading" | "paragraph";
}

export const TextAnimate: React.FC<Props> = ({
  text,
  className,
  type = "heading",
}) => {
  if (type == "paragraph")
    return (
      <p className={cn(className)}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, ease: "easeOut" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </p>
    );

  return (
    <h2 className={cn("text-2xl md:text-4xl font-bold", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, ease: "easeOut" }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};
