import React from 'react';
import { Code, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-blue-900/30 bg-black/40 backdrop-blur-xl relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse"></div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                        System Status: Operational
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <a href="https://github.com/HARSHITH-17" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/harshith-a93998269?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BaP9ulGgcQtKDEieKHI2k%2BA%3D%3D" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                        <Twitter size={20} />
                    </a>
                </div>

                <div className="flex items-center gap-2 text-zinc-600">
                    <Code size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        Engineered by <span className="text-blue-500">HARSHITH SARAVANAN</span>
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
