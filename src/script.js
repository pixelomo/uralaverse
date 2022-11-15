import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
// const tl = gsap.timeline();

let locationScene = false

const initHome = () => {

    let sceneReady = false
    locationScene = false
    const params = {
        exposure: 1,
        bloomThreshold: 0.33,
        bloomStrength: 0,
        bloomRadius: 1,
        bloomLimit: 0.65, // 1.5
        donutsAmount: 20, // 70
        spheresAmount: 20, // 100
        diamondAmount: 40, // 170
        particleCount: 800 // 3000
    };

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()
    const material = new THREE.MeshStandardMaterial()
    const matcapTexture2 = textureLoader.load('/textures/matcaps/4.png')
    const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
    let genHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    // FONT
    let mainFont = {}
    // let uralaverseObject = {}
    // let homeButton = {}
    const fontLoader = new FontLoader()
    fontLoader.load('/fonts/galaxy.json', (font) =>{
        mainFont = font
        // fontMaker('WELCOME', mainFont, 0.9, {x: 1, y: 2.4, z: -2.5},  0x03ead9, 'welcome', true)
        // fontMaker('TO THE', mainFont, 0.6, {x: 1, y: 1.3, z: -2.8},  0x03ead9, 'welcome', true)
        // fontMaker('URALAVERSE!', mainFont, 1, {x: 1, y: 0.2, z: -2.5},  0xf3ead9, 'uralaverse', true, true)
        // fontMaker('CONTACT', mainFont, 0.5, {x: 0, y: -3, z: -2.5},  0x00df00, 'contact', true)
        // fontMaker('ABOUT', mainFont, 0.4, {x: -3, y: -2, z: -2},  0xF8a020, 'about', true)
        fontMaker('WELCOME', mainFont, 0.9, {x: 1, y: 2.4, z: -2.5},  '#002056', 'welcome', false)
        fontMaker('TO THE', mainFont, 0.6, {x: 1, y: 1.4, z: -2.8},  '#bd4500', 'to', false)
        fontMaker('URALAVERSE!', mainFont, 1, {x: 1, y: 0.2, z: -2.5},  '#7d09a7', 'uralaverse', false)
        fontMaker('CONTACT', mainFont, 0.5, {x: 0, y: -3, z: -2.5},  '#bd4500', 'contact', false)
        fontMaker('ABOUT', mainFont, 0.4, {x: -3, y: -2, z: -2},  '#00f208', 'about', false)
        fontMaker('LOCATIONS', mainFont, 0.4, {x: 3.2, y: -2.2, z: -2},  '#002056', 'locations', false)
        // fontMaker('HOME', mainFont, 0.4, {x: 1, y: -1.5, z: 2},  '#22ff33', 'home', false)
        // homeButton = scene.children.filter(obj => obj.name === 'home')
        // homeButton[0].visible = false
        // fontMaker('ENTER', mainFont, 0.6, {x: 1, y: -1.5, z: 0},  0xff0030, 'enter', false)
        // enterObjects = scene.children.filter(obj => obj.name === 'enter')
        // uralaverseObject = scene.children.filter(obj => obj.name === 'uralaverse')
    })

    const fontMaker = (text, font, size = 0.6, position, color, name, wireframe) => {
        const textGeometry = new TextGeometry(
            text, {
                font: font,
                size: size,
                height: 0.3,
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
            textMesh.material = new THREE.MeshStandardMaterial({ color: color })
            let wireframe = new THREE.WireframeGeometry( textGeometry );
            let line = new THREE.LineSegments( wireframe );
            line.material.color.setHex(color);
            line.position.x = position.x
            line.position.y = position.y
            line.position.z = position.z
            scene.add(line);
            if(firstScene){
                gsap.to(line.scale, 10, {
                    z: 1.4,
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 5,
                    ease: "power1.inOut()",
                })
            }
        } else {
            textMesh.geometry = textGeometry
            textMesh.material = new THREE.MeshStandardMaterial({
                color: color
            })
            gsap.to(textMesh.rotation, 1, {
                x: - Math.PI * 2
            })
        }
        textMesh.position.x = position.x
        textMesh.position.y = position.y
        textMesh.position.z = position.z
        textMesh.name = name
        window[name + 'text'] = textMesh;
        objectsToTest.push(window[name + 'text'])
        scene.add(textMesh)
    }

    // SVG SVG SVG //
    // SVG SVG SVG //
    // SVG SVG SVG //
    let uralaLogo = {}
    const loadSVG = (path, name, url, position, scale) => {

        const loader = new SVGLoader()
        loader.load( path, ( data ) => {

            const paths = data.paths
            const group = new THREE.Group()
            group.scale.multiplyScalar( 0.25 )
            group.position.x = - 70
            group.position.y = 70
            group.scale.set(scale, scale, scale)
            group.scale.y *= - 1

            for ( let i = 0; i < paths.length; i++ ) {
                const path = paths[ i ]
                const fillColor = path.userData.style.fill

                if ( fillColor !== undefined && fillColor !== 'none' ) {
                    const material = new THREE.MeshBasicMaterial( {
                        color: new THREE.Color().setStyle( fillColor ).convertSRGBToLinear(),
                        opacity: path.userData.style.fillOpacity,
                        transparent: true,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                        // wireframe: guiData.fillShapesWireframe
                    });

                    const shapes = SVGLoader.createShapes( path )

                    for ( let j = 0; j < shapes.length; j ++ ) {
                        const shape = shapes[ j ]
                        const geometry = new THREE.ShapeGeometry( shape )
                        const mesh = new THREE.Mesh( geometry, material )
                        group.add(mesh)
                    }
                }

                const strokeColor = path.userData.style.stroke

                if ( strokeColor !== undefined && strokeColor !== 'none' ) {
                    const material = new THREE.MeshBasicMaterial( {
                        color: new THREE.Color().setStyle( strokeColor ).convertSRGBToLinear(),
                        opacity: path.userData.style.strokeOpacity,
                        transparent: true,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                        // wireframe: guiData.strokesWireframe
                    });

                    for ( let j = 0, jl = path.subPaths.length; j < jl; j ++ ) {
                        const subPath = path.subPaths[ j ]
                        const geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style )

                        if ( geometry ) {
                            const mesh = new THREE.Mesh( geometry, material )
                            group.add( mesh )
                        }
                    }
                }
            }
            group.name = name
            group.userData.url = url
            objectsToTest.push(group)
            group.position.set(position.x, position.y, position.z)
            group.lookAt(camera.position)
            scene.add(group)
        })
    }
    loadSVG('/images/urala-b.svg', 'urala', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 3, z: 0}, 0.015)
    // loadSVG('/images/decapital.svg', 'decapital', 'https://de.capital/', {x: 1.5, y: -1.5, z: .5}, 0.0005)
    loadSVG('/images/ctb.svg', 'cointelegraph', 'https://jp.cointelegraph.com/', {x: -5.5, y: 4, z: -.5}, 0.015)

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
    // const directionalLight = new THREE.DirectionalLight(0xffffff, .7)
    // directionalLight.position.set(1, -.5, 1)
    // scene.add(directionalLight)

    // Hemisphere light - low cost
    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, .8)
    scene.add(hemisphereLight)

    // Point light - moderate cost
    const pointLight = new THREE.PointLight(0xffffff, 0.7, 30, 2)
    pointLight.position.set(1, 3, 10)
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
    // Particles
    */
    //
    const particleTexture = textureLoader.load('/textures/particles/1.png')
    const particlesGeometry = new THREE.BufferGeometry()
    const count = params.particleCount

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for(let i = 0; i < count * 3; i++){
        positions[i] = (Math.random() - 0.5) * 20
        colors[i] = Math.random()
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        // color: '#f7f1aa',
        map: particleTexture,
        transparent: true,
        alphaMap: particleTexture,
        // alphaTest: 0.5
        // depthTest: false
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

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

    // Octahedron
    const octGroup = new THREE.Group()
    const octGeometry = new THREE.OctahedronGeometry(.2)
    for(let i = 0; i < params.diamondAmount; i++){
        const oct = new THREE.Mesh(
            octGeometry,
            new THREE.MeshStandardMaterial({
                color: new THREE.Color("#"+genHex(6)),
            })
        )
        oct.position.x = (Math.random() - 0.5) * 10
        oct.position.y = (Math.random() - 0.5) * 10
        oct.position.z = (Math.random() - 0.5) * 10
        oct.rotation.x = Math.random() * Math.PI
        oct.rotation.y = Math.random() * Math.PI
        const scale = Math.random() * 1.25
        oct.scale.set(scale, scale, scale)
        octGroup.add(oct)
    }

    scene.add(donutGroup, sphereGroup, octGroup)

    const homeScene = () => {
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
                new THREE.MeshStandardMaterial({
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
        fontMaker('WELCOME \n TO THE \n URALAVERSE!', mainFont, 0.6, {x: 1, y: 1.5, z: 0},  0x03ead9, 'welcome', true)
        fontMaker('ENTER', mainFont, 0.6, {x: 1, y: -1.5, z: 0},  0xff0030, 'enter', false)
        scene.add(hemisphereLight)
        scene.add(pointLight)
        let spherePositions = sphereGroup.children.map(i => i.position)
        gsap.to(spherePositions, {
            x: Math.cos(100),
            y: Math.sin(100),
            z: Math.sin(100),
            duration: 25,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8
        })

        let donutPositions = donutGroup.children.map(i => i.position)
        gsap.to(donutPositions, {
            x: Math.cos(100),
            y: Math.sin(100),
            z: Math.sin(100),
            duration: 25,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8
        })
        let donutScales = donutGroup.children.map(i => i.scale)
        gsap.to(donutScales, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 25,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8
        })
        let donutRotations = donutGroup.children.map(i => i.rotation)
        gsap.to(donutRotations, {
            x: Math.PI * 4,
            duration: 20,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut()",
        })

        let diamondPositions = octGroup.children.map(i => i.position)
        gsap.to(diamondPositions, {
            x: Math.cos(100),
            y: Math.sin(100),
            z: Math.sin(100),
            duration: 25,
            yoyo: true,
            repeat: -1,
            stagger: 0.01,
            ease: "back.inOut(1.7)",
            repeatDelay: 8
        })
        let diamondRotations = octGroup.children.map(i => i.rotation)
        gsap.to(diamondRotations, {
            x: Math.PI * 8,
            duration: 20,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut()",
        })

        changeBloomStrength
    }

    const menuScene = () => {
        fontMaker('HOME', mainFont, 0.6, {x: -2, y: 2.5, z: 1},  0x22f930, 'home', true)
        fontMaker('ABOUT', mainFont, 0.6, {x: 2.5, y: 2, z: 0},  0x22f930, 'about', true)
        fontMaker('PORTFOLIO', mainFont, 0.6, {x: -2, y: 1, z: -1},  0xda005a, 'portfolio', true)
        fontMaker('CLIENTS', mainFont, 0.6, {x: 3, y: 0, z: 1},  0xfaff30, 'clients', true)
        fontMaker('SERVICES', mainFont, 0.6, {x: -2, y: -1, z: 0},  0x00df90, 'services', true)
        fontMaker('TEAM', mainFont, 0.6, {x: 4, y: -2, z: -1},  0x00f0a0, 'team', true)
        fontMaker('CONTACT', mainFont, 0.6, {x: 0, y: -3, z: 0},  0x7890f0, 'contact', true)
        scene.add(pointLight)
        scene.add(hemisphereLight)
        const octGroup = new THREE.Group()
        const octGeometry = new THREE.OctahedronGeometry(.2)
        for(let i = 0; i < 100; i++){
            const oct = new THREE.Mesh(
                octGeometry,
                new THREE.MeshStandardMaterial({
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
        renderer.toneMappingExposure = 4
    }

    let aboutText = document.querySelector('.aboutText')
    let contactForm = document.querySelector('.contactForm')
    let aboutSection = document.querySelector('#about')
    let locationSection = document.querySelector('#locations')

    const aboutScene = () => {
        fontMaker('HOME', mainFont, 0.6, {x: 3.5, y: 3.3, z: 1},  0x22f930, 'home', true)
        fontMaker('ABOUT', mainFont, 0.6, {x: -2.5, y: 3, z: 0},  0x22f930, 'about', true)
        aboutText.classList.add('show')
        scene.add(pointLight)
        scene.add(hemisphereLight)
        scene.add(coin)
        gsap.to(coin.rotation, {
            z: Math.PI * 2,
            duration: 8,
            // yoyo: true,
            repeat: -1,
            ease: "linear",
        })
        // coin.rotation.z = - elapsedTime * Math.PI * 0.2
        const donutGroup = new THREE.Group()
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        for(let i = 0; i < 120; i++){
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
        scene.add(donutGroup)
        let donutRotations = donutGroup.children.map(i => i.rotation)
        gsap.to(donutRotations, {
            x: Math.PI * 4,
            duration: 20,
            yoyo: true,
            repeat: -1,
            ease: "power0.inOut()",
        })
        renderer.toneMappingExposure = 4
    }

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
                // console.log(currentIntersect)
                clicked = true
                enterColor = new THREE.Color('#490561')
                gsap.to(currentIntersect.object.material.color, 1, {
                    r: enterColor.r,
                    g: enterColor.g,
                    b: enterColor.b
                })
                // gsap.to(currentIntersect.object.scale, 1, {
                //     x: 1.2,
                //     y: 1.2,
                //     z: 1.2
                // })
                // gsap.to(currentIntersect.object.rotation, 1, {
                //     x: Math.PI * 2
                // })
                // currentIntersect.object.material.color.set('#490561')

                // if(firstScene){
                //     setTimeout(() => {
                //         while(scene.children.length > 0){
                //             scene.remove(scene.children[0]);
                //         }
                //         renderer.toneMappingExposure = 0.4
                //         firstScene = false
                //         scene.add(camera)
                //         menuScene()
                //     }, 1200)
                // }

                ////////////////////// HOME //////////////////////////
                if(currentIntersect.object.name === 'home'){
                    gsap.to(camera.position, {
                        x: -2.5,
                        y: -3,
                        z: 6,
                        duration: 2,
                        ease: "back.inOut(1.7)",
                    })
                    uralaLogo = scene.children.filter(obj => obj.name === 'urala')
                    setTimeout(() => {
                        // while(scene.children.length > 0){
                        //     scene.remove(scene.children[0]);
                        // }
                        renderer.toneMappingExposure = 4
                        // aboutText.classList.remove('show')
                        // homeButton[0].visible = false
                        uralaLogo[0].position.y = 3
                        contactForm.classList.remove('show')
                        canvas.classList.remove('disable')
                        aboutSection.classList.remove('show')
                        controls.enabled = true;
                    }, 700)
                }

                /////////////////////////// CONTACT ///////////////////////////////
                if(currentIntersect.object.name === 'contact'){
                    gsap.to(camera.position, {
                        x: -0.82,
                        y: -0.33,
                        z: -1.8,
                        duration: 2,
                        ease: "back.inOut(1.7)",
                    })
                    aboutSection.classList.remove('show')
                    locationSection.classList.remove('show')
                    uralaLogo = scene.children.filter(obj => obj.name === 'urala')
                    setTimeout(() => {
                        renderer.toneMappingExposure = 2.2
                        // renderer.toneMappingExposure = 1
                        // contact plane
                        // const plane = new THREE.Mesh(
                        //     new THREE.PlaneGeometry(6, 4),
                        //     new THREE.MeshBasicMaterial({
                        //         color: '#000',
                        //         transparent: true
                        //     })
                        // )
                        // plane.rotation.x = Math.PI / 1.2
                        // plane.position.z = 2
                        // plane.position.x = 1.5
                        // plane.position.y = 1
                        // objectsToTest.push(plane)
                        // scene.add(plane)
                        uralaLogo[0].position.y = 6
                        contactForm.classList.add('show')
                        canvas.classList.add('disable')
                        document.getElementById("name").focus();
                        // homeButton[0].position.set(1, -1.5, 2)
                        // homeButton[0].visible = true
                        // homeButton[0].lookAt(camera.position)
                        // pointLight.lookAt(homeButton[0].position)
                    }, 1200)
                }

                /////////////////////////// ABOUT ///////////////////////////////
                if(currentIntersect.object.name === 'about'){
                    gsap.to(camera.position, {
                        x: 5,
                        y: 14,
                        z: 5,
                        duration: 2,
                        ease: "back.inOut(1.7)",
                    })
                    locationSection.classList.remove('show')
                    setTimeout(() => {
                        aboutSection.classList.add('show')
                        // homeButton[0].visible = true
                        // homeButton[0].position.set(-4,3,2)
                        // homeButton[0].lookAt(camera.position)
                        // homeButton[0].rotation.y = 500
                    }, 1200)
                }
                if(typeof currentIntersect !== null && currentIntersect.object.parent.userData.url){
                    window.open(currentIntersect.object.parent.userData.url, '_blank').focus();
                }
                /////////////////////////// LOCATIONS ///////////////////////////////
                if(currentIntersect.object.name === 'locations'){
                    canvas.classList.add('fade')
                    gsap.globalTimeline.clear()
                    setTimeout(() => {
                        while(scene.children.length > 0){
                            scene.remove(scene.children[0]);
                        }
                        initLocations()
                        locationScene = true
                    }, 1000)
                    setTimeout(() => {
                        canvas.classList.remove('fade')
                        locationSection.classList.add('show')
                    }, 3000)
                    // gsap.to(camera.position, {
                    //     x: -3.4,
                    //     y: 16.25,
                    //     z: -0.6,
                    //     duration: 2,
                    //     ease: "back.inOut(1.7)",
                    // })
                    // scene.traverse((child) =>{
                    //     if(child.name === 'globe'){
                    //         // console.log(child.parent)
                    //         let g = child.parent.position
                    //         // cameraGroup.position.set(g.x, g.y, g.z)
                    //         // pointLight.lookAt(g)
                    //         pointLight.position.set(camera.position.x, camera.position.y, camera.position.z)
                    //         // controls.object.position.set(g.x,g.y,g.z)
                    //         gsap.to(child.parent.rotation, {
                    //             y: Math.PI * 4,
                    //             duration: 40,
                    //             repeat: -1,
                    //             ease: "linear",
                    //         })
                    //         gsap.to(camera.position, {
                    //             x: g.x - 0.4,
                    //             y: g.y - 0.9,
                    //             z: g.z + 1.75,
                    //             duration: 2,
                    //             ease: "back.inOut(1.7)",
                    //         })
                    //         console.log(camera.position)
                    //         // gsap.to(camera.position, {
                    //         //     x: -2.5,
                    //         //     y: -9.18,
                    //         //     z: 2.26,
                    //         //     duration: 2,
                    //         //     ease: "back.inOut(1.7)",
                    //         // })
                    //         // gsap.to(camera.rotation, {
                    //         //     x: -6.55,
                    //         //     y: -0.356,
                    //         //     z: 0.17,
                    //         //     duration: 2,
                    //         //     ease: "back.inOut(1.7)",
                    //         // })
                    //         sceneReady = true
                    //         controls.enabled = false
                    //         // camera.lookAt(g)
                    //     }
                    // })
                    aboutSection.classList.remove('show')
                    // setTimeout(() => {
                    //     locationSection.classList.add('show')
                    // }, 1200)
                }
                // if(currentIntersect.object.name === 'about'){
                //     setTimeout(() => {
                //         while(scene.children.length > 0){
                //             scene.remove(scene.children[0]);
                //         }
                //         renderer.toneMappingExposure = 4
                //         scene.add(camera)
                //         aboutScene()
                //     }, 1200)
                // }

            }
        }
    })

    const goHome = () => {
        if(locationScene) {
            while(scene.children.length > 0){
                scene.remove(scene.children[0]);
            }
            initHome()
            locationSection.classList.remove('show')
            renderer.toneMappingExposure = 4
        } else {
            gsap.to(camera.position, {
                x: -2.5,
                y: -3,
                z: 6,
                duration: 2,
                ease: "back.inOut(1.7)",
            })
            uralaLogo = scene.children.filter(obj => obj.name === 'urala')
            setTimeout(() => {
                renderer.toneMappingExposure = 4
                uralaLogo[0].position.y = 3
                contactForm.classList.remove('show')
                canvas.classList.remove('disable')
                aboutSection.classList.remove('show')
                locationSection.classList.remove('show')
            }, 700)
        }
    }

    const close = document.querySelectorAll('.close-button')

    close.forEach(btn => btn.addEventListener('click', () => {
        goHome()
    })
    )
    /**
     * Camera
     */
    // Base camera
    const cameraGroup = new THREE.Group()
    scene.add(cameraGroup)

    const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
    camera.position.set( - 2.5, -3, 6 );
    cameraGroup.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.minDistance = 1;
    controls.maxDistance = 10;

    let firstScene = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor( 0x000000, 0.0 );
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

    /**
     * Base
     */
    //  import { Line2 } from 'three/examples/jsm/lines/Line2.js';
    //  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
    //  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
    //  import * as GeometryUtils from 'three/examples/jsm/utils/GeometryUtils.js';

    //  let line;
    //  let matLine, matLineBasic, matLineDashed;
    //  const Lpositions = [];
    //  const Lcolors = [];

    //  const points = GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );

    //  const spline = new THREE.CatmullRomCurve3( points );
    //  const divisions = Math.round( 12 * points.length );
    //  const point = new THREE.Vector3();
    //  const color = new THREE.Color();

    //  for ( let i = 0, l = divisions; i < l; i ++ ) {
    //      const t = i / l;
    //      spline.getPoint( t, point );
    //      Lpositions.push( point.x, point.y, point.z );
    //      color.setHSL( t, 1.0, 0.5 );
    //      Lcolors.push( color.r, color.g, color.b );
    //  }

    //  // Line2 ( LineGeometry, LineMaterial )
    //  const geometry = new LineGeometry();
    //  geometry.setPositions( Lpositions );
    //  geometry.setColors( Lcolors );

    //  matLine = new LineMaterial( {
    //      color: 0xffffff,
    //      linewidth: 10, // in world units with size attenuation, pixels otherwise
    //      vertexColors: true,
    //      //resolution:  // to be set by renderer, eventually
    //      dashed: false,
    //      alphaToCoverage: true,
    //  } );

    //  line = new Line2( geometry, matLine );
    //  line.computeLineDistances();
    //  line.scale.set( .1, .1, .1 );
    //  line.position.set(0,-2,-5)
    //  scene.add( line );

    // Debug
    // const gui = new dat.GUI()

    // // gui.add(matLine, 'linewidth', 0.1, 2 ).min(2).max(10).step(0.01).name('Line Width')

    // gui.add(camera.position, 'x', 0.1, 2 ).min(-10).max(10).step(0.01).name('CameraPos X')
    // gui.add(camera.position, 'y', 0.1, 2 ).min(-10).max(10).step(0.01).name('CameraPos Y')
    // gui.add(camera.position, 'z', 0.1, 2 ).min(-10).max(10).step(0.01).name('CameraPos Z')

    // gui.add(camera.rotation, 'x', 0.1, 2 ).min(-10).max(10).step(0.0001).name('CameraRotation X')
    // gui.add(camera.rotation, 'y', 0.1, 2 ).min(-10).max(10).step(0.0001).name('CameraRotation Y')
    // gui.add(camera.rotation, 'z', 0.1, 2 ).min(-10).max(10).step(0.0001).name('CameraRotation Z')

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

    let up = true;
    let limit = params.bloomLimit;
    const checkBloomStrength = () => {
        if (up == true && bloomPass.strength <= limit) {
            bloomPass.strength += 0.0035
            if (bloomPass.strength == limit) {
            up = false;
            }
        } else {
            up = false
            bloomPass.strength -= 0.006
            if (bloomPass.strength == 0.01 || bloomPass.strength < 0.01) {
                up = true;
            }
        }
    }
    let changeBloomStrength = setInterval(checkBloomStrength, 24);

    /**
     * Animate
     */
    const clock = new THREE.Clock()
    let previousTime = 0

    let spherePositions = sphereGroup.children.map(i => i.position)
    gsap.to(spherePositions, {
        x: Math.cos(100),
        y: Math.sin(100),
        z: Math.sin(100),
        duration: 25,
        yoyo: true,
        repeat: -1,
        stagger: 0.01,
        ease: "back.inOut(1.7)",
        repeatDelay: 8
    })

    let donutPositions = donutGroup.children.map(i => i.position)
    gsap.to(donutPositions, {
        x: Math.cos(100),
        y: Math.sin(100),
        z: Math.sin(100),
        duration: 25,
        yoyo: true,
        repeat: -1,
        stagger: 0.01,
        ease: "back.inOut(1.7)",
        repeatDelay: 8
    })
    let donutScales = donutGroup.children.map(i => i.scale)
    gsap.to(donutScales, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 25,
        yoyo: true,
        repeat: -1,
        stagger: 0.01,
        ease: "back.inOut(1.7)",
        repeatDelay: 8
    })
    let donutRotations = donutGroup.children.map(i => i.rotation)
    gsap.to(donutRotations, {
        x: Math.PI * 4,
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut()",
    })

    let diamondPositions = octGroup.children.map(i => i.position)
    gsap.to(diamondPositions, {
        x: Math.cos(100),
        y: Math.sin(100),
        z: Math.sin(100),
        duration: 25,
        yoyo: true,
        repeat: -1,
        stagger: 0.01,
        ease: "back.inOut(1.7)",
        repeatDelay: 8
    })
    let diamondRotations = octGroup.children.map(i => i.rotation)
    gsap.to(diamondRotations, {
        x: Math.PI * 8,
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut()",
    })

    let uralaObject = {}
    let ctObject = {}
    let decapObject = {}

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime
        // Update controls
        controls.update()

        // Cast a ray from the mouse and handle events
        raycaster.setFromCamera(mouse, camera)

        // if(enterObjects.length > 0){
        //     for(const obj in enterObjects){
        //         objectsToTest.push(enterObjects[obj])
        //     }
        // }
        // const objectsToTest = [object1, object2, object3]
        const intersects = raycaster.intersectObjects(objectsToTest)

        // if(!clicked) {
            if(intersects.length) {
                if(!currentIntersect) {
                    // console.log('mouse enter')
                }
                currentIntersect = intersects[0]
                // console.log(currentIntersect.object)
                if(currentIntersect.object == window.entertext){
                    enterColor = new THREE.Color('#002034')
                    // gsap.to(currentIntersect.object.material.color, 1, {
                    //     r: enterColor.r,
                    //     g: enterColor.g,
                    //     b: enterColor.b
                    // })
                } else {
                    enterColor = new THREE.Color('#00c4eb')
                    gsap.to(currentIntersect.object.material.color, 4, {
                        r: enterColor.r,
                        g: enterColor.g,
                        b: enterColor.b
                    })
                }
                // if(currentIntersect.object.parent.userData.url){
                //     gsap.to(currentIntersect.object.parent.scale, {
                //         x: currentIntersect.object.parent.scale.x * 1.05,
                //         y: currentIntersect.object.parent.scale.y * 1.05,
                //         z: currentIntersect.object.parent.scale.z * 1.05
                //     })
                // }
            }
            else {
                if(currentIntersect) {
                    // console.log('mouse leave')
                    if(currentIntersect.object == window.entertext){
                        enterColor = new THREE.Color('#083b00')
                        // gsap.to(currentIntersect.object.material.color, 1, {
                        //     r: enterColor.r,
                        //     g: enterColor.g,
                        //     b: enterColor.b
                        // })
                    } else {
                        enterColor = new THREE.Color('#00c4eb')
                        // gsap.to(currentIntersect.object.material.color, 1, {
                        //     r: enterColor.r,
                        //     g: enterColor.g,
                        //     b: enterColor.b
                        // })
                    }
                    // if(currentIntersect.object.parent.userData.url){
                    //     gsap.to(currentIntersect.object.parent.scale, {
                    //         x: currentIntersect.object.parent.scale.x / 1.05,
                    //         y: currentIntersect.object.parent.scale.y / 1.05,
                    //         z: currentIntersect.object.parent.scale.z / 1.05
                    //     })
                    // }
                }
                currentIntersect = null
            }
        // }

        if(!firstScene){
            // gsap.to(scene.rotation, {
            //     y: scene.rotation.y = - elapsedTime * Math.PI / 16,
            //     z: scene.rotation.z = - elapsedTime * Math.PI / 16
            // })

            // renderer.toneMappingExposure += 0.02
            clearInterval(changeBloomStrength)
        }
        uralaObject = scene.children.filter(obj => obj.name === 'urala')
        ctObject = scene.children.filter(obj => obj.name === 'cointelegraph')
        // decapObject = scene.children.filter(obj => obj.name === 'decapital')
        if(uralaObject.length > 0 && elapsedTime > 2){
            uralaObject[0].lookAt(camera.position)
            ctObject[0].lookAt(camera.position)
            // decapObject[0].lookAt(camera.position)
        }
        // const parallaxX = mouse.x * 1.5
        // const parallaxY = - mouse.y * 1.5
        // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
        // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
        // if(scene.children.length > 6){
        //     camera.lookAt(scene.children[7])
        // }
        // if(typeof coin.children != 'undefined'){
        //     coin.rotation.z = - elapsedTime * Math.PI * 0.2
        //     // coin.position.z = - elapsedTime / 6
        // }
        // matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
        // Update points only when the scene is ready
        // if(sceneReady){
        //     // Go through each point
        //     for(const point of points){
        //         // Get 2D screen position
        //         const screenPosition = point.position.clone()
        //         screenPosition.project(camera)

        //         // Set the raycaster
        //         raycaster.setFromCamera(screenPosition, camera)
        //         const intersects = raycaster.intersectObjects(scene.children, true)

        //         // // No intersect found
        //         // if(intersects.length === 0){
        //         //     // Show
        //         //     point.element.classList.add('visible')
        //         // }

        //         // // Intersect found
        //         // else {
        //         //     // Get the distance of the intersection and the distance of the point
        //         //     const intersectionDistance = intersects[0].distance
        //         //     const pointDistance = point.position.distanceTo(camera.position)

        //         //     // Intersection is close than the point
        //         //     if(intersectionDistance < pointDistance){
        //         //         // Hide
        //         //         point.element.classList.remove('visible')
        //         //     }
        //         //     // Intersection is further than the point
        //         //     else {
        //         //         // Show
        //         //         point.element.classList.add('visible')
        //         //     }
        //         // }

        //         const translateX = screenPosition.x * sizes.width * 0.5
        //         const translateY = - screenPosition.y * sizes.height * 0.5
        //         point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        //     }
        // }
        // Render
        composer.render();
        // renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}

initHome()


const initLocations = () => {
    /**
     * Loaders
     */
    // const loadingBarElement = document.querySelector('.loading-bar')

    let sceneReady = true
    const loadingManager = new THREE.LoadingManager(() => {
            // Wait a little
            // window.setTimeout(() => {
            //     // Animate overlay
            //     gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            //     // Update loadingBarElement
            //     loadingBarElement.classList.add('ended')
            //     loadingBarElement.style.transform = ''
            // }, 500)

            window.setTimeout(() => {
                sceneReady = true
                // gui.add(globe.rotation, 'x', 0.1, 2 ).min(-15).max(15).step(0.1).name('Globe Rotation x')
                // gui.add(globe.rotation, 'y', 0.1, 2 ).min(-15).max(15).step(0.1).name('Globe Rotation y')
                // gui.add(globe.rotation, 'z', 0.1, 2 ).min(-15).max(15).step(0.1).name('Globe Rotation z')
                // globe.rotation.set(locations.tokyo.rotation.x,locations.tokyo.rotation.y,locations.tokyo.rotation.z)
            }, 2000)
        },

        // Progress
        // (itemUrl, itemsLoaded, itemsTotal) => {
        //     // Calculate the progress and update the loadingBarElement
        //     const progressRatio = itemsLoaded / itemsTotal
        //     loadingBarElement.style.transform = `scaleX(${progressRatio})`
        // }
    )

    const dracoLoader = new DRACOLoader(loadingManager)
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader(loadingManager)
    gltfLoader.setDRACOLoader(dracoLoader)
    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

    /**
     * Base
     */
    // Debug
    const debugObject = {}

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

    // /**
    //  * Overlay
    //  */
    // const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    // const overlayMaterial = new THREE.ShaderMaterial({
    //     // wireframe: true,
    //     transparent: true,
    //     uniforms:
    //     {
    //         uAlpha: { value: 1 }
    //     },
    //     vertexShader: `
    //         void main()
    //         {
    //             gl_Position = vec4(position, 1.0);
    //         }
    //     `,
    //     fragmentShader: `
    //         uniform float uAlpha;

    //         void main()
    //         {
    //             gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    //         }
    //     `
    // })
    // const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    // scene.add(overlay)

    /**
     * Update all materials
     */
    // const updateAllMaterials = () => {
    //     scene.traverse((child) =>
    //     {
    //         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
    //         {
    //             // child.material.envMap = environmentMap
    //             child.material.envMapIntensity = debugObject.envMapIntensity
    //             child.material.needsUpdate = true
    //             child.castShadow = true
    //             child.receiveShadow = true
    //         }
    //     })
    // }

    /**
     * Environment map
     */
    // const environmentMap = cubeTextureLoader.load([
    //     '/textures/environmentMaps/0/px.jpg',
    //     '/textures/environmentMaps/0/nx.jpg',
    //     '/textures/environmentMaps/0/py.jpg',
    //     '/textures/environmentMaps/0/ny.jpg',
    //     '/textures/environmentMaps/0/pz.jpg',
    //     '/textures/environmentMaps/0/nz.jpg'
    // ])

    // environmentMap.encoding = THREE.sRGBEncoding

    // scene.background = environmentMap
    // scene.environment = environmentMap

    // debugObject.envMapIntensity = 2.5

    /**
     * Models
     */
    let globe = {}
    gltfLoader.load(
        '/models/earthText.glb',
        (gltf) =>
        {
            gltf.scene.scale.set(3.4, 3.4, 3.4)
            gltf.scene.rotation.set(0, 1.3, -0.4)
            globe = gltf.scene
            scene.add(globe)
        }
    )

    // const locations = {
    //     tokyo: {
    //         rotation: new THREE.Vector3(0, 1.3, -0.4)
    //     }
    // }

    /**
    // Particles
    */
    //
    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('/textures/particles/1.png')
    const particlesGeometry = new THREE.BufferGeometry()
    const count = 1000

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for(let i = 0; i < count * 3; i++){
        positions[i] = (Math.random() - 0.5) * 20
        colors[i] = Math.random()
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        map: particleTexture,
        transparent: true,
        alphaMap: particleTexture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // **
    //  * Mouse
    //  */
    // const mouse = new THREE.Vector2()
    // window.addEventListener('mousemove', (event) => {
    //     mouse.x = event.clientX / sizes.width * 2 - 1
    //     mouse.y = - (event.clientY / sizes.height) * 2 + 1
    // })

    /**
     * Raycaster
     */
    // const raycaster = new THREE.Raycaster()
    //  let currentIntersect = null
    //  const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    //  const rayDirection = new THREE.Vector3(10, 0, 0)
    //  rayDirection.normalize()
    // let objectsToTest = []
    // const intersects = raycaster.intersectObjects(objectsToTest)
    // window.addEventListener('click', () => {
    //     console.log(currentIntersect)
    //     // console.log(scene.children)
    // })

    /**
     * Lights
     */
    const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
    directionalLight.position.set(4, 1, -4)
    scene.add(directionalLight)

    // const directionalLight2 = new THREE.DirectionalLight('#ffffff', 3)
    // directionalLight2.position.set(0, -3, 4)
    // scene.add(directionalLight2)

    // const gui = new dat.GUI()
    // gui.add(points[2].position, 'x', 0.1, 2 ).min(-15).max(15).step(0.1).name('Singapore x')
    // gui.add(points[2].position, 'y', 0.1, 2 ).min(-15).max(15).step(0.1).name('Singapore y')
    // gui.add(points[2].position, 'z', 0.1, 2 ).min(-15).max(15).step(0.1).name('Singapore z')
    // gui.add(directionalLight.position, 'x', 0.1, 2 ).min(-5).max(5).step(0.01).name('Light X')
    // gui.add(directionalLight.position, 'y', 0.1, 2 ).min(-5).max(5).step(0.01).name('Light Y')
    // gui.add(directionalLight.position, 'z', 0.1, 2 ).min(-5).max(5).step(0.01).name('Light Z')
    // gui.add(directionalLight2.position, 'x', 0.1, 2 ).min(-5).max(5).step(0.01).name('Light2 X')
    // gui.add(directionalLight2.position, 'y', 0.1, 2 ).min(-5).max(5).step(0.01).name('Light2 Y')
    // gui.add(directionalLight2.position, 'z', 0.1, 2 ).min(-5).max(5).step(0.01).name('Light2 Z')

    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>
    {
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
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(4, 1, -2.5)
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.minDistance = 4.5;
    controls.maxDistance = 5.7;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    // renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 3
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    const tick = () =>
    {
        // Update controls
        controls.update()
        directionalLight.position.set(controls.object.position.x, controls.object.position.y, controls.object.position.z)

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}

// LOCATIONS
/**
 * Models
 */

// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')

// const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// // let coin = {}
// // // gltfLoader.load('/models/btc.glb', (m) => {
// // //     const coinModel = m.scene.children[0]
// // //     coinModel.scale.set(0.75, 0.75, 0.75)
// // //     // coinModel.position.x = 3
// // //     // coinModel.position.y = 1
// // //     coinModel.position.x = 1
// // //     coinModel.position.y = 2
// // //     coin = coinModel
// // //     // console.log(scene.children)
// // // })

// gltfLoader.load('/models/earthText.glb', (m) => {
//     const model = m.scene
//     // console.log(m.scene)
//     // model.scale.set(.05, .05, .05)
//     model.rotation.x += .5
//     model.position.set(0,-10,0)
//     scene.add(model)
// })


// // **
// //  * Points of interest
// //  */
// const points = [
//     {
//         position: new THREE.Vector3(-0.5, -11, 1.8),
//         element: document.querySelector('.point-0')
//     },
//     {
//         position: new THREE.Vector3(0.5, -10, 2.6),
//         element: document.querySelector('.point-1')
//     },
//     // {
//     //     position: new THREE.Vector3(1.6, - 1.3, - 0.7),
//     //     element: document.querySelector('.point-2')
//     // }
// ]
