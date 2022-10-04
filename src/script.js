import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

const params = {
    exposure: 1,
    bloomThreshold: 0.33,
    bloomStrength: 0,
    bloomRadius: 1,
    donutsAmount: 100,
    spheresAmount: 70,
    diamondAmount: 200,
};

// FONT
let enterObjects = []
const fontLoader = new FontLoader()
fontLoader.load('/fonts/galaxy.json', (font) =>{
    fontMaker('WELCOME \n TO THE \n URALAVERSE!', font, {x: 0, y: 1, z: 0},  0x03ead9, 'welcome', true)
    fontMaker('ENTER', font, {x: 0, y: -1.5, z: 0},  0xff0030, 'enter', false)
    enterObjects = scene.children.filter(obj => obj.name === 'enter')
})

const fontMaker = (text, font, position, color, name, wireframe) => {
    const textGeometry = new TextGeometry(
        text, {
            font: font,
            size: 0.6,
            height: 0.2,
            // curveSegments: 1,
            // bevelEnabled: true,
            // bevelSize: 0.01,
            // bevelThickness: 0.03,
            // bevelOffset: 0,
            // bevelSegments: 1
        }
    )
    textGeometry.center()

    const textMesh = new THREE.Mesh()
    if(wireframe){
        textMesh.geometry = textGeometry
        textMesh.material = new THREE.MeshPhongMaterial({
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1,
        })
        let wireframe = new THREE.WireframeGeometry( textGeometry );
        let line = new THREE.LineSegments( wireframe );
        line.material.color.setHex(color);
        line.position.x = position.x
        line.position.y = position.y
        line.position.z = position.z
        line.name = name
        scene.add(line);
        gsap.to(line.scale, 7, {
            z: 5
        })
    } else {
        textMesh.geometry = textGeometry
        textMesh.material = material
        gsap.to(textMesh.rotation, 1, {
            x: - Math.PI * 2
        })
    }
    textMesh.position.x = position.x
    textMesh.position.y = position.y
    textMesh.position.z = position.z
    textMesh.name = name
    scene.add(textMesh)
}

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
//     renderer.toneMappingExposure = Math.pow( value, 4.0 );
// } );

// gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {
//     bloomPass.threshold = Number( value );
// } );

// gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {
//     bloomPass.strength = Number( value );
// } );

// gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
//     bloomPass.radius = Number( value );
// } );


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light - low cost
// const ambientLight = new THREE.AmbientLight()
// ambientLight.color = new THREE.Color(0xff8867)
// ambientLight.intensity = 0.01
// scene.add(ambientLight)

// Directional light - moderate cost
// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
// directionalLight.position.set(1, 0.25, 0)
// scene.add(directionalLight)

// Hemisphere light - low cost
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

// Point light - moderate cost
const pointLight = new THREE.PointLight(0xff9000, 0.2, 10, 2)
pointLight.position.set(1, - 0.5, 1)
scene.add(pointLight)

// // Rect area light - high cost
// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
// rectAreaLight.position.set(- 1.5, 0, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

// Spot light - high cost
// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 2, 3)
// scene.add(spotLight)

// spotLight.target.position.x = - 0.75
// scene.add(spotLight.target)

/**
 * Models
 */

 const gltfLoader = new GLTFLoader()

 let coin = {}
 gltfLoader.load('/models/btc.glb', (m) => {
        const coinModel = m.scene.children[0]
        coinModel.scale.set(0.75, 0.75, 0.75)
        coinModel.position.x = 2
        coinModel.position.y = 1
        scene.add(coinModel)
        coin = coinModel
        // console.log(scene.children)
    }
)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: '#0b5400' })
const matcapTexture2 = textureLoader.load('/textures/matcaps/3.png')
const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })

let genHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// Donuts
const donutGroup = new THREE.Group()
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
for(let i = 0; i < params.donutsAmount; i++){
    const donut = new THREE.Mesh(
        donutGeometry,
        new THREE.MeshNormalMaterial({
            wireframe: true
        })
    )
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    donut.scale.set(scale, scale, scale)
    donutGroup.add(donut)
}

// Sphere
const sphereGroup = new THREE.Group()
const sphereGeometry = new THREE.SphereGeometry(.2, 20, 20)
for(let i = 0; i < params.spheresAmount; i++){
    const sphere = new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshMatcapMaterial({
            matcap: matcapTexture2,
            color: new THREE.Color("#"+genHex(6))
        })
    )
    // sphere.material.color = new THREE.Color("rgb(159, 1, 134)")
    sphere.position.x = (Math.random() - 0.5) * 10
    sphere.position.y = (Math.random() - 0.5) * 10
    sphere.position.z = (Math.random() - 0.5) * 10
    sphere.rotation.x = Math.random() * Math.PI
    sphere.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    sphere.scale.set(scale, scale, scale)
    sphereGroup.add(sphere)
}

