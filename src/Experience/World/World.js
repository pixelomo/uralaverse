import Experience from '../Experience.js'
import Environment from './Environment.js'
import Globe from './Globe.js'
import Diamonds from './Diamonds.js'
import Donuts from './Donuts.js'
import Spheres from './Spheres.js'
import Particles from './Particles.js'
import Text from './Text.js'
import SVG from './SVG.js'

export default class World {
    constructor(params) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            this.initHome(params)
        })
    }

    // intro() {
    //     this.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
    // }

    initHome(params) {
        this.particles = new Particles(params.particlesAmount)
        this.environment = new Environment()
        this.diamonds = new Diamonds(params.diamondAmount)
        this.donuts = new Donuts(params.donutsAmount)
        this.spheres = new Spheres(params.spheresAmount)
        this.welcome = new Text('Welcome', 0.9, '#002056', {x: 1, y: 2.5, z: -2.5})
        this.to = new Text('to the', 0.6, '#bd4500', {x: 1, y: 1.4, z: -2.8})
        this.uralaverse = new Text('URALAVERSE!', 0.9, '#7d09a7', {x: 1, y: 0.2, z: -2.5})
        this.contact = new Text('CONTACT', 0.5, '#bd4500', {x: 0, y: -3, z: -2.5}, 'contact')
        this.about = new Text('ABOUT', 0.4, '#00f208', {x: -3, y: -2, z: -2}, 'about')
        this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 3.4, y: -2, z: -2}, 'locations')
        this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 3, z: 0}, 0.015)
        this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -5.5, y: 4, z: -.5}, 0.015)
        // this.globe = new Globe()
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
        // if(this.fox)
        //     this.fox.update()
    }
}