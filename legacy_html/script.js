import * as THREE from 'three';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- DATA & CONFIG ---
const LINKEDIN_URL = "https://www.linkedin.com/in/harshith-a93998269?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BB1iUzoyrQH6CG0MpIiAGTQ%3D%3D";
const EMAIL_ADDRESS = "info.harshiths@gmail.com";
const PHONE_NUMBER = "+91 8431270367";
// IMPORTANT: You might want to move these keys to a secure config or env variable if possible, 
// strictly for this demo I will use a placeholder or check if user provided one.
// The user's original file used `__firebase_config` global. I will assume it's available or use a placeholder.
// For this conversion to work "out of the box", the user must provide these configs or the original file had them injected.
// I will setup a dummy config if not found, but it likely won't connect without real keys.
let firebaseConfig = { apiKey: "API_KEY", authDomain: "projectId.firebaseapp.com", projectId: "projectId" };

// Try to grab config from global if it was injected (common in some setups), otherwise we might need real keys.
if (typeof window.__firebase_config !== 'undefined') {
    firebaseConfig = JSON.parse(window.__firebase_config);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'portfolio-harshith';
const apiKey = ""; // Gemini API Key

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

const NAV_ITEMS = [
    { id: "home", label: "Dashboard", icon: "layout" },
    { id: "logic", label: "AI Engine ✨", icon: "sparkles" },
    { id: "projects", label: "Projects", icon: "box" },
    { id: "about", label: "Identity", icon: "user" },
    { id: "career", label: "Timeline", icon: "briefcase" },
    { id: "contact", label: "Network", icon: "mail" }
];

// --- STATE MANAGEMENT ---
const state = {
    currentPage: 'home',
    user: null,
    aiPrompt: "",
    aiResponse: "",
    isAiLoading: false,
    contactForm: { name: '', email: '', message: '' },
    isSending: false
};

// --- CORE FUNCTIONS ---

// 1. Scene Setup (Three.js)
const initScene = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const cobaltMetal = new THREE.MeshStandardMaterial({
        color: 0x0a192f,
        metalness: 0.9,
        roughness: 0.2,
    });

    const neonBlueWire = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });

    const techGroup = new THREE.Group();

    const coreGeom = new THREE.IcosahedronGeometry(2, 1);
    const core = new THREE.Mesh(coreGeom, cobaltMetal);
    const coreWire = new THREE.Mesh(coreGeom, neonBlueWire);
    coreWire.scale.set(1.05, 1.05, 1.05);
    techGroup.add(core, coreWire);

    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ringGeom = new THREE.TorusGeometry(4 + i * 1.5, 0.03, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
            color: i === 1 ? 0x00d2ff : 0x1e3a8a,
            emissive: i === 1 ? 0x00d2ff : 0x000000,
            emissiveIntensity: 0.5
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        techGroup.add(ring);
        rings.push(ring);
    }

    const particlesGeom = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.02, color: 0x00d2ff, transparent: true, opacity: 0.5 });
    const particleMesh = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particleMesh);

    scene.add(techGroup);

    const pLight1 = new THREE.PointLight(0x00d2ff, 2, 50);
    pLight1.position.set(5, 5, 5);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0x1e3a8a, 2, 50);
    pLight2.position.set(-5, -5, 5);
    scene.add(pLight2);

    scene.add(new THREE.AmbientLight(0x0a192f, 0.4));

    camera.position.z = 12;

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / 800;
        mouseY = (e.clientY - window.innerHeight / 2) / 800;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        requestAnimationFrame(animate);
        techGroup.rotation.y += 0.002;
        rings.forEach((r, idx) => {
            r.rotation.z += 0.001 * (idx + 1);
            r.rotation.x += 0.0005;
        });
        particleMesh.rotation.y += 0.0005;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
};