// Octahedro
const octGroup = new THREE.Group()
const octGeometry = new THREE.OctahedronGeometry(.2)
for(let i = 0; i < params.diamondAmount; i++){
    const oct = new THREE.Mesh(
        octGeometry,
        new THREE.MeshMatcapMaterial({
            matcap: matcapTexture2,
            color: new THREE.Color("#"+genHex(6)),
        })
    )
    oct.position.x = (Math.random() - 0.5) * 10
    oct.position.y = (Math.random() - 0.5) * 10
    oct.position.z = (Math.random() - 0.5) * 10
    oct.rotation.x = Math.random() * Math.PI
    oct.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    oct.scale.set(scale, scale, scale)
    octGroup.add(oct)
}

scene.add(donutGroup, sphereGroup, octGroup)

/**
 * Raycaster
 */
 const raycaster = new THREE.Raycaster()
 let currentIntersect = null
 const rayOrigin = new THREE.Vector3(- 3, 0, 0)
 const rayDirection = new THREE.Vector3(10, 0, 0)
 rayDirection.normalize()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
     mouse.x = event.clientX / sizes.width * 2 - 1
     mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

let objectsToTest = []
const intersects = raycaster.intersectObjects(objectsToTest)
let clicked = false

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let lastNumber
let enterColor

window.addEventListener('click', () => {
    if(intersects.length) {
        if(!currentIntersect) {
            // console.log('click enter')
        }
        currentIntersect = intersects[0]
    } else {
        if(currentIntersect) {
            // console.log('click')
            clicked = true
            enterColor = new THREE.Color('#490561')
            gsap.to(currentIntersect.object.material.color, 1, {
                r: enterColor.r,
                g: enterColor.g,
                b: enterColor.b
            })
            gsap.to(currentIntersect.object.scale, 1, {
                x: 1.5,
                y: 1.5,
                z: 1.5
            })
            gsap.to(currentIntersect.object.rotation, 1, {
                x: Math.PI * 2
            })
            // currentIntersect.object.material.color.set('#490561')
            setTimeout(() => {
                while(scene.children.length > 0){
                    scene.remove(scene.children[0]);
                }
                renderer.toneMappingExposure = 0.4
                firstScene = false
                scene.add(camera)
                let number = getRandomInt(1, 3)
                if(number === lastNumber){
                    number = getRandomInt(1, 3)
                }
                if (number === 1){
                    const octGroup = new THREE.Group()
                    const octGeometry = new THREE.OctahedronGeometry(.2)
                    for(let i = 0; i < 1000; i++){
                        const oct = new THREE.Mesh(
                            octGeometry,
                            new THREE.MeshMatcapMaterial({
                                matcap: matcapTexture2,
                                color: new THREE.Color("#"+genHex(6)),
                            })
                        )
                        oct.position.x = (Math.random() - 0.5) * 10
                        oct.position.y = (Math.random() - 0.5) * 10
                        oct.position.z = (Math.random() - 0.5) * 10
                        oct.rotation.x = Math.random() * Math.PI
                        oct.rotation.y = Math.random() * Math.PI
                        const scale = Math.random()
                        oct.scale.set(scale, scale, scale)
                        octGroup.add(oct)
                    }
                    scene.add(octGroup)
                    scene.add(coin)
                    scene.add(pointLight)
                    scene.add(hemisphereLight)
                    lastNumber = 1
                }
                if (number === 2){
                    const sphereGroup = new THREE.Group()
                    const sphereGeometry = new THREE.SphereGeometry(.2, 20, 20)
                    for(let i = 0; i < 600; i++){
                        const sphere = new THREE.Mesh(
                            sphereGeometry,
                            new THREE.MeshMatcapMaterial({
                                matcap: matcapTexture2,
                                color: new THREE.Color("#"+genHex(6))
                            })
                        )
                        // sphere.material.color = new THREE.Color("rgb(159, 1, 134)")
                        sphere.position.x = (Math.random() - 0.5) * 10
                        sphere.position.y = (Math.random() - 0.5) * 10
                        sphere.position.z = (Math.random() - 0.5) * 10
                        sphere.rotation.x = Math.random() * Math.PI
                        sphere.rotation.y = Math.random() * Math.PI
                        const scale = Math.random()
                        sphere.scale.set(scale, scale, scale)
                        sphereGroup.add(sphere)
                    }
                    scene.add(sphereGroup)
                    scene.add(coin)
                    scene.add(pointLight)
                    scene.add(hemisphereLight)
                    lastNumber = 2
                }
                if (number === 3){
                    // Donuts
                    const donutGroup = new THREE.Group()
                    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
                    for(let i = 0; i < 400; i++){
                        const donut = new THREE.Mesh(
                            donutGeometry,
                            new THREE.MeshNormalMaterial({wireframe: true})
                        )
                        donut.position.x = (Math.random() - 0.5) * 10
                        donut.position.y = (Math.random() - 0.5) * 10
                        donut.position.z = (Math.random() - 0.5) * 10
                        donut.rotation.x = Math.random() * Math.PI
                        donut.rotation.y = Math.random() * Math.PI
                        const scale = Math.random()
                        donut.scale.set(scale, scale, scale)
                        donutGroup.add(donut)
                    }
                    scene.add(donutGroup)
                    scene.add(coin)
                    scene.add(pointLight)
                    scene.add(hemisphereLight)
                    lastNumber = 3
                }
            }, 1200)
        }
    }

        // switch(currentIntersect.object) {
        //     case objectsToTest[0]:
        //         console.log('click on object 1')
        //         objectsToTest[0].material.color.set('green')
        //         //  object2.material.color.set('#ff0000')
        //         //  object3.material.color.set('#ff0000')
        //          break

        //      case objectsToTest[1]:
        //          console.log('click on object 2')
        //          objectsToTest[1].material.color.set('#ff0030')
        //         //  object1.material.color.set('#ff0000')
        //         //  object3.material.color.set('#ff0000')
        //          break

            //  case object3:
            //      console.log('click on object 3')
            //      object3.material.color.set('#2e00ff')
            //      object2.material.color.set('#ff0000')
            //      object1.material.color.set('#ff0000')
            //      break
        //  }
    //  }
 })

