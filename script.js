// Initialize GSAP animations for the feature cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    let currentCardIndex = 0;

    function showCard(index) {
        gsap.to(cards[index], {duration: 1, opacity: 1, visibility: 'visible', transform: 'scale(1)', ease: "power3.out"});
    }

    function hideCard(index) {
        gsap.to(cards[index], {duration: 1, opacity: 0, visibility: 'hidden', transform: 'scale(0.8)', ease: "power3.in"});
    }

    function cycleCards() {
        hideCard(currentCardIndex);
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        showCard(currentCardIndex);
    }

    showCard(currentCardIndex); // Show the first card initially
    setInterval(cycleCards, 5000); // Change card every 5 seconds

    // Initialize the 3D background
    init3DBackground();
});

function init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({color: 0x0077ff, wireframe: true});
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const light = new THREE.PointLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 30;

    // Animate the torus rotation
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    // Animate the camera position
    gsap.to(camera.position, {
        duration: 20,
        z: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Adjust camera and renderer on window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
