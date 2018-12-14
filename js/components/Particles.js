let camera, renderer, scene;

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(100, 0, 100);

    const controls = new THREE.OrbitControls(camera);

}

const v = new THREE.Vector3();

function randomPointInSphere(radius) {

    const x = THREE.Math.randFloat(-1, 1);
    const y = THREE.Math.randFloat(-1, 1);
    const z = THREE.Math.randFloat(-1, 1);
    const normalizationFactor = 1 / Math.sqrt(x * x + y * y + z * z);

    v.x = x * normalizationFactor * radius;
    v.y = y * normalizationFactor * radius;
    v.z = z * normalizationFactor * radius;

    return v;
}

function initPoints() {

    const geometry = new THREE.BufferGeometry();

    var positions = [];

    for (var i = 0; i < 50000; i++) {

        var vertex = randomPointInSphere(50);
        positions.push(vertex.x, vertex.y, vertex.z);

    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    material = new THREE.PointsMaterial({ color: 0xff00ff, size: 0.1 });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);


}

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize);

init();
initPoints();

animate();
