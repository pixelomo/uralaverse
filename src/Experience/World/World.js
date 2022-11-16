import Experience from '../Experience.js'
import Environment from './Environment.js'
import Globe from './Globe.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            // this.floor = new Floor()
            this.globe = new Globe()
            this.environment = new Environment()

            //Welcome Text
            // fontMaker('WELCOME', mainFont, 0.9, {x: 1, y: 2.4, z: -2.5},  '#002056', 'welcome', false)
            // fontMaker('TO THE', mainFont, 0.6, {x: 1, y: 1.4, z: -2.8},  '#bd4500', 'to', false)
            // fontMaker('URALAVERSE!', mainFont, 1, {x: 1, y: 0.2, z: -2.5},  '#7d09a7', 'uralaverse', false)
            // fontMaker('CONTACT', mainFont, 0.5, {x: 0, y: -3, z: -2.5},  '#bd4500', 'contact', false)
            // fontMaker('ABOUT', mainFont, 0.4, {x: -3, y: -2, z: -2},  '#00f208', 'about', false)
            // fontMaker('LOCATIONS', mainFont, 0.4, {x: 3.2, y: -2.2, z: -2},  '#002056', 'locations', false)
        })
    }

    update() {
        if(this.fox)
            this.fox.update()
    }
}