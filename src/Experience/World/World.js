import { Color } from 'three'
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
// import Plane from './Plane.js'
// import UI from './UI.js'
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
                    this.welcome = new Text('Welcome', 0.6, '#002056', {x: 1.3, y: 6, z: -2.5});
                    this.to = new Text('to the', 0.4, '#bd4500', {x: 1.3, y: 5.2, z: -2.8});
                    this.uralaverse = new Text('URALAVERSE!', 0.5, '#520004', {x: 1.5, y: 4.2, z: -2.5});
                    this.about = new Text('ABOUT', 0.4, '#00ff11', {x: 1.2, y: 2.2, z: -2.5}, 'about');
                    this.aboutJP = new SVG('aboutJP', '', {x: 1.2, y: 1.7, z: -2}, 0.001);
                    this.contact = new Text('CONTACT', 0.4, '#bd4500', {x: 1.2, y: 0.2, z: -2.5}, 'contact');
                    this.contactJP = new SVG('contactJP', '', {x: 1.2, y: -0.3, z: -2}, 0.001);
                    this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 1.2, y: -1.7, z: -2.5}, 'locations');
                    this.locationsJP = new SVG('locationsJP', '', {x: 1.2, y: -2, z: -1.7}, 0.001);
                    this.work = new Text('WORK', 0.4, '#180052', {x: 1.2, y: -3.5, z: -2.5}, 'work');
                    this.workJP = new SVG('workJP', '', {x: 1.2, y: -3.7, z: -2.3}, 0.001);
                },
                delay: 1
            })
            .to(this, {
                onComplete: () => {
                    this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: -0.3, y: 8.2, z: 0}, 0.0037);
                    // this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -3.2, y: 9, z: 0}, 0.011);
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
                    this.aboutJP = new SVG('aboutJP', '', {x: -3, y: -1.2, z: -2.2}, 0.001);
                    this.contact = new Text('CONTACT', 0.5, '#bd4500', {x: 5, y: -2.3, z: -2.5}, 'contact');
                    this.contactJP = new SVG('contactJP', '', {x: 5.6, y: -2.65, z: -2.7}, 0.001);
                    this.locations = new Text('LOCATIONS', 0.4, '#002056', {x: 5.5, y: -1, z: -2}, 'locations');
                    this.locationsJP = new SVG('locationsJP', '', {x: 5.9, y: -1.3, z: -2.2}, 0.001);
                    this.locationsJP.model.rotation.x = 0.33;
                    this.work = new Text('WORK', 0.4, '#180052', {x: -2.4, y: -2.3, z: -2.2}, 'work');
                    this.workJP = new SVG('workJP', '', {x: -2.4, y: -2.5, z: -2.4}, 0.001);
                },
                delay: 1
            })
            .to(this, {
                onComplete: () => {
                    this.uralaLogo = new SVG('uralaLogo', 'https://www.sortlist.com/agency/urala-communications', {x: 3, y: 4, z: 0}, 0.005);
                    // this.ctLogo = new SVG('ctLogo', 'https://jp.cointelegraph.com/', {x: -5.8, y: 4, z: 2}, 0.015);
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
        this.contactJP.model.visible = true
        this.aboutJP.model.visible = true
        this.locationsJP.model.visible = true
        this.workJP.model.visible = true
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
        // this.ctLogo.model.visible = true
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
        this.renderer.setReinhardTone()
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
        this.work.mesh.visible = false
        this.contactJP.model.visible = false
        this.aboutJP.model.visible = false
        this.locationsJP.model.visible = false
        this.workJP.model.visible = false
        this.uralaLogo.model.visible = false
        // this.ctLogo.model.visible = false
    }

    showWork() {
        // this.hideHome()
        this.loadWork();
        this.work.mesh.visible = true
        // this.renderer.setNoTone()
        this.color = new Color('#00c4eb')
        gsap.to(this.work.material.color, 0.5, {
            r: this.color.r,
            g: this.color.g,
            b: this.color.b
        })
        if(this.isMobile()){
            gsap.to(this.work.mesh.position, {
                x: -6,
                y: 8,
                z: 1,
                duration: 1.5,
                ease: "back.inOut(1.3)",
            });
        } else {
            gsap.to(this.work.mesh.position, {
                x: -6,
                y: 8,
                z: 1,
                duration: 1.5,
                ease: "back.inOut(1.3)",
            })
        }
        gsap.to(this.work.mesh.rotation, {
            x: 0,
            y: 1,
            z: 0,
            duration: 1.5,
            ease: "back.inOut(1.3)",
        })
    }

    loadWork() {
        let iframe = document.createElement('iframe');
        iframe.src = "https://uralverse-work-6o7d.vercel.app/";

        // Append the iframe immediately but keep it invisible
        document.getElementById('workFrame').appendChild(iframe);

        // Set timeout to change visibility after 1.5 seconds
        setTimeout(() => {
            iframe.style.visibility = 'visible';
            iframe.style.opacity = 1;
        }, 1400);
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
        if(window.innerWidth < 431) {
            return true
        } else {
            return false
        }
    }

    update() {
        if(this.globe && this.globe.model.visible === true){
            this.lightFollowControls()
        }
        if(this.doge) {
            this.doge.update()
        }
    }
}