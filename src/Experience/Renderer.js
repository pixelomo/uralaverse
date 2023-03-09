import * as THREE from 'three'
import Experience from './Experience.js'

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

let params = {
    bloomThreshold: 1.3,
    bloomStrength: 1.6,
    bloomRadius: 3,
    bloomLimit: 1.5, // 1.5
    up: true
}

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            // antialias: true
        })
        this.composer = new EffectComposer( this.instance )
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.composer.setSize(this.sizes.width, this.sizes.height)
        // this.instance.physicallyCorrectLights = true
        // this.instance.outputEncoding = THREE.sRGBEncoding
        this.setReinhardTone()
        // this.instance.shadowMap.enabled = true
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#011020')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.instance.setClearColor( 0x000000, 0.0)
        const renderScene = new RenderPass(this.scene, this.camera.instance)
        const bloomPass = new UnrealBloomPass( new THREE.Vector2(this.sizes.width, this.sizes.height), params.bloomStrength, params.bloomRadius, params.bloomThreshold)
        if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('bloom')
            this.debugFolder.add(bloomPass, 'strength').min(0).max(2).step(0.001)
            this.debugFolder.add(bloomPass, 'radius').min(0).max(2).step(0.001)
            this.debugFolder.add(bloomPass, 'threshold').min(0).max(1).step(0.001)
		}
        this.composer.addPass( renderScene )
        this.composer.addPass( bloomPass )
        this.changeBloomStrength = setInterval(this.checkBloomStrength, 24);
    }

    checkBloomStrength = () => {
        console.log(limit)
        if (paramsup == true && bloomPass.strength <= params.bloomLimit) {
            bloomPass.strength += 0.0035
            if (bloomPass.strength == params.bloomLimit) {
                params.up = false;
            }
        } else {
            params.Mathup = false
            bloomPass.strength -= 0.006
            if (bloomPass.strength == 0.01 || bloomPass.strength < 0.01) {
                params.up = true;
            }
        }
    }

    setReinhardTone() {
        this.composer.toneMapping = THREE.ReinhardToneMapping
        this.composer.toneMappingExposure = 15
        // = 15
    }

    setNoTone() {
        this.composer.toneMapping = THREE.NoToneMapping
        this.composer.toneMappingExposure = 1.6
    }

    resize() {
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update() {
        // this.instance.render(this.scene, this.camera.instance)
        this.composer.render();
        clearInterval(this.changeBloomStrength)
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

    // let up = true;
    // let limit = params.bloomLimit;
    // const checkBloomStrength = () => {
    //     if (up == true && bloomPass.strength <= limit) {
    //         bloomPass.strength += 0.0035
    //         if (bloomPass.strength == limit) {
    //             up = false;
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

    // tick
    // if(!firstScene){
    //     clearInterval(changeBloomStrength)
    // }