// 2. Auth Logic
const initAuth = async () => {
    try {
        if (typeof window.__initial_auth_token !== 'undefined' && window.__initial_auth_token) {
            await signInWithCustomToken(auth, window.__initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }
    } catch (error) {
        console.error("Authentication Error", error);
    }
};
onAuthStateChanged(auth, (u) => {
    state.user = u;
    renderCurrentPage(); // Re-render to update UI status
});


// 3. UI Rendering
const renderNav = () => {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = NAV_ITEMS.map(item => {
        const isActive = state.currentPage === item.id;
        return `
            <button 
                onclick="window.router.navigate('${item.id}')"
                class="flex items-center gap-4 px-8 py-4 transition-all duration-500 relative group overflow-hidden ${isActive ? 'text-blue-400 bg-blue-950/20 nav-btn-active' : 'text-zinc-500 hover:text-blue-200'}"
            >
                <i data-lucide="${item.icon}" class="${isActive ? 'scale-125' : 'opacity-50'} w-4 h-4"></i>
                <span class="text-[10px] font-bold uppercase tracking-[0.2em]">${item.label}</span>
            </button>
        `;
    }).join('');

    // Mobile menu render
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.innerHTML = NAV_ITEMS.map(item => `
            <button onclick="window.router.navigate('${item.id}')" class="text-left w-full py-3 px-4 text-zinc-300 hover:text-blue-400 font-bold uppercase tracking-wider text-xs">
                ${item.label}
            </button>
        `).join('');
    }

    if (window.lucide) window.lucide.createIcons();
};

