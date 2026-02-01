document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles Data
    const particlesCount = 100; // Adjust for density
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3); // For vertex colors
    const velocityArray = []; // Store custom velocities

    // Brand Colors
    const palette = [
        new THREE.Color(0x001827), // Azul Oscuro
        new THREE.Color(0x0CD3C7), // Cyan Tech
        new THREE.Color(0xFAAF3B), // Amarillo
        new THREE.Color(0xFD5660)  // Rojo Acento
    ];

    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 50;     // x
        posArray[i+1] = (Math.random() - 0.5) * 50;   // y
        posArray[i+2] = (Math.random() - 0.5) * 30;   // z

        // Randomly assign a color from palette
        const color = palette[Math.floor(Math.random() * palette.length)];
        colorArray[i] = color.r;
        colorArray[i+1] = color.g;
        colorArray[i+2] = color.b;

        velocityArray.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.4, // Slightly larger to see colors better
        vertexColors: true, // Enable vertex colors
        transparent: true,
        opacity: 0.9
    });

    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x001827, // Dark Blue
        transparent: true,
        opacity: 0.15
    });

    // Mesh
    const particlesMesh = new THREE.Points(particles, particlesMaterial);
    scene.add(particlesMesh);

    // Lines container
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    camera.position.z = 15;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;

        // Rotate entire scene slightly based on mouse
        particlesMesh.rotation.y += 0.002;
        particlesMesh.rotation.x += 0.001;
        
        // Update particles position
        const positions = particles.attributes.position.array;
        
        for(let i = 0; i < particlesCount; i++) {
            // Apply velocity
            positions[i*3] += velocityArray[i].x;
            positions[i*3+1] += velocityArray[i].y;
            positions[i*3+2] += velocityArray[i].z;

            // Bounce off boundaries / reset
            if(positions[i*3] > 25 || positions[i*3] < -25) velocityArray[i].x *= -1;
            if(positions[i*3+1] > 25 || positions[i*3+1] < -25) velocityArray[i].y *= -1;
            if(positions[i*3+2] > 15 || positions[i*3+2] < -15) velocityArray[i].z *= -1;
        }
        particles.attributes.position.needsUpdate = true;

        // Connect particles with lines
        connectParticles();

        renderer.render(scene, camera);
    }

    function connectParticles() {
        let positions = particles.attributes.position.array;
        let linePositions = [];
        
        // Very naive O(N^2) check, okay for < 150 particles
        for(let i = 0; i < particlesCount; i++) {
            for(let j = i + 1; j < particlesCount; j++) {
                let dx = positions[i*3] - positions[j*3];
                let dy = positions[i*3+1] - positions[j*3+1];
                let dz = positions[i*3+2] - positions[j*3+2];
                let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < 8) { // Connection threshold
                    linePositions.push(
                        positions[i*3], positions[i*3+1], positions[i*3+2],
                        positions[j*3], positions[j*3+1], positions[j*3+2]
                    );
                }
            }
        }
        
        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
