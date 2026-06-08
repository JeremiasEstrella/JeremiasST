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

    // Particles Materials & Meshes
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

    const particlesMesh = new THREE.Points(particles, particlesMaterial);
    scene.add(particlesMesh);

    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Lights for 3D shapes shading
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x0cd3c7, 1.0); // Cyan light
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xfd5660, 0.7); // Red/Orange light
    dirLight2.position.set(-5, -10, 5);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xfaaf3b, 0.6); // Gold light
    dirLight3.position.set(0, 5, -5);
    scene.add(dirLight3);

    // 3D Floating Geometries (Glassmorphic + Wireframe shapes)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const glassMaterial = new THREE.MeshPhongMaterial({
        color: 0x0CD3C7,
        transparent: true,
        opacity: 0.12,
        shininess: 90,
        specular: 0xffffff,
        flatShading: true
    });
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xFAAF3B,
        transparent: true,
        opacity: 0.1,
        wireframe: true
    });

    // Torus (Doughnut)
    const torusGeom = new THREE.TorusGeometry(2.5, 0.6, 12, 48);
    const torusMesh = new THREE.Mesh(torusGeom, glassMaterial);
    const torusWire = new THREE.Mesh(torusGeom, wireMaterial);
    const torusGroup = new THREE.Group();
    torusGroup.add(torusMesh);
    torusGroup.add(torusWire);
    torusGroup.position.set(-9, 3, -5);
    shapesGroup.add(torusGroup);

    // Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMesh = new THREE.Mesh(icoGeom, glassMaterial);
    const icoWire = new THREE.Mesh(icoGeom, wireMaterial);
    const icoGroup = new THREE.Group();
    icoGroup.add(icoMesh);
    icoGroup.add(icoWire);
    icoGroup.position.set(9, -4, -4);
    shapesGroup.add(icoGroup);

    // Octahedron
    const octGeom = new THREE.OctahedronGeometry(2, 0);
    const octMesh = new THREE.Mesh(octGeom, glassMaterial);
    const octWire = new THREE.Mesh(octGeom, wireMaterial);
    const octGroup = new THREE.Group();
    octGroup.add(octMesh);
    octGroup.add(octWire);
    octGroup.position.set(3, 7, -8);
    shapesGroup.add(octGroup);

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

    // Scroll tracking for parallax
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;

        // Rotate entire scene slightly based on mouse
        particlesMesh.rotation.y += 0.0015;
        particlesMesh.rotation.x += 0.0008;

        // Rotate and float 3D shapes
        const time = Date.now() * 0.001;
        torusGroup.rotation.x += 0.002;
        torusGroup.rotation.y += 0.003;
        torusGroup.position.y = 3 + Math.sin(time * 0.5) * 0.5;

        icoGroup.rotation.x += 0.003;
        icoGroup.rotation.z += 0.002;
        icoGroup.position.y = -4 + Math.cos(time * 0.4) * 0.4;

        octGroup.rotation.y += 0.002;
        octGroup.rotation.z += 0.004;
        octGroup.position.y = 7 + Math.sin(time * 0.6) * 0.65;

        // Smooth scroll camera parallax
        const targetCamY = -scrollY * 0.008;
        const targetCamZ = 15 + scrollY * 0.003;
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        camera.position.z += (targetCamZ - camera.position.z) * 0.05;

        // Rotate camera slightly based on mouse
        camera.position.x += (mouseX * 0.005 - camera.position.x) * 0.05;

        // Make camera look at center of the scroll area
        camera.lookAt(0, camera.position.y * 0.5, 0);
        
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