const pages = {
    home: () => `
        <div class="animate-fade-in space-y-12">
            <div class="space-y-4">
                <div class="inline-flex items-center gap-3 px-4 py-2 bg-blue-900/10 border border-blue-800/30 rounded-full">
                    <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span class="text-[10px] font-bold text-blue-400 tracking-[0.3em] uppercase block">System v1.0 Live</span>
                </div>
                <div class="space-y-6">
                    <h1 class="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
                        ENGINEERING <br /> SOLUTIONS <br /> 
                        <span class="text-zinc-800" style="-webkit-text-stroke: 1.5px #1e40af;">THAT MOVE, SCALE,</span> <br /> 
                        AND PERFORM.
                    </h1>
                </div>
            </div>
            
            <p class="text-lg md:text-2xl text-zinc-400 max-w-3xl border-l-2 border-blue-900 pl-10 leading-relaxed font-light">
                Fusing <span class="text-white font-semibold">advanced CAD-CAM intelligence</span> with multi-axis manufacturing strategy to shape the next generation of mechanical production.
            </p>

            <div class="flex flex-wrap gap-6 pt-10">
                <button onclick="window.router.navigate('about')" class="group relative px-14 py-6 overflow-hidden bg-blue-600">
                    <div class="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span class="relative z-10 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-4">
                        Initialize Profile <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                    </span>
                </button>
                <button onclick="window.router.navigate('projects')" class="group relative px-14 py-6 border border-blue-500/50 hover:border-blue-500 transition-all bg-blue-600/10 backdrop-blur-sm">
                    <span class="text-blue-300 font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                        View Projects <i data-lucide="globe" class="w-3.5 h-3.5"></i>
                    </span>
                </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
                <div class="p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl backdrop-blur-md">
                    <span class="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Machining Experience</span>
                    <span class="text-2xl font-black text-blue-400 tracking-tighter">3.5+ Yrs</span>
                </div>
                 <div class="p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl backdrop-blur-md">
                    <span class="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Post-Processors</span>
                    <span class="text-2xl font-black text-blue-400 tracking-tighter">4+</span>
                </div>
                 <div class="p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl backdrop-blur-md">
                    <span class="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Power Mill (*.mtd Files*)</span>
                    <span class="text-2xl font-black text-blue-400 tracking-tighter">12+</span>
                </div>
                 <div class="p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl backdrop-blur-md">
                    <span class="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Python Automation</span>
                    <span class="text-2xl font-black text-blue-400 tracking-tighter">95%</span>
                </div>
            </div>
        </div>
    `,
    logic: () => `
        <div class="animate-fade-in space-y-12 max-w-5xl">
            <div class="flex items-center gap-6">
                <h2 class="text-6xl font-black uppercase italic tracking-tighter text-white">AI <span class="text-blue-600">Logic Core.</span></h2>
                <div class="h-[2px] flex-1 bg-gradient-to-r from-blue-900 to-transparent mb-2"></div>
            </div>

            <div class="grid lg:grid-cols-1 gap-8">
                <div class="bg-blue-950/10 border border-blue-900/40 p-10 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                     <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all">
                        <i data-lucide="sparkles" class="w-44 h-44 text-blue-400"></i>
                    </div>
                    
                    <div class="relative z-10 space-y-8">
                        <div class="space-y-4">
                            <h3 class="text-2xl font-black tracking-tight text-white uppercase italic">Manufacturing Consultant ✨</h3>
                            <p class="text-zinc-500 text-sm max-w-xl">
                                Simulate advanced manufacturing logic. Ask about multi-axis toolpaths, Python CAD scripting, or material-specific machining strategies.
                            </p>
                        </div>

                        <div class="space-y-6">
                            <div class="relative">
                                <textarea id="ai-prompt-input"
                                    placeholder="Enter machining parameters, toolpath constraints, or automation requirements..."
                                    class="w-full h-40 bg-black/50 border border-blue-900/50 rounded-2xl p-6 text-zinc-200 font-mono text-sm focus:outline-none focus:border-blue-500 transition-all resize-none placeholder:text-zinc-700"
                                >${state.aiPrompt}</textarea>
                                <button onclick="window.router.runAiConsult()"
                                    id="ai-submit-btn"
                                    class="absolute bottom-6 right-6 p-4 bg-blue-600 rounded-xl text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                >
                                    ${state.isAiLoading ? '<i data-lucide="refresh-cw" class="animate-spin w-[18px] h-[18px]"></i>' : '<i data-lucide="send" class="w-[18px] h-[18px]"></i>'}
                                </button>
                            </div>

                            ${state.aiResponse ? `
                                <div class="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-8 space-y-4 animate-fade-in">
                                    <div class="flex items-center gap-3 text-blue-500 font-black uppercase tracking-widest text-[10px]">
                                        <i data-lucide="activity" class="w-3.5 h-3.5"></i> Optimization Strategy Generated
                                    </div>
                                    <div class="text-zinc-300 font-mono text-xs leading-relaxed whitespace-pre-wrap">${state.aiResponse}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    about: () => `
        <div class="animate-fade-in max-w-6xl space-y-16">
            <div class="flex items-end gap-6">
                <h2 class="text-7xl font-black uppercase italic tracking-tighter text-white">Identity <span class="text-blue-600">Protocol.</span></h2>
                <div class="h-[2px] flex-1 bg-gradient-to-r from-blue-900 to-transparent mb-4"></div>
            </div>
            
            <div class="grid lg:grid-cols-12 gap-16 items-start">
                <div class="lg:col-span-5 relative group">
                    <div class="absolute -inset-4 bg-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div class="relative z-10 p-1 bg-gradient-to-br from-blue-900/50 to-zinc-900 border border-blue-800/50 rounded-2xl overflow-hidden shadow-2xl">
                        <div class="aspect-[3/4] overflow-hidden bg-zinc-900">
                            <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop" class="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" alt="Engineer">
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-7 space-y-12">
                    <div class="space-y-8">
                        <p class="text-3xl font-light text-zinc-200 leading-snug italic tracking-tight">
                            "I am <span class="text-blue-500 font-black not-italic underline decoration-blue-800 underline-offset-8">HARSHITH SARAVANAN</span>, operating at the intersection of mechanical precision and intelligent manufacturing logic."
                        </p>
                        <p class="text-zinc-400 text-lg leading-relaxed font-light">
                            I specialize in the <span class="text-white font-medium">digital-to-physical translation</span> of engineered systems, designing high-precision tool and die solutions while architecting the machining strategies that bring them to life. My work bridges design intent and production reality—transforming complex mechanical concepts into reliable, manufacturable outcomes through advanced CAD-CAM workflows and multi-axis machining expertise.
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="flex flex-col gap-5 p-8 bg-blue-950/20 border-2 border-blue-600/30 rounded-2xl hover:bg-blue-900/30 transition-all group relative overflow-hidden">
                            <i data-lucide="award" class="text-blue-400 w-6 h-6"></i>
                            <div class="space-y-3">
                                <h4 class="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">Autodesk Professional</h4>
                                <div class="space-y-2">
                                    <span class="text-zinc-100 text-sm font-bold block">• CAM Technical Skill Assessment</span>
                                    <span class="text-zinc-100 text-sm font-bold block">• Computer Aided Manufacturing (CAM) for Technical Certification</span>
                                    <span class="text-zinc-100 text-sm font-bold block">• Design & Manufacturing Cloud for Technical Certification</span>
                                </div>
                            </div>
                        </div>

                         <div class="flex flex-col gap-5 p-8 bg-blue-950/10 border border-blue-900/30 rounded-2xl hover:bg-blue-900/20 hover:border-blue-600 transition-all group">
                            <i data-lucide="cpu" class="text-blue-500 w-6 h-6"></i>
                            <div>
                                <h4 class="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-[0.2em]">CAM Intelligence</h4>
                                <span class="text-zinc-200 text-base font-semibold block">5-Axis Simulation & Logic</span>
                            </div>
                        </div>

                         <div class="flex flex-col gap-5 p-8 bg-blue-950/10 border border-blue-900/30 rounded-2xl hover:bg-blue-900/20 hover:border-blue-600 transition-all group">
                            <i data-lucide="code" class="text-blue-500 w-6 h-6"></i>
                            <div>
                                <h4 class="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-[0.2em]">Scripting</h4>
                                <span class="text-zinc-200 text-base font-semibold block">Python for Fusion 360 API</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    projects: () => `
        <div class="animate-fade-in space-y-16">
            <h2 class="text-6xl font-black uppercase italic tracking-tighter text-white">Project <span class="text-blue-600">Archive.</span></h2>
            <div class="grid lg:grid-cols-1 gap-12">
            ${PROJECTS.map(project => `
                <div class="group relative grid md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-blue-900/30 bg-blue-950/10 hover:border-blue-500 transition-all duration-500">
                    <div class="md:col-span-5 h-[300px] md:h-full overflow-hidden relative">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div class="md:col-span-7 p-10 md:p-16 flex flex-col justify-center space-y-8 bg-zinc-950/50 backdrop-blur-md">
                        <h3 class="text-3xl md:text-5xl font-black tracking-tighter text-white leading-none uppercase italic">${project.title}</h3>
                        <p class="text-zinc-500 text-lg font-light leading-relaxed max-w-xl">${project.description}</p>
                        <div class="flex flex-wrap gap-3">
                            ${project.tech.map(t => `<span class="px-3 py-1 border border-blue-900/50 rounded-full text-[9px] font-bold uppercase tracking-widest text-blue-400">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
            </div>
        </div>
    `,
    career: () => `
        <div class="animate-fade-in space-y-12">
            <h2 class="text-6xl font-black uppercase italic tracking-tighter text-white">Career <span class="text-blue-600">Evolution.</span></h2>
            <div class="grid gap-6">
                ${EXPERIENCES.map(exp => `
                <div class="group p-10 bg-blue-950/5 border border-blue-900/20 hover:border-blue-600/50 transition-all flex flex-col justify-between relative rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div class="relative z-10 w-full">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <span class="text-blue-500 font-mono text-[10px] font-black tracking-widest underline underline-offset-8 shrink-0">${exp.period}</span>
                            <h3 className="text-3xl font-black tracking-tighter text-zinc-100 group-hover:text-blue-400 transition-colors">${exp.company}</h3>
                        </div>
                        <p class="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">${exp.role}</p>
                        
                        <div class="grid md:grid-cols-2 gap-x-12 gap-y-4">
                            ${exp.details.map(detail => `
                                <div class="flex items-start gap-4 group/item">
                                    <div class="mt-1.5 w-1 h-1 rounded-full bg-blue-600 group-hover/item:scale-150 transition-transform"></div>
                                    <span class="text-sm font-medium text-zinc-400 group-hover/item:text-zinc-200 transition-colors leading-snug">${detail}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    `,
    contact: () => `
        <div class="animate-fade-in space-y-16">
            <h2 class="text-6xl font-black uppercase italic tracking-tighter text-white">Establish <span class="text-blue-600">Link.</span></h2>
            <div class="grid lg:grid-cols-12 gap-12">
                <div class="lg:col-span-5 space-y-8">
                    <p class="text-zinc-400 italic text-2xl font-light leading-relaxed border-l-4 border-blue-600 pl-10">
                        Ready to deploy high-efficiency manufacturing systems or explore automation. <span class="text-blue-400 font-bold not-italic">Commence Transmission.</span>
                    </p>
                     <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        <div class="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group transition-all hover:bg-blue-900/20">
                            <i data-lucide="mail" class="text-blue-500 shrink-0 w-5 h-5"></i>
                            <div>
                                <span class="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Direct Module</span>
                                <span class="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors break-all">${EMAIL_ADDRESS}</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group transition-all hover:bg-blue-900/20">
                             <i data-lucide="phone" class="text-blue-500 shrink-0 w-5 h-5"></i>
                             <div>
                                <span class="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Voice Uplink</span>
                                <span class="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors">${PHONE_NUMBER}</span>
                            </div>
                        </div>
                        <a href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-6 p-6 bg-blue-950/10 border border-blue-900/20 rounded-2xl group hover:border-blue-600 transition-all sm:col-span-2 lg:col-span-1">
                             <i data-lucide="linkedin" class="text-blue-500 shrink-0 w-5 h-5"></i>
                            <div class="flex-1">
                                <span class="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Professional Link</span>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm font-black text-zinc-300 group-hover:text-blue-400 transition-colors">Harshith Saravanan</span>
                                    <i data-lucide="external-link" class="text-zinc-700 group-hover:text-blue-400 w-3 h-3"></i>
                                </div>
                            </div>
                        </a>
                     </div>
                </div>

                <div class="lg:col-span-7">
                    <div class="bg-blue-950/10 border border-blue-900/40 p-10 md:p-14 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                        <div class="relative z-10">
                             <div class="flex items-center gap-3 mb-10">
                                <i data-lucide="terminal" class="text-blue-500 w-4 h-4"></i>
                                <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Secure Comm-Link Terminal</h3>
                            </div>
                            <form onsubmit="window.router.sendContactMessage(event)" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2">
                                    <label class="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                                    <input type="text" id="contact-name" required placeholder="IDENTIFY SENDER..." class="w-full bg-black/40 border border-blue-900/30 rounded-xl px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-800 focus:border-blue-500 focus:outline-none transition-all">
                                </div>
                                <div class="space-y-2">
                                     <label class="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Email Address</label>
                                     <input type="email" id="contact-email" required placeholder="REPLY_ADDR@DOMAIN.COM" class="w-full bg-black/40 border border-blue-900/30 rounded-xl px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-800 focus:border-blue-500 focus:outline-none transition-all">
                                </div>
                                <div class="md:col-span-2 space-y-2">
                                     <label class="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Message Payload</label>
                                    <textarea id="contact-message" required placeholder="ENTER TRANSMISSION DETAILS..." class="w-full h-40 bg-black/40 border border-blue-900/30 rounded-xl px-6 py-4 text-sm text-zinc-200 placeholder:text-zinc-800 focus:border-blue-500 focus:outline-none transition-all resize-none"></textarea>
                                </div>
                                <div class="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                                    <p class="text-[9px] text-zinc-600 font-mono">STATUS: ${state.user ? 'CORE_LINKED' : 'INITIALIZING...'}<br/>UID: ${state.user?.uid || 'PENDING'}</p>
                                    <button type="submit" id="contact-submit-btn" disabled class="group relative px-12 py-5 bg-blue-600 overflow-hidden w-full md:w-auto disabled:opacity-50">
                                         <div class="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                         <span class="relative z-10 flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.3em] text-[10px]">
                                             ${state.isSending ?
            'Syncing... <i data-lucide="refresh-cw" class="animate-spin w-3.5 h-3.5"></i>' :
            'Send Message <i data-lucide="send" class="w-3.5 h-3.5"></i>'
        }
                                         </span>
                                    </button>
                                </div>
                            </form>
                             <div id="success-message" class="hidden md:col-span-2 mt-6 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl animate-fade-in flex items-center gap-4">
                                <i data-lucide="check-circle-2" class="text-blue-500 w-5 h-5"></i>
                                <div>
                                    <h4 class="text-[10px] font-black uppercase text-blue-400 tracking-widest">Transmission Successful</h4>
                                    <p class="text-zinc-400 text-[10px] mt-1">Uplink established. Data persisted in logic core.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

const renderCurrentPage = () => {
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    // Update Terminal
    updateTerminal();

    // Render Logic for specific page
    const renderFn = pages[state.currentPage];
    if (renderFn) {
        appContent.innerHTML = renderFn();

        // Post-render checks
        if (state.currentPage === 'contact') {
            const btn = document.getElementById('contact-submit-btn');
            if (btn) btn.disabled = state.isSending || !state.user;
        }

        if (window.lucide) window.lucide.createIcons();
    }

    renderNav();
};

const updateTerminal = () => {
    const text = `> SAPPHIRE_CORE_INIT\n> STATUS: OPTIMIZED\n> USER: HARSHITH_SARAVANAN\n> LOC: BENGALURU_TECH_HUB\n> LOADING_MODULES... DONE`;
    const termEl = document.getElementById('terminal-text');
    if (termEl) {
        let i = 0;
        termEl.innerText = "";
        const interval = setInterval(() => {
            termEl.innerText = text.slice(0, i);
            i++;
            if (i > text.length) clearInterval(interval);
        }, 20);
    }
};

// 4. Gemini Integration
const callGemini = async (prompt) => {
    const systemPrompt = `You are an expert Manufacturing AI Assistant integrated into Harshith Saravanan's Engineering Portfolio. 
    Harshith is a B-Tech Automobile Engineer and Specialist in Fusion 360, PowerMill, and Python-driven CAM automation.
    Your goal is to provide technical, high-level advice on mechanical engineering, multi-axis machining, CAD/CAM logic, and Python automation.
    Keep responses concise, professional, and technical. If asked for code, provide short Python/VBA snippets relevant to CAD/CAM APIs.`;

    let retries = 0;
    while (retries < 5) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] }
                })
            });
            const result = await response.json();
            return result.candidates?.[0]?.content?.parts?.[0]?.text || "System unable to process logic request.";
        } catch (error) {
            retries++;
            await new Promise(res => setTimeout(res, Math.pow(2, retries) * 1000));
        }
    }
    return "Connection to logic core timed out. Please try again later.";
};

