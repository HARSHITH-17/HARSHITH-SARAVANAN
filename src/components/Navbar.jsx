import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', href: '#hero' },
        { name: 'Projects', href: '#projects' },
        { name: 'Identity', href: '#about' },
        { name: 'Timeline', href: '#career' },
        { name: 'Network', href: '#contact' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-black/50 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
                            <Cpu className="text-white w-5 h-5" />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="font-bold text-sm tracking-widest uppercase leading-tight text-white">
                                Harshith <span className="text-blue-500">Saravanan</span>
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-blue-400 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="px-6 py-2 bg-blue-600/10 border border-blue-500/50 text-blue-400 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                        >
                            Initialize
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl transition-transform duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-black uppercase italic tracking-tighter text-zinc-300 hover:text-blue-500 transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </>
    );
};

export default Navbar;
