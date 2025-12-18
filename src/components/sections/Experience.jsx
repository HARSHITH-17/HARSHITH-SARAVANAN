import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
    {
        company: "MicroGenesis CADSoft Pvt. Ltd.",
        role: "Application Engineer",
        period: "Oct 2025 – Present",
        details: [
            "Fusion 360 & PowerMill Specialist",
            "Advanced CAD–CAM Workflow Engineering",
            "Multi-Axis Machining Strategy Development",
            "CAM Automation & Post-Processor Logic",
            "End-to-End CAD-to-Manufacturing Integration",
            "Technical Consulting for Digital Manufacturing",
            "DFM-Oriented Machining Solutions"
        ]
    },
    {
        company: "Blue Bell Engineering Solutions Pvt. Ltd.",
        role: "Application Engineer",
        period: "Jul 2024 – Oct 2025",
        details: ["Advanced Tooling Support", "Efficiency Benchmarking", "Client Workflow Modernization"]
    },
    {
        company: "Government Tool Room & Training Centre (GT&TC)",
        role: "Faculty – Mould Design",
        period: "Aug 2023 – Jul 2024",
        details: ["High-Precision Die & Mould Design", "DFM for Injection Moulding", "Industry 4.0 Integration"]
    },
    {
        company: "Tractors and Farm Equipment Limited (TAFE)",
        role: "Mechanical Engineer",
        period: "Jul 2022 – Aug 2023",
        details: ["Precision Fixture Architecture", "CNC Optimization", "Kaizen Implementation"]
    }
];

const Experience = () => {
    return (
        <section id="career" className="py-24 md:py-32 px-6 md:px-10 lg:px-24 max-w-7xl mx-auto relative z-10">
            <div className="mb-20">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white text-right"
                >
                    Career <span className="text-blue-600">Evolution.</span>
                </motion.h2>
            </div>

            <div className="grid gap-6">
                {EXPERIENCES.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-8 md:p-10 bg-blue-950/5 border border-blue-900/20 hover:border-blue-600/50 transition-all rounded-2xl backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-100 group-hover:text-blue-400 transition-colors">
                                    {exp.company}
                                </h3>
                                <span className="text-blue-500 font-mono text-xs font-black tracking-widest underline underline-offset-8 shrink-0">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">
                                {exp.role}
                            </p>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                                {exp.details.map((detail, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group/item">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 group-hover/item:scale-150 transition-transform"></div>
                                        <span className="text-sm font-medium text-zinc-400 group-hover/item:text-zinc-200 transition-colors">{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