// 5. Setup Window Router for HTML access
window.router = {
    navigate: (pageId) => {
        state.currentPage = pageId;
        renderCurrentPage();
    },
    runAiConsult: async () => {
        const input = document.getElementById('ai-prompt-input');
        if (!input || !input.value.trim()) return;

        state.aiPrompt = input.value;
        state.isAiLoading = true;
        renderCurrentPage(); // Show loading state

        state.aiResponse = await callGemini(state.aiPrompt);
        state.isAiLoading = false;
        renderCurrentPage(); // Show result
    },
    sendContactMessage: async (e) => {
        e.preventDefault();
        if (!state.user) return;

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        state.isSending = true;
        renderCurrentPage(); // update button loading

        try {
            const messagesCollection = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
            await addDoc(messagesCollection, {
                senderName: name,
                senderEmail: email,
                payload: message,
                timestamp: serverTimestamp(),
                senderUid: state.user.uid
            });

            // Success
            state.contactForm = { name: '', email: '', message: '' }; // clear
            document.getElementById('success-message').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('success-message').classList.add('hidden');
            }, 5000);

        } catch (error) {
            console.error("Transmission failed", error);
            alert("Transmission Failed. Check console.");
        } finally {
            state.isSending = false;
            renderCurrentPage();
        }
    }
};


// 6. Init Everything
window.addEventListener('DOMContentLoaded', () => {
    initScene();
    initAuth();
    renderCurrentPage();

    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });
    }
});
