import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Globe from './Globe.js'
// import Doge from './Doge.js'
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
        // Debug
        this.debug = this.experience.debug
		// if (this.debug.active) {
		// 	this.debugFolder = this.debug.ui.addFolder('world')
		// }
    }

    createScene() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer
        this.environment = new Environment()
        this.ui = new UI({title: '', description: ''})
        this.ui.container.position.set(0,30,0)
    }

    intro() {
        gsap.to(this.camera, {
            fov: 75,
            duration: 1.2,
            ease: "power1.inOut",
            // delay: 0.5
        })
        gsap.from(this.camera.position, {
            x: this.isMobile() ? -4 : -5,
            y: this.isMobile() ? -4 : 6,
            z: this.isMobile() ? 8.7 : 6,
            duration: 1,
            ease: "power2.inOut",
            delay: 0.2
        })
    }

    initHome(params) {
        this.particles = new Particles(params.particlesAmount)
        setTimeout(() => {
            this.diamonds = new Diamonds(params.diamondAmount)
            this.donuts = new Donuts(params.donutsAmount)
            this.spheres = new Spheres(params.spheresAmount)
        }, 500)

        let tl = gsap.timeline();
        if (this.isMobile()) {
            tl.to(this, {
                onComplete: () => {
                    this.welcome = new Text('Welcome', 0.6, '#002056', {x: 1.3, y: 3, z: -2.5});
                    this.to = new Text('to the', 0.4, '#bd4500', {x: 1.3, y: 2.2, z: -2.8});
                    this.uralaverse = new Text('URALAVERSE!', 0.6, '#520004', {x: 1.7, y: 1.2, z: -2.5});
                    this.about = new Text('ABOUT', 0.4, '#00ff11', {x: 1.2, y: -1.2, z: -2.5}, 'about');
                    this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 1.2, y: -2.2, z: -2.5}, 'locations');
                    this.contact = new Text('CONTACT', 0.4, '#bd4500', {x: 1.2, y: -3.2, z: -2.5}, 'contact');
                    this.work = new Text('WORK', 0.4, '#180052', {x: 1.2, y: -4.2, z: -2.5}, 'work');
                },
                delay: 1
            })
            .to(this, {
                onComplete: () => {
                    this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 0.5, y: 4.7, z: 0}, 0.0037);
                    this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -3.5, y: 8, z: 0}, 0.011);
                },
                delay: 0.2
            });
        } else {
            tl.to(this, {
                onComplete: () => {
                    this.welcome = new Text('Welcome', 0.9, '#002056', {x: 1, y: 3.5, z: -2.5});
                    this.to = new Text('to the', 0.6, '#bd4500', {x: 1, y: 2.4, z: -2.8});
                    this.uralaverse = new Text('URALAVERSE!', 0.9, '#520004', {x: 2, y: 1, z: -2.5});
                    if (this.debug.active) {
                        this.debug.ui.addColor(this.uralaverse.material, 'color').onChange((value) => {
                            this.uralaverse.material = value;
                        });
                    }
                    this.about = new Text('ABOUT', 0.4, '#00ff11', {x: -3, y: -1, z: -2}, 'about');
                    this.contact = new Text('CONTACT', 0.5, '#bd4500', {x: 5, y: -2.3, z: -2.5}, 'contact');
                    this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 5.5, y: -1, z: -2}, 'locations');
                    this.work = new Text('WORK', 0.4, '#180052', {x: -2.4, y: -2.3, z: -2.2}, 'work');
                },
                delay: 1
            })
            .to(this, {
                onComplete: () => {
                    this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 4, z: 0}, 0.005);
                    this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -5.8, y: 4, z: 2}, 0.015);
                },
                delay: 0.2
            });
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
            gsap.to(this.globe.model.position, {
                x: 0,
                y: -10,
                z: 0,
                duration: 1.5,
            })
            setTimeout(() => {
                this.globe.model.visible = false
            }, 2000)
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
        this.color = new THREE.Color('#00c4eb')
        gsap.to(this.work.material.color, 0.5, {
            r: this.color.r,
            g: this.color.g,
            b: this.color.b
        })
        if(this.isMobile()){
            gsap.to(this.work.mesh.position, {
                x: -2,
                y: 6,
                z: 1,
                duration: 1.5,
                ease: "back.inOut(1.7)",
            })
        } else {
            gsap.to(this.work.mesh.position, {
                x: -4,
                y: 4,
                z: 1,
                duration: 1.5,
                ease: "back.inOut(1.7)",
            })
        }
        if(!this.portfolio_1){
            this.portfolio_1 = new Plane(
                'loreal',
                3,
                2,
                {x: -3.5, y: 1.5, z: 0},
                "L'oreal Philippines – Maybelline Compact Powder",
                "TikTok series for L'oreal Philippines, showcasing Fit Me Compact Powder. Creative CGI traces the product's journey from Manila airport to the event, building anticipation for the All Star ambassador announcement.",
                {x: -1.5, y: 5, z: 0}, this.isMobile()
            )
            this.portfolio_2 = new Plane(
                'kaplan',
                3,
                2,
                {x: 0, y: 1.5, z: 0},
                'Kaplan Singapore - Website, Content Marketing, PR',
                'Project made for Kaplan Singapore in the Education industry for a B2C audience in 2021.',
                 {x: 2, y: 5, z: 0}, this.isMobile()
            )
            this.portfolio_3 = new Plane(
                'coin360',
                3,
                2,
                {x: 3.5, y: 1.5, z: 0},
                'Coin360 - crypto heatmap website development',
                'Ongoing project for Coin360 in the Banking & Financials industry for a B2C audience since 2019.',
                {x: -1.5, y: 2, z: 0}, this.isMobile()
            )
            this.portfolio_4 = new Plane(
                'reckitt',
                3,
                2,
                {x: -3.5, y: -1, z: 0},
                'Reckitt Benckiser - Campaign Landing Page',
                'Project made for Reckitt Benckiser in the Household Products industry for a B2C audience.',
                 {x: 2, y: 2, z: 0}, this.isMobile()
            )
            this.portfolio_5 = new Plane(
                'lawork',
                3,
                2,
                {x: 0, y: -1, z: 0},
                'Online recruiting website and service development',
                'Ongoing project for Japanese clients in the Industrial Goods & Services industry for a B2C audience since 2022.',
                {x: -1.5, y: -1, z: 0}, this.isMobile()
            )
            this.portfolio_6 = new Plane(
                'coint',
                3,
                2,
                {x: 3.5, y: -1, z: 0},
                'Growth Strategy for Global Fintech Media Brands',
                'Ongoing project for Cointelegraph.com & Investing.com in the Media industry for a B2C audience since 2017.',
                {x: 2, y: -1, z: 0}, this.isMobile()
            )
            // if(this.isMobile()){
                // rotate work circle idea \_/
                // heatmap
                // this.portfolio_1.mesh.position.set(0,0,0)
                // // kaplan
                // this.portfolio_2.mesh.position.set(3,0,1)
                // this.portfolio_2.mesh.rotation.set(0,7,0)
                // // NFT
                // this.portfolio_3.mesh.position.set(6,0,2)
                // this.portfolio_3.mesh.rotation.set(0,9,0)
                // // reckitt
                // this.portfolio_4.mesh.position.set(0,0,6)
                // this.portfolio_4.mesh.rotation.set(0,11,0)
                // // lala
                // this.portfolio_5.mesh.position.set(-5,0,2)
                // this.portfolio_5.mesh.rotation.set(0,-9,0)
                // // CT
                // this.portfolio_6.mesh.position.set(-3,0,1)
                // this.portfolio_6.mesh.rotation.set(0,-7,0)
            // }
            // blank UI required before updating
            // this.ui = new UI({title: '', description: ''})
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
        const portfolios = [this.portfolio_1, this.portfolio_2, this.portfolio_3, this.portfolio_4, this.portfolio_5, this.portfolio_6];

        for (const portfolio of portfolios) {
            if (typeof portfolio !== 'undefined') {
                if (this.isMobile()) {
                    portfolio.mesh.position.set(portfolio.mesh.userData.mobilePosition.x, portfolio.mesh.userData.mobilePosition.y, portfolio.mesh.userData.mobilePosition.z);
                } else {
                    portfolio.mesh.position.set(portfolio.mesh.userData.position.x, portfolio.mesh.userData.position.y, portfolio.mesh.userData.position.z);
                }

                portfolio.mesh.scale.set(1, 1, 1);
            }
        }
    }


    showLocations() {
        this.hideHome()
        if(typeof this.globe === 'undefined'){
            this.globe = new Globe()
            // this.maskPanel = new SVG('maskPanel', '', {x: -16.7, y: 8.2, z: 7}, 0.025)
            // this.maskPanel.model.rotation.set(0,0.4,0)
            // // this.maskPanel.model.material.opacity = 1
            // console.log(this.maskPanel.model)
            // if(this.debug.active) {
            //     this.debugFolder.add(this.maskPanel.model.position, 'x').name('mask x').min(-30).max(18).step(0.1)
            //     this.debugFolder.add(this.maskPanel.model.position, 'y').name('mask y').min(-30).max(18).step(0.1)
            //     this.debugFolder.add(this.maskPanel.model.position, 'z').name('mask z').min(-30).max(18).step(0.1)
            //     this.debugFolder.add(this.maskPanel.model.rotation, 'x').name('rotation x').min(-18).max(18).step(0.1)
            //     this.debugFolder.add(this.maskPanel.model.rotation, 'y').name('rotation y').min(-18).max(18).step(0.1)
            //     this.debugFolder.add(this.maskPanel.model.rotation, 'z').name('rotation z').min(-18).max(18).step(0.1)
            //     this.debugFolder.add(this.maskPanel.model.scale, 'x').name('scale x').min(-1).max(1).step(0.001)
            //     this.debugFolder.add(this.maskPanel.model.scale, 'y').name('scale y').min(-1).max(1).step(0.001)
            //     this.debugFolder.add(this.maskPanel.model.scale, 'z').name('scale z').min(-1).max(1).step(0.001)
            // }
        }
        this.globe.model.visible = true
        gsap.to(this.globe.model.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
        })
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
        // if(this.doge) {
        //     this.doge.update()
        // }
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