import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        // Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera')
		}

        this.setInstance()
        this.setControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(180, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(-2.5, -3, 6)
        this.scene.add(this.instance)
        if(this.debug.active) {
            this.debugFolder.add(this.instance, 'fov').name('fov').min(-150).max(200).step(0.1).onChange(() =>{this.instance.updateProjectionMatrix()})
            this.debugFolder.add(this.instance.position, 'x').name('x').min(-125).max(125).step(0.1)
            this.debugFolder.add(this.instance.position, 'y').name('y').min(-125).max(125).step(0.1)
            this.debugFolder.add(this.instance.position, 'z').name('z').min(-125).max(125).step(0.1)
            this.debugFolder.add(this.instance.rotation, 'x').name('x rotation').min(-125).max(125).step(0.1)
            this.debugFolder.add(this.instance.rotation, 'y').name('y rotation').min(-125).max(125).step(0.1)
            this.debugFolder.add(this.instance.rotation, 'z').name('z rotation').min(-125).max(125).step(0.1)
        }
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.enableZoom = false
        this.controls.minDistance = 1
        this.controls.maxDistance = 10
    }

    enableControls() {
        this.controls.enabled = true
    }

    disableControls() {
        this.controls.enabled = false
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if(this.controls.enabled){
            this.controls.update()
        }
        // if(this.controlsEnabled){
        //     this.controls.update()
        //     this.controls.enabled = true
        //     this.controls.rotate = true
        // } else {
        //     this.controls.enabled = false
        //     this.controls.rotate = false
        // }
        this.instance.updateProjectionMatrix()
  }
}