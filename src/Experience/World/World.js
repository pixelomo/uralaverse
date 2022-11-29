import Experience from '../Experience.js'
import Environment from './Environment.js'
import Globe from './Globe.js'
import Diamonds from './Diamonds.js'
import Donuts from './Donuts.js'
import Spheres from './Spheres.js'
import Particles from './Particles.js'
import Text from './Text.js'
import SVG from './SVG.js'
// import UI from './UI.js'
import gsap from 'gsap'

export default class World {
    constructor(params) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance

        // Wait for resources
        this.resources.on('ready', () => {
            this.intro()
            this.initHome(params)
            // fov 180 - 80
        })
    }

    intro() {
        gsap.to(this.camera, {
            fov: 75,
            duration: 2.5,
            ease: "power1.inOut",
            delay: 0.5
        })
        gsap.from(this.camera.position, {
            x: -5,
            y: 6,
            z: 6,
            duration: 1,
            ease: "power2.inOut",
            delay: 1.5
        })
    }

    initHome(params) {
        this.particles = new Particles(params.particlesAmount)
        this.environment = new Environment()
        // this.ui = new UI()
        setTimeout(() => {
            this.diamonds = new Diamonds(params.diamondAmount)
            this.donuts = new Donuts(params.donutsAmount)
            this.spheres = new Spheres(params.spheresAmount)
        }, 1000)
        setTimeout(() => {
            this.welcome = new Text('Welcome', 0.9, '#002056', {x: 1, y: 3.5, z: -2.5})
        }, 2400)
        setTimeout(() => {
            this.to = new Text('to the', 0.6, '#bd4500', {x: 1, y: 2.4, z: -2.8})
        }, 2700)
        setTimeout(() => {
            this.uralaverse = new Text('URALAVERSE!', 0.9, '#7d09a7', {x: 2, y: 1, z: -2.5})
        }, 3000)
        setTimeout(() => {
            this.about = new Text('ABOUT', 0.4, '#00f208', {x: -3, y: -1, z: -2}, 'about')
        }, 3400)
        setTimeout(() => {
            this.contact = new Text('CONTACT', 0.5, '#bd4500', {x: 1, y: -2, z: -2.5}, 'contact')
        }, 3700)
        setTimeout(() => {
            this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 5.5, y: -1, z: -2}, 'locations')
        }, 4000)
        setTimeout(() => {
            this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 4, z: 0}, 0.015)
        }, 5000)
        setTimeout(() => {
            this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -5.8, y: 4, z: 2}, 0.015)
        }, 4600)
        // his.globe = new Globe()
        // this.globe.model.visible = false
    }

    showHome() {
        this.diamonds.diamondGroup.visible = true
        this.donuts.donutGroup.visible = true
        this.spheres.sphereGroup.visible = true
        this.welcome.mesh.visible = true
        this.to.mesh.visible = true
        this.uralaverse.mesh.visible = true
        this.contact.mesh.visible = true
        this.about.mesh.visible = true
        this.locations.mesh.visible = true
        this.uralaLogo.model.visible = true
        this.ctLogo.model.visible = true
        this.experience.world.environment.pointLight.position.set(1, 3, 10)
        if(this.globe){
            this.globe.model.visible = false
        }
    }

    hideHome() {
        this.diamonds.diamondGroup.visible = false
        this.donuts.donutGroup.visible = false
        this.spheres.sphereGroup.visible = false
        this.welcome.mesh.visible = false
        this.to.mesh.visible = false
        this.uralaverse.mesh.visible = false
        this.contact.mesh.visible = false
        this.about.mesh.visible = false
        this.locations.mesh.visible = false
        this.uralaLogo.model.visible = false
        this.ctLogo.model.visible = false
    }

    showLocations() {
        this.globe = new Globe()
        this.globe.model.visible = true
        this.hideHome()
        this.lightFollowControls()
    }

    lightFollowControls() {
        let controlsPosition = this.experience.camera.controls.object.position
        this.experience.world.environment.pointLight.position.set(controlsPosition.x, controlsPosition.y, controlsPosition.z)
    }

    update() {
        if(this.globe && this.globe.model.visible === true){
            this.lightFollowControls()
        }
        if(this.ui)
            this.ui.update()
    }
}