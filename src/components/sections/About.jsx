import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cpu, Code } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-10 lg:px-24 max-w-7xl mx-auto relative z-10">

            {/* Header */}
            <div className="flex items-end gap-6 mb-16">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white"
                >
                    Identity <span className="text-blue-600">Protocol.</span>
                </motion.h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-[2px] flex-1 bg-gradient-to-r from-blue-900 to-transparent mb-4 origin-left hidden md:block"
                />
            </div>

            <div className="grid lg:grid-cols-12 gap-16 items-start">

                {/* Image Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-5 relative group"
                >
                    <div className="absolute -inset-4 bg-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10 p-1 bg-gradient-to-br from-blue-900/50 to-zinc-900 border border-blue-800/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                            <img
                                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                                alt="Engineer"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className="lg:col-span-7 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <p className="text-2xl md:text-3xl font-light text-zinc-200 leading-snug italic tracking-tight">
                            "I am <span className="text-blue-500 font-black not-italic underline decoration-blue-800 underline-offset-8">HARSHITH SARAVANAN</span>, operating at the intersection of mechanical precision and intelligent manufacturing logic."
                        </p>
                        <p className="text-zinc-400 text-lg leading-relaxed font-light">
                            I specialize in the <span className="text-white font-medium">digital-to-physical translation</span> of engineered systems, designing high-precision tool and die solutions while architecting the machining strategies that bring them to life. My work bridges design intent and production reality—transforming complex mechanical concepts into reliable, manufacturable outcomes.
                        </p>
                    </motion.div>

                    {/* Feature Cards Carousel */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-5 p-8 bg-blue-950/20 border-2 border-blue-600/30 rounded-2xl hover:bg-blue-900/30 transition-all group overflow-hidden"
                        >
                            <Award className="text-blue-400 w-6 h-6" />
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">Autodesk Professional</h4>
                                <div className="space-y-2">
                                    <span className="text-zinc-100 text-sm font-bold block">• CAM Technical Skill Assessment</span>
                                    <span className="text-zinc-100 text-sm font-bold block">•  Computer Aided Manufacturing (CAM) for Technical Certification</span>
                                    <span className="text-zinc-100 text-sm font-bold block">• Design & Mfg Cloud Certification</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-5 p-8 bg-blue-950/10 border border-blue-900/30 rounded-2xl hover:bg-blue-900/20 hover:border-blue-600 transition-all group"
                        >
                            <Cpu className="text-blue-500 w-6 h-6" />
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-[0.2em]">CAM Intelligence</h4>
                                <span className="text-zinc-200 text-base font-semibold block">5-Axis Simulation & Logic</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col gap-5 p-8 bg-blue-950/10 border border-blue-900/30 rounded-2xl hover:bg-blue-900/20 hover:border-blue-600 transition-all group"
                        >
                            <Code className="text-blue-500 w-6 h-6" />
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-[0.2em]">Scripting</h4>
                                <span className="text-zinc-200 text-base font-semibold block">Python for Fusion 360 API</span>
                            </div>
                        </motion.div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default About;
