import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Canvas3D = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Materials
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

        // Geometry Group
        const techGroup = new THREE.Group();

        // Core Sphere
        const coreGeom = new THREE.IcosahedronGeometry(2, 1);
        const core = new THREE.Mesh(coreGeom, cobaltMetal);
        const coreWire = new THREE.Mesh(coreGeom, neonBlueWire);
        coreWire.scale.set(1.05, 1.05, 1.05);
        techGroup.add(core, coreWire);

        // Rings
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

        // Particles
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

        // Lights
        const pLight1 = new THREE.PointLight(0x00d2ff, 2, 50);
        pLight1.position.set(5, 5, 5);
        scene.add(pLight1);

        const pLight2 = new THREE.PointLight(0x1e3a8a, 2, 50);
        pLight2.position.set(-5, -5, 5);
        scene.add(pLight2);

        scene.add(new THREE.AmbientLight(0x0a192f, 0.4));

        camera.position.z = 12;

        // Interaction
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / 800;
            mouseY = (e.clientY - window.innerHeight / 2) / 800;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let rafId;
        const animate = () => {
            rafId = requestAnimationFrame(animate);
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

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafId);
            if (renderer.domElement && container) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };

    }, []);

    return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default Canvas3D;
