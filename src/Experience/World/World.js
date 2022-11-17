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
            this.diamonds = new Diamonds(params.diamondAmount)
            this.donuts = new Donuts(params.donutsAmount)
            this.spheres = new Spheres(params.spheresAmount)
            this.particles = new Particles(params.particlesAmount)
            this.environment = new Environment()
            this.welcome = new Text('WELCOME', 0.9, '#002056', {x: 1, y: 2.4, z: -2.5})
            this.to = new Text('TO THE', 0.6, '#bd4500', {x: 1, y: 1.4, z: -2.8})
            this.uralaverse = new Text('URALAVERSE', 0.9, '#7d09a7', {x: 1, y: 0.2, z: -2.5})
            this.contact = new Text('CONTACT', 0.5, '#bd4500', {x: 0, y: -3, z: -2.5}, 'contact')
            this.about = new Text('ABOUT', 0.4, '#00f208', {x: -3, y: -2, z: -2}, 'about')
            this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 3.2, y: -2.2, z: -2}, 'locations')
            this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 3, z: 0}, 0.015)
            this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -5.5, y: 4, z: -.5}, 0.015)
        })
    }

    showLocations() {
        this.globe = new Globe()
        this.environment = new Environment()
    }

    update() {
        // if(this.fox)
        //     this.fox.update()
    }
}