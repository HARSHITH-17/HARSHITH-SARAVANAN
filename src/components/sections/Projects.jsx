import React from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
    {
        title: "5-Axis Adaptive Clearing Automation",
        category: "CAM Strategy",
        description: "Developed a custom Python plugin for Fusion 360 to automate toolpath generation for complex turbine geometries, reducing programming time by 40%.",
        tech: ["Fusion 360 API", "Python", "Tool Orientation Logic"],
        image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1600&auto=format&fit=crop"
    },
    {
        title: "High-Precision Injection Mould Design",
        category: "Mould Engineering",
        description: "Architecture of an 8-cavity hot runner injection mould for automotive connectors, including flow simulation and thermal analysis.",
        tech: ["Mould Design", "Flow Simulation", "DFM"],
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop"
    },
    {
        title: "Automated Tool Library Logic",
        category: "Infrastructure",
        description: "Standardized a centralized tool library across multi-machine environments, integrating real-time wear compensation logic.",
        tech: ["Database Management", "PowerMill", "CNC Post-Processing"],
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-24 md:py-32 px-6 md:px-10 lg:px-24 max-w-7xl mx-auto relative z-10">

            <div className="mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white"
                >
                    Project <span className="text-blue-600">Archive.</span>
                </motion.h2>
            </div>

            <div className="flex flex-col gap-24">
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group relative grid md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-blue-900/30 bg-blue-950/10 hover:border-blue-500 transition-all duration-500"
                    >
                        <div className="md:col-span-12 lg:col-span-5 h-[300px] lg:h-auto overflow-hidden relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-blue-900/20 group-hover:opacity-0 transition-opacity"></div>
                        </div>

                        <div className="md:col-span-12 lg:col-span-7 p-10 md:p-14 flex flex-col justify-center space-y-6 bg-black/40 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-900/50 px-3 py-1 rounded-full">{project.category}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-none uppercase italic">
                                {project.title}
                            </h3>
                            <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-950/30 border border-blue-900/50 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-300">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Projects;
