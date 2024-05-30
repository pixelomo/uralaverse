import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Globe {

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
		this.resource = this.resources.items.globe
		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.scale.set(3.4, 3.4, 3.4)
		this.model.position.set(0,-10,0)
		this.model.name = 'globe'
		// this.model.position.set(0, -5, 0)
        // this.model.rotation.set(0, 1.3, -0.4)
		// this.raycaster.objectsToTest.push(this.model)
		// this.setLocationsToTest(this.model)
		this.raycaster.objectsToTest.push(this.model)
		// this.setAddresses(this.model)
		this.scene.add(this.model)
		// console.log(this.model)
		// console.log(this.experience.world.environment.pointLight)
	}

	// setAddresses(model){
	// 	console.log(model.children)
	// 	const locations = ['Tokyo', 'London', 'Jakarta', 'Ho Chi Minh']
	// 	for(let i = 0; i < model.children.length; i++){
	// 		if(model.children[i].name.includes('Tokyo')){
	// 			console.log(model.children[i])
	// 			model.children[i].userData.address = ''
	// 		}
	// 	}
	// }
	// setLocationsToTest(model) {


	// 	// this.raycaster.objectsToTest.push(this.mesh)
	// }

	// setAnimation() {
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
	// }

	update() {

        // directionalLight.position.set(controls.object.position.x, controls.object.position.y, controls.object.position.z)

		// this.animation.mixer.update(this.time.delta * 0.001)
	}
}

// const locations = {
//     tokyo: {
//         rotation: new THREE.Vector3(0, 1.3, -0.4)
//     }
// }

