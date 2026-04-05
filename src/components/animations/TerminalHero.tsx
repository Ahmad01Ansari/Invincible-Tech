"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function TerminalHero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "curl -fsSL https://app.invinsible.tech/install | sh";
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="w-full max-w-3xl border border-border-dim rounded-xl bg-obsidian overflow-hidden font-mono text-sm relative shadow-2xl">
      {/* Window Controls */}
      <div className="flex items-center px-4 py-3 border-b border-border-dim bg-surface-100">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-border-dim/50" />
          <div className="w-3 h-3 rounded-full bg-border-dim/50" />
          <div className="w-3 h-3 rounded-full bg-border-dim/50" />
        </div>
        <div className="mx-auto text-xs text-text-low font-medium tracking-wide">
          macOS / Linux
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 text-text-high min-h-[200px]">
        <div className="flex items-start gap-3">
          <span className="text-accent-orange font-bold">{">"}</span>
          <span className="break-all relative">
            {typedText}
            {!showOutput && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-text-high ml-1 align-middle"
              />
            )}
          </span>
        </div>

        {/* Console Output reveal */}
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-text-low leading-relaxed"
          >
            <p>Initializing Invinsible Automations...</p>
            <p className="mt-1 flex items-center gap-2">
              <span className="text-accent-neon">[OK]</span> Core engine connected.
            </p>
            <p className="mt-1 flex items-center gap-2">
              <span className="text-accent-neon">[OK]</span> AI directives mapped.
            </p>
            <p className="mt-4 text-accent-orange">Ready to engineer.</p>
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-text-high mt-4"
              />
          </motion.div>
        )}
      </div>
    </div>
  );
}
