import Experience from '../Experience.js'
import Environment from './Environment.js'
import Globe from './Globe.js'
import Diamonds from './Diamonds.js'
import Donuts from './Donuts.js'
import Spheres from './Spheres.js'
import Particles from './Particles.js'
import Text from './Text.js'
import SVG from './SVG.js'
import Plane from './Plane.js'
import UI from './UI.js'
import gsap from 'gsap'

export default class World {
    constructor(params) {
        this.createScene()
        // Wait for resources
        this.resources.on('ready', () => {
            this.intro()
            this.initHome(params)
        })
    }

    createScene() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer
        this.environment = new Environment()
    }

    intro() {
        gsap.to(this.camera, {
            fov: 75,
            duration: 2.5,
            ease: "power1.inOut",
            delay: 0.5
        })
        gsap.from(this.camera.position, {
            x: this.isMobile() ? -4 : -5,
            y: this.isMobile() ? -4 : 6,
            z: this.isMobile() ? 8.7 : 6,
            duration: 1,
            ease: "power2.inOut",
            delay: 1.5
        })
    }

    initHome(params) {
        this.particles = new Particles(params.particlesAmount)
        // this.ui = new UI()
        setTimeout(() => {
            this.diamonds = new Diamonds(params.diamondAmount)
            this.donuts = new Donuts(params.donutsAmount)
            this.spheres = new Spheres(params.spheresAmount)
        }, 1000)

        if(this.isMobile()){
            setTimeout(() => {
                this.welcome = new Text('Welcome', 0.6, '#002056', {x: 1.3, y: 3, z: -2.5})
            }, 2400)
            setTimeout(() => {
                this.to = new Text('to the', 0.4, '#bd4500', {x: 1.3, y: 2.2, z: -2.8})
            }, 2700)
            setTimeout(() => {
                this.uralaverse = new Text('URALAVERSE!', 0.6, '#7d09a7', {x: 1.7, y: 1.2, z: -2.5})
            }, 3000)
            setTimeout(() => {
                this.about = new Text('ABOUT', 0.4, '#00f208', {x: 1.2, y: -1.2, z: -2.5}, 'about')
            }, 3400)
            setTimeout(() => {
                this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 1.2, y: -2.2, z: -2.5}, 'locations')
            }, 3700)
            setTimeout(() => {
                this.contact = new Text('CONTACT', 0.4, '#bd4500', {x: 1.2, y: -3.2, z: -2.5}, 'contact')
            }, 4000)
            setTimeout(() => {
                this.work = new Text('WORK', 0.4, '#9900ff', {x: 1.2, y: -4.2, z: -2.5}, 'work')
            }, 4400)
            setTimeout(() => {
                this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 0.5, y: 4.7, z: 0}, 0.011)
            }, 5000)
            setTimeout(() => {
                this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -3.5, y: 8, z: 0}, 0.011)
            }, 4600)

        } else {
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
                this.contact = new Text('CONTACT', 0.5, '#bd4500', {x: 5, y: -2.3, z: -2.5}, 'contact')
            }, 3700)
            setTimeout(() => {
                this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 5.5, y: -1, z: -2}, 'locations')
            }, 4000)
            setTimeout(() => {
                this.work = new Text('WORK', 0.4, '#9900ff', {x: -2.4, y: -2.3, z: -2.2}, 'work')
            }, 4400)
            setTimeout(() => {
                this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 4, z: 0}, 0.015)
            }, 5000)
            setTimeout(() => {
                this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -5.8, y: 4, z: 2}, 0.015)
            }, 4600)
        }
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
        this.work.mesh.visible = true
        if(this.isMobile()){
            gsap.to(this.work.mesh.position, {
                x: 1.2,
                y: -4.2,
                z: -2.5,
                duration: 1.5,
                ease: "back.inOut(1.7)",
            })
        } else {
            gsap.to(this.work.mesh.position, {
                x: -2.4,
                y: -2.3,
                z: -2.2,
                duration: 1.5,
                ease: "back.inOut(1.7)",
            })
        }
        this.uralaLogo.model.visible = true
        this.ctLogo.model.visible = true
        this.experience.world.environment.pointLight.position.set(1, 3, 10)
        if(this.globe){
            this.globe.model.visible = false
        }
        if(this.portfolio_1){
            this.portfolio_1.mesh.visible = false
            this.portfolio_2.mesh.visible = false
            this.portfolio_3.mesh.visible = false
            this.portfolio_4.mesh.visible = false
            this.portfolio_5.mesh.visible = false
            this.portfolio_6.mesh.visible = false
        }
        this.renderer.setReinhardTone()
    }

    hideHome() {
        // this.experience.destroy()
        // this.createScene()
        // this.welcome = undefined
        this.diamonds.diamondGroup.visible = false
        this.donuts.donutGroup.visible = false
        this.spheres.sphereGroup.visible = false
        this.welcome.mesh.visible = false
        this.to.mesh.visible = false
        this.uralaverse.mesh.visible = false
        this.contact.mesh.visible = false
        this.about.mesh.visible = false
        this.locations.mesh.visible = false
        this.work.mesh.visible = false
        this.uralaLogo.model.visible = false
        this.ctLogo.model.visible = false
    }

    showWork() {
        this.hideHome()
        this.work.mesh.visible = true
        this.renderer.setNoTone()
        gsap.to(this.work.mesh.position, {
            x: -4,
            y: 4,
            z: 1,
            duration: 1.5,
            ease: "back.inOut(1.7)",
        })
        if(!this.portfolio_1){
            this.portfolio_1 = new Plane('coin360', 3, 2, {x: -3.5, y: 1.5, z: 0}, 'Coin360 - crypto heatmap website development', 'Ongoing project for Coin360 in the Banking & Financials industry for a B2C audience since 2019.')
            this.portfolio_2 = new Plane('kaplan', 3, 2, {x: 0, y: 1.5, z: 0}, 'Kaplan Singapore - Website, Content Marketing, PR', 'Project made for Kaplan Singapore in the Education industry for a B2C audience in 2021.')
            this.portfolio_3 = new Plane('nft', 3, 2, {x: 3.5, y: 1.5, z: 0}, 'Global Marketing for a Prominent NFT Project', 'Ongoing project for Global NFT Avatar Project in the Others industry for a B2C audience since 2022.')
            this.portfolio_4 = new Plane('reckitt', 3, 2, {x: -3.5, y: -1, z: 0}, 'Reckitt Benckiser - Campaign Landing Page', 'Project made for Reckitt Benckiser in the Household Products industry for a B2C audience.')
            this.portfolio_5 = new Plane('lawork', 3, 2, {x: 0, y: -1, z: 0}, 'Online recruiting website and service development', 'Ongoing project for Japanese clients in the Industrial Goods & Services industry for a B2C audience since 2022.')
            this.portfolio_6 = new Plane('coint', 3, 2, {x: 3.5, y: -1, z: 0}, 'Growth Strategy for Global Fintech Media Brands', 'Ongoing project for Cointelegraph.com & Investing.com in the Media industry for a B2C audience since 2017.')
            // blank UI required before updating
            this.ui = new UI({title: '', description: ''})
        }
        if(this.portfolio_1.mesh.visible === false) {
            this.portfolio_1.mesh.visible = true
            this.portfolio_2.mesh.visible = true
            this.portfolio_3.mesh.visible = true
            this.portfolio_4.mesh.visible = true
            this.portfolio_5.mesh.visible = true
            this.portfolio_6.mesh.visible = true
        }
    }

    resetWork() {
        //for
        this.portfolio_1.mesh.position.set(this.portfolio_1.mesh.userData.position.x, this.portfolio_1.mesh.userData.position.y, this.portfolio_1.mesh.userData.position.z)
        this.portfolio_1.mesh.scale.set(1,1,1)
        this.portfolio_2.mesh.position.set(this.portfolio_2.mesh.userData.position.x, this.portfolio_2.mesh.userData.position.y, this.portfolio_2.mesh.userData.position.z)
        this.portfolio_2.mesh.scale.set(1,1,1)
        this.portfolio_3.mesh.position.set(this.portfolio_3.mesh.userData.position.x, this.portfolio_3.mesh.userData.position.y, this.portfolio_3.mesh.userData.position.z)
        this.portfolio_3.mesh.scale.set(1,1,1)
        this.portfolio_4.mesh.position.set(this.portfolio_4.mesh.userData.position.x, this.portfolio_4.mesh.userData.position.y, this.portfolio_4.mesh.userData.position.z)
        this.portfolio_4.mesh.scale.set(1,1,1)
        this.portfolio_5.mesh.position.set(this.portfolio_5.mesh.userData.position.x, this.portfolio_5.mesh.userData.position.y, this.portfolio_5.mesh.userData.position.z)
        this.portfolio_5.mesh.scale.set(1,1,1)
        this.portfolio_6.mesh.position.set(this.portfolio_6.mesh.userData.position.x, this.portfolio_6.mesh.userData.position.y, this.portfolio_6.mesh.userData.position.z)
        this.portfolio_6.mesh.scale.set(1,1,1)
    }

    showLocations() {
        this.hideHome()
        this.globe = new Globe()
        this.globe.model.visible = true
        this.lightFollowControls()
    }

    lightFollowControls() {
        let controlsPosition = this.experience.camera.controls.object.position
        this.experience.world.environment.pointLight.position.set(controlsPosition.x, controlsPosition.y, controlsPosition.z)
    }

    isMobile() {
        if(window.innerWidth < 426) {
            return true
        } else {
            return false
        }
    }

    update() {
        if(this.globe && this.globe.model.visible === true){
            this.lightFollowControls()
        }
        if(this.ui) {
            this.ui.update()
        }
        if(this.portfolio_1) {
            this.portfolio_1.update()
            this.portfolio_2.update()
            this.portfolio_3.update()
            this.portfolio_4.update()
            this.portfolio_5.update()
            this.portfolio_6.update()
        }
    }
}