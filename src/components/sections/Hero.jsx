import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-24 pt-24 md:pt-0 relative z-10">

            
            {/* Main Headline */}
            <div className="space-y-2 mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-white"
                >
                    Engineering <br /> Solutions <br />
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-transparent stroke-text"
                    style={{ WebkitTextStroke: '1.5px #1e40af', color: 'transparent' }}
                >
                    That Move, Scale,
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] text-white"
                >
                    And Perform.
                </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg md:text-2xl text-zinc-400 max-w-3xl border-l-2 border-blue-900 pl-8 md:pl-10 leading-relaxed font-light mb-12"
            >
                Fusing <span className="text-white font-semibold">advanced CAD-CAM intelligence</span> with multi-axis manufacturing strategy to shape the next generation of mechanical production.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap gap-6"
            >
                <a href="#about" className="group relative px-10 py-5 overflow-hidden bg-blue-600 rounded-sm">
                    <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-4">
                        Initialize Profile <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                </a>
                <a href="#projects" className="group relative px-10 py-5 border border-blue-500/50 hover:border-blue-500 transition-all bg-blue-600/10 backdrop-blur-sm rounded-sm">
                    <span className="text-blue-300 font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                        View Projects <Globe className="w-3.5 h-3.5" />
                    </span>
                </a>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 md:mt-32 max-w-6xl"
            >
                {[
                    { label: "Machining Experience", val: "3.5+ Yrs" },
                    { label: "Post-Processors", val: "4+" },
                    { label: "Power Mill (*.mtd)", val: "12+" },
                    { label: "Python Automation", val: "95%" }
                ].map((stat, idx) => (
                    <div key={idx} className="p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl backdrop-blur-md hover:border-blue-500/30 transition-colors">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-2">{stat.label}</span>
                        <span className="text-2xl md:text-3xl font-black text-blue-400 tracking-tighter">{stat.val}</span>
                    </div>
                ))}
            </motion.div>

        </section>
    );
};

export default Hero;
