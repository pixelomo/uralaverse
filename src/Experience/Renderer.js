import * as THREE from 'three'
import Experience from './Experience.js'

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
        // composer.render();
    }
}



    /**
     * Renderer
     */
    //  const renderer = new THREE.WebGLRenderer({
    //     canvas: canvas
    // })
    // renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // renderer.setClearColor( 0x000000, 0.0 );
    // renderer.toneMapping = THREE.ReinhardToneMapping;
    // renderer.toneMappingExposure += 5

    // const renderScene = new RenderPass( scene, camera );

    // const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    // bloomPass.threshold = params.bloomThreshold;
    // bloomPass.strength = params.bloomStrength;
    // bloomPass.radius = params.bloomRadius;

    // let composer = new EffectComposer( renderer )
    // composer.addPass( renderScene )
    // composer.addPass( bloomPass )

    //

    // let up = true;
    // let limit = params.bloomLimit;
    // const checkBloomStrength = () => {
    //     if (up == true && bloomPass.strength <= limit) {
    //         bloomPass.strength += 0.0035
    //         if (bloomPass.strength == limit) {
    //         up = false;
    //         }
    //     } else {
    //         up = false
    //         bloomPass.strength -= 0.006
    //         if (bloomPass.strength == 0.01 || bloomPass.strength < 0.01) {
    //             up = true;
    //         }
    //     }
    // }
    // let changeBloomStrength = setInterval(checkBloomStrength, 24);


    // // tick
    // if(!firstScene){
    //     clearInterval(changeBloomStrength)
    // }




    // tick

    // Cast a ray from the mouse and handle events
    // raycaster.setFromCamera(mouse, camera)

    // const intersects = raycaster.intersectObjects(objectsToTest)

    // if(intersects.length) {
    //     if(!currentIntersect) {
    //         // console.log('mouse enter')
    //     }
    //     currentIntersect = intersects[0]
    //     if(currentIntersect.object == window.entertext){
    //         enterColor = new THREE.Color('#002034')
    //     } else {
    //         enterColor = new THREE.Color('#00c4eb')
    //         gsap.to(currentIntersect.object.material.color, 4, {
    //             r: enterColor.r,
    //             g: enterColor.g,
    //             b: enterColor.b
    //         })
    //     }
    // }
    // else {
    //     if(currentIntersect) {
    //         // console.log('mouse leave')
    //         if(currentIntersect.object == window.entertext){
    //             enterColor = new THREE.Color('#083b00')
    //         } else {
    //             enterColor = new THREE.Color('#00c4eb')
    //         }
    //     }
    //     currentIntersect = null
    // }