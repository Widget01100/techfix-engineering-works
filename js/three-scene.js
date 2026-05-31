// Three.js Scene with rotating gear and ambient particles
(function () {
  const container = document.getElementById("three-canvas");
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null; // transparent
  scene.fog = new THREE.FogExp2(0x000000, 0.002);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(1, 2, 1);
  scene.add(dirLight);
  const backLight = new THREE.PointLight(0xef4444, 0.5);
  backLight.position.set(0, 0, -2);
  scene.add(backLight);

  // Create gear geometry
  const gearGeometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];
  const radius = 1.8;
  const teeth = 24;
  const toothHeight = 0.4;
  const toothWidth = 0.3;

  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2;
    const angleNext = ((i + 1) / teeth) * Math.PI * 2;
    const rInner = radius - 0.3;
    const rOuter = radius + toothHeight;
    // Tooth tip
    const x1 = Math.cos(angle) * rOuter;
    const y1 = Math.sin(angle) * rOuter;
    const x2 = Math.cos(angle + toothWidth / radius) * rOuter;
    const y2 = Math.sin(angle + toothWidth / radius) * rOuter;
    const x3 = Math.cos(angleNext - toothWidth / radius) * rOuter;
    const y3 = Math.sin(angleNext - toothWidth / radius) * rOuter;
    const x4 = Math.cos(angleNext) * rOuter;
    const y4 = Math.sin(angleNext) * rOuter;
    // Inner circle points
    const ix1 = Math.cos(angle) * rInner;
    const iy1 = Math.sin(angle) * rInner;
    const ix2 = Math.cos(angleNext) * rInner;
    const iy2 = Math.sin(angleNext) * rInner;

    const idx = vertices.length / 3;
    vertices.push(
      x1,
      y1,
      0,
      x2,
      y2,
      0,
      x3,
      y3,
      0,
      x4,
      y4,
      0,
      ix1,
      iy1,
      0,
      ix2,
      iy2,
      0,
    );
    indices.push(
      idx,
      idx + 1,
      idx + 4,
      idx + 1,
      idx + 5,
      idx + 4,
      idx + 1,
      idx + 2,
      idx + 5,
      idx + 2,
      idx + 3,
      idx + 5,
    );
  }
  gearGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices), 3),
  );
  gearGeometry.setIndex(indices);
  gearGeometry.computeVertexNormals();

  const gearMaterial = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    metalness: 0.8,
    roughness: 0.3,
    emissive: 0x442200,
  });
  const gear = new THREE.Mesh(gearGeometry, gearMaterial);
  scene.add(gear);

  // Central hub
  const hubGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    metalness: 0.7,
    roughness: 0.4,
  });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  hub.position.z = 0.1;
  gear.add(hub);

  // Particles around gear
  const particleCount = 500;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radiusP = 3 + Math.random() * 2;
    const angleP = Math.random() * Math.PI * 2;
    particlePositions[i * 3] = Math.cos(angleP) * radiusP;
    particlePositions[i * 3 + 1] = Math.sin(angleP) * radiusP;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  particleGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3),
  );
  const particleMat = new THREE.PointsMaterial({
    color: 0xfacc15,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Animation
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    gear.rotation.z += 0.01;
    gear.rotation.x = Math.sin(time * 0.5) * 0.1;
    gear.rotation.y = Math.cos(time * 0.3) * 0.1;
    particles.rotation.y += 0.002;
    particles.rotation.x += 0.001;
    camera.position.z = 8 + Math.sin(time * 0.2) * 0.2;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
