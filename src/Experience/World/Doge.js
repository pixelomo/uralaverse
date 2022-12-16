import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Doge {

	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.debug = this.experience.debug
		this.raycaster = this.experience.raycaster
		// Debug
		// if (this.debug.active) {
		// 	this.debugFolder = this.debug.ui.addFolder('fox')
		// }
		// Resource
		this.resource = this.resources.items.doge
		// this.resource = this.resources.items.globe
		this.setModel()
		this.setAnimation()
		this.sizes = this.experience.sizes
		this.cursor = {}
		this.cursor.x = 0
		this.cursor.y = 0
		// document.documentElement.style.cursor = 'none';
		window.addEventListener('mousemove', (event) => {
			this.cursor.x = event.clientX / this.sizes.width - 0.5
			this.cursor.y = event.clientY / this.sizes.height - 0.5
		})
	}

	setModel() {
		this.model = this.resource.scene
		this.model.scale.set(1, 1, 1)
		this.model.name = 'doge'
		// this.model.position.set(-2.2, -2.8, 4.7)
		// this.model.position.set(0, 3, 0)
		// this.model.position.set(3, 3, 2)
		// this.raycaster.objectsToTest.push(this.model)
		this.scene.add(this.model)
		// console.log(this.experience.world.environment.pointLight)
	}

	setAnimation() {
		gsap.from(this.model.rotation, {
            x: Math.PI * 2,
            z: Math.PI * 2,
            duration: 12,
            yoyo: true,
            repeat: -1,
            ease: "back.inOut(1.1)",
        })
		// gsap.from(this.model.position, {
        //     z: Math.cos(11),
        //     y: Math.sin(5),
        //     duration: 10,
        //     yoyo: true,
        //     repeat: -1,
        //     ease: "back.inOut(1.4)",
        // })
	// 	this.animation = {}
	// 	// Mixer
	// 	this.animation.mixer = new THREE.AnimationMixer(this.model)
	// 	// Actions
	// 	this.animation.actions = {}
	// 	this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
	// 	this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
	// 	this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
	// 	this.animation.actions.current = this.animation.actions.idle
	// 	this.animation.actions.current.play()
	// 	// Play the action
	// 	this.animation.play = (name) => {
	// 		const newAction = this.animation.actions[name]
	// 		const oldAction = this.animation.actions.current
	// 		newAction.reset()
	// 		newAction.play()
	// 		newAction.crossFadeFrom(oldAction, 1)
	// 		this.animation.actions.current = newAction
	// 	}
	// 	// Debug
	// 	if (this.debug.active) {
	// 		const debugObject = {
	// 			playIdle: () => {
	// 				this.animation.play('idle')
	// 			},
	// 			playWalking: () => {
	// 				this.animation.play('walking')
	// 			},
	// 			playRunning: () => {
	// 				this.animation.play('running')
	// 			}
	// 		}
	// 		this.debugFolder.add(debugObject, 'playIdle')
	// 		this.debugFolder.add(debugObject, 'playWalking')
	// 		this.debugFolder.add(debugObject, 'playRunning')
	// 	}
	}

	update() {
		gsap.from(this.model.position, {
            x: this.cursor.x * 20,
            y: - this.cursor.y * 10
        })
		// this.model.position.x = this.cursor.x * 20
		// this.model.position.y = - this.cursor.y * 10
        // directionalLight.position.set(controls.object.position.x, controls.object.position.y, controls.object.position.z)
		// this.animation.mixer.update(this.time.delta * 0.001)
	}
}

