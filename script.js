// 3D Scene Setup with Three.js
let scene, camera, renderer;
let particles = [];
let isDarkTheme = localStorage.getItem('theme') === 'dark';

function init3DScene() {
    const canvas = document.getElementById('canvas3d');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkTheme ? 0x0f172a : 0xffffff);
    
    // Camera setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x6366f1, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create particles
    createParticles();
    
    // Add rotating objects
    addRotatingObjects();
    
    // Animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < particleCount; i++) {
        positions.push(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );
        
        const hue = Math.random();
        colors.push(
            Math.sin(hue * Math.PI) * 0.5 + 0.5,
            Math.sin((hue + 0.33) * Math.PI) * 0.5 + 0.5,
            Math.sin((hue + 0.66) * Math.PI) * 0.5 + 0.5
        );
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particles.push(points);
}

function addRotatingObjects() {
    // Torus Knot
    const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const torusKnotMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x3b3b7d,
        wireframe: false,
        transparent: true,
        opacity: 0.3
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torusKnot.position.x = -15;
    scene.add(torusKnot);
    
    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(8);
    const octaMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        emissive: 0x5a3f7f,
        wireframe: false,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.x = 15;
    scene.add(octahedron);
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(6);
    const icoMaterial = new THREE.MeshPhongMaterial({
        color: 0xec4899,
        emissive: 0x9d2a6f,
        wireframe: false,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.z = -20;
    scene.add(icosahedron);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate objects
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
            child.rotation.x += 0.001;
            child.rotation.y += 0.002;
            child.rotation.z += 0.0005;
            
            if (child instanceof THREE.Points) {
                child.position.y += 0.05;
                if (child.position.y > 100) child.position.y = -100;
            }
        }
    });
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const htmlElement = document.documentElement;

function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    isDarkTheme = theme === 'dark';
    
    if (scene) {
        scene.background.setHex(isDarkTheme ? 0x0f172a : 0xffffff);
    }
}

// Check saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            successMessage.style.display = 'none';
        }, 5000);
        
        // Log the data (in real scenario, send to server)
        console.log('Message received from:', {
            name: name,
            email: email,
            message: message
        });
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .info-display-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Move particles
    particles.forEach(particle => {
        particle.position.y = scrollY * 0.1;
    });
});

// Typewriter Effect for Hero Title
function typewriterEffect() {
    const heroTitle = document.getElementById('heroTitle');
    const text = 'Aadi Nigam';
    let index = 0;
    
    heroTitle.classList.add('typing');
    
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            heroTitle.classList.remove('typing');
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    typewriterEffect();
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-dark)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});
