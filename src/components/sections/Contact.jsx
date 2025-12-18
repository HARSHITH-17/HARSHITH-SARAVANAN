import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, Terminal, Github } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 md:py-32 px-6 md:px-10 lg:px-24 max-w-7xl mx-auto relative z-10">

            <div className="mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white"
                >
                    Establish <span className="text-blue-600">Link.</span>
                </motion.h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-5 space-y-8">
                    <p className="text-zinc-400 italic text-2xl font-light leading-relaxed border-l-4 border-blue-600 pl-8">
                        Ready to deploy high-efficiency manufacturing systems or explore automation. <span className="text-blue-400 font-bold not-italic">Commence Transmission.</span>
                    </p>

                    <div className="grid gap-4">
                        <a href="mailto:info.harshiths@gmail.com" className="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group transition-all hover:bg-blue-900/20">
                            <Mail className="text-blue-500 w-5 h-5 shrink-0" />
                            <div>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Direct Module</span>
                                <span className="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors">info.harshiths@gmail.com</span>
                            </div>
                        </a>

                        <a href="tel:+918431270367" className="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group transition-all hover:bg-blue-900/20">
                            <Phone className="text-blue-500 w-5 h-5 shrink-0" />
                            <div>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Voice Uplink</span>
                                <span className="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors">+91 8431270367</span>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/harshith-a93998269?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BaP9ulGgcQtKDEieKHI2k%2BA%3D%3D" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group hover:border-blue-600 transition-all">
                            <Linkedin className="text-blue-500 w-5 h-5 shrink-0" />
                            <div>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Professional Link</span>
                                <span className="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors">Harshith Saravanan</span>
                            </div>
                        </a>

                        <a href="https://github.com/HARSHITH-17" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group hover:border-blue-600 transition-all">
                            <Github className="text-blue-500 w-5 h-5 shrink-0" />
                            <div>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Code Repository</span>
                                <span className="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors">HARSHITH-17</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Form (Visual) */}
                <div className="lg:col-span-7">
                    <div className="bg-blue-950/10 border border-blue-900/40 p-8 md:p-14 rounded-3xl backdrop-blur-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <Terminal className="text-blue-500 w-4 h-4" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Secure Comm-Link Terminal</h3>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); alert("Please contact through mail or call."); }}>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                                    <input type="text" placeholder="IDENTIFY SENDER..." className="w-full bg-black/40 border border-blue-900/30 rounded-xl px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-800 focus:border-blue-500 focus:outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Email Address</label>
                                    <input type="email" placeholder="REPLY_ADDR@DOMAIN.COM" className="w-full bg-black/40 border border-blue-900/30 rounded-xl px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-800 focus:border-blue-500 focus:outline-none transition-all" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Message Payload</label>
                                    <textarea placeholder="ENTER TRANSMISSION DETAILS..." rows="4" className="w-full bg-black/40 border border-blue-900/30 rounded-xl px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-800 focus:border-blue-500 focus:outline-none transition-all resize-none"></textarea>
                                </div>

                                <div className="md:col-span-2 pt-4">
                                    <button className="group relative w-full md:w-auto px-12 py-5 bg-blue-600 overflow-hidden rounded-sm">
                                        <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.3em] text-[10px]">
                                            Send Message <Send className="w-3.5 h-3.5" />
                                        </span>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Contact;