/**
 * Camera
 */
// Base camera
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -2
camera.position.y = 1
camera.position.z = 6
cameraGroup.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

let firstScene = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure += 5

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

let composer = new EffectComposer( renderer )
composer.addPass( renderScene )
composer.addPass( bloomPass )


let up = true;
let limit = 1;

const checkBloomStrength = () => {
    if (up == true && bloomPass.strength <= limit) {
        bloomPass.strength += 0.005
        if (bloomPass.strength == limit) {
          up = false;
        }
    } else {
        up = false
        bloomPass.strength -= 0.008
        if (bloomPass.strength == 0.2 || bloomPass.strength < 0.2) {
            up = true;
        }
    }
}

let changeBloomStrength = setInterval(checkBloomStrength, 16);
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // Update controls
    controls.update()

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = []
    if(enterObjects.length > 0){
        for(const obj in enterObjects){
            objectsToTest.push(enterObjects[obj])
        }
        // camera.lookAt(scene.children[7].position)
        // console.log(objectsToTest[0]) // enter
    }
    // const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    if(!clicked) {
        if(intersects.length) {
            if(!currentIntersect) {
                // console.log('mouse enter')
            }
            currentIntersect = intersects[0]
            // console.log(currentIntersect.object)
            // currentIntersect.object.material.color.set('#002034')
            enterColor = new THREE.Color('#002034')
            gsap.to(currentIntersect.object.material.color, 1, {
                r: enterColor.r,
                g: enterColor.g,
                b: enterColor.b
            })
            // gsap.to(currentIntersect.object.scale, 1, {
            //     x: 1.3,
            //     y: 1.3,
            //     z: 1.3
            // })
        }
        else {
            if(currentIntersect) {
                // console.log('mouse leave')
                // currentIntersect.object.material.color.set('#083b00')
                enterColor = new THREE.Color('#083b00')
                gsap.to(currentIntersect.object.material.color, 1, {
                    r: enterColor.r,
                    g: enterColor.g,
                    b: enterColor.b
                })
            }
            currentIntersect = null
        }
    }

    for(let i = 0; i < donutGroup.children.length; i++){
        if(i % 2 === 0){
            donutGroup.children[i].rotation.x = - elapsedTime * Math.PI * 0.25
        } else {
            donutGroup.children[i].rotation.y = elapsedTime * Math.PI * 0.25
        }
    }

    for(let i = 0; i < sphereGroup.children.length; i++){
        if(i % 2 === 0){
            sphereGroup.children[i].position.x = sphereGroup.children[i].position.x + Math.cos(elapsedTime) / (i * 2)
            sphereGroup.children[i].position.y = sphereGroup.children[i].position.y + Math.sin(elapsedTime) / (i * 2)
        } else {
            sphereGroup.children[i].position.x = sphereGroup.children[i].position.x + Math.sin(elapsedTime) / (i * 2)
            sphereGroup.children[i].position.z = sphereGroup.children[i].position.z + Math.cos(elapsedTime) / (i * 2)
        }
    }
    for(let i = 0; i < octGroup.children.length; i++){
        if(i % 2 === 0){
            octGroup.children[i].rotation.x = elapsedTime * Math.PI * 0.5
            // octGroup.children[i].position.y = octGroup.children[i].position.y + Math.sin(elapsedTime) / (i * 3)
        } else {
            octGroup.children[i].rotation.x = - elapsedTime * Math.PI * 0.5
            // octGroup.children[i].position.z = octGroup.children[i].position.y + Math.sin(elapsedTime) / (i * 2)
        }
    }

    if(!firstScene){
        scene.rotation.y = - elapsedTime * Math.PI / 16
        scene.rotation.z = - elapsedTime * Math.PI / 16
        renderer.toneMappingExposure += 0.02
        clearInterval(changeBloomStrength)
    }
    // const parallaxX = mouse.x * 1.5
    // const parallaxY = - mouse.y * 1.5
    // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    // if(scene.children.length > 6){
    //     camera.lookAt(scene.children[7])
    // }
    if(typeof coin.children != 'undefined'){
        coin.rotation.z = - elapsedTime * Math.PI * 0.2
        // coin.position.z = - elapsedTime / 6
    }
    // Render
    composer.render();
    // renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()