import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'

export default class Raycaster {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.objectsToTest = []
        this.setInstance()
        this.currentIntersect = null
        this.contactForm = document.querySelector('.contactForm')
        this.aboutSection = document.querySelector('#about')
        this.locationSection = document.querySelector('#locations')
        this.testObjects = true

        const close = document.querySelectorAll('.close-button')
        close.forEach(btn => btn.addEventListener('click', () => {
            this.goHome()
        }))

        const closeControlsButton = document.querySelector('.close-controls-button')
        const controlsInstructions = document.querySelector('.controls')
        closeControlsButton.addEventListener('click', () => {
            controlsInstructions.classList.add('hide')
        })

        this.closeLocationsModal = document.querySelector('.close-locations-button')

        this.locationsModal = document.querySelector('#locations')

        this.locationsHiddenButton = document.querySelector('#locations-hidden-button')

        this.closeLocationsModal.addEventListener('click', () => {
            this.locationsModal.classList.add('hide')
            this.locationsHiddenButton.classList.remove('hide')
        })

        this.color = null
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        window.addEventListener('click', () => {
            if(this.testObjects === true){
                if(this.intersects.length) {
                    if(!this.currentIntersect) {
                        // console.log('click enter')
                    }
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        // console.log(this.currentIntersect.object.name)
                        this.color = new THREE.Color('#00ff0d')
                        gsap.to(this.currentIntersect.object.material.color, 1, {
                            r: this.color.r,
                            g: this.color.g,
                            b: this.color.b
                        })

                        ////////////////////// HOME //////////////////////////
                        // if(this.currentIntersect.object.name === 'home'){
                        //     gsap.to(this.camera.position, {
                        //         x: -2.5,
                        //         y: -3,
                        //         z: 6,
                        //         duration: 2,
                        //         ease: "back.inOut(1.7)",
                        //     })
                        //     this.experience.world.showHome()
                        //     setTimeout(() => {
                        //         this.contactForm.classList.remove('show')
                        //         this.aboutSection.classList.remove('show')
                        //     }, 700)
                        // }

                        /////////////////////////// CONTACT ///////////////////////////////
                        if(this.currentIntersect.object.name === 'contact'){
                            gsap.to(this.camera.position, {
                                x: -0.82,
                                y: -0.33,
                                z: -1.8,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            this.testObjects = false
                            this.aboutSection.classList.remove('show')
                            this.locationSection.classList.remove('show')
                            setTimeout(() => {
                                this.contactForm.classList.add('show')
                                document.getElementById("name").focus();
                            }, 1200)
                        }

                        /////////////////////////// ABOUT ///////////////////////////////
                        if(this.currentIntersect.object.name === 'about'){
                            gsap.to(this.camera.position, {
                                x: 5,
                                y: 14,
                                z: 5,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            this.testObjects = false
                            this.locationSection.classList.remove('show')
                            setTimeout(() => {
                                this.aboutSection.classList.add('show')
                            }, 1200)
                        }

                        /////////////////////////// SVG LINK ///////////////////////////
                        if(typeof this.currentIntersect !== null && this.currentIntersect.object.parent.userData.url){
                            window.open(this.currentIntersect.object.parent.userData.url, '_blank').focus();
                        }

                        /////////////////////////// LOCATIONS ///////////////////////////////
                        if(this.currentIntersect.object.name === 'locations'){
                            gsap.to(this.camera.position, {
                                x: -25,
                                y: 25,
                                z: -10,
                                duration: 2,
                                ease: "back.inOut(1.1)",
                            })
                            this.testObjects = false
                            setTimeout(() => {
                                this.experience.world.showLocations()
                            }, 800)
                            this.aboutSection.classList.remove('show')
                            setTimeout(() => {
                                // while(this.experience.scene.children.length > 0){
                                //     this.experience.scene.remove(this.experience.scene.children[0]);
                                // }
                                // this.camera.controls.minDistance = 4.5;
                                // this.camera.controls.maxDistance = 5.7;
                                // this.experience.scene.children.destroy()
                                // locationScene = true
                                gsap.to(this.camera.position, {
                                    x: 3.8,
                                    y: 2,
                                    z: 8,
                                    duration: 2,
                                    ease: "back.inOut(1.2)",
                                })
                            }, 1500)
                            setTimeout(() => {
                                this.locationSection.classList.add('show')
                            }, 4000)
                            // setTimeout(() => {
                            //     // canvas.classList.remove('fade')
                            //     this.locationSection.classList.add('show')
                            // }, 3000)
                        }

                         /////////////////////////// WORK ///////////////////////////////
                         if(this.currentIntersect.object.name === 'work'){
                            gsap.to(this.camera.position, {
                                x: 2,
                                y: -3,
                                z: 8,
                                duration: 1.5,
                                ease: "back.inOut(1.7)",
                            })
                            this.testObjects = false
                            this.locationsHiddenButton.classList.remove('hide')
                            this.experience.world.showWork()
                        }
                    }
                }
            }
        })

        // Accordion on locations modal mobile view
        let acc = document.getElementsByClassName("location")
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active")
                let panel = this.nextElementSibling
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px"
                }
            })
        }
    }

    setInstance() {
    //  const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    //  const rayDirection = new THREE.Vector3(10, 0, 0)
    //  rayDirection.normalize()
        this.raycaster = new THREE.Raycaster()
        this.raycaster.far = 100
        this.intersects = this.raycaster.intersectObjects(this.objectsToTest)
    }

    update() {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.objectsToTest)
        if(intersects.length) { // mouse enter
            this.currentIntersect = intersects[0]
            // console.log(this.currentIntersect.object.material.color)
            if(this.currentIntersect.object.name === 'about' || this.currentIntersect.object.name === 'contact' || this.currentIntersect.object.name === 'locations'){
                this.color = new THREE.Color('#00c4eb')
                gsap.to(this.currentIntersect.object.material.color, 2, {
                    r: this.color.r,
                    g: this.color.g,
                    b: this.color.b
                })
            }
        } else { // mouse leave
            this.currentIntersect = null
            // console.log(this.scene.children)
            // if(this.currentIntersect.object.name === 'about'){
            //     this.color = new THREE.Color('#00f208')
            // }
            // gsap.to(this.currentIntersect.object.material.color, 2, {
            //     r: this.color.r,
            //     g: this.color.g,
            //     b: this.color.b
            // })
        }
    }

    goHome() {
        this.testObjects = true
        gsap.to(this.camera.position, {
            x: -2.5,
            y: -3,
            z: 6,
            duration: 2,
            ease: "back.inOut(1.7)",
        })
        this.experience.world.showHome()
        this.locationsHiddenButton.classList.add('hide')
        this.locationsModal.classList.remove('hide')
        this.locationSection.classList.remove('show')
        setTimeout(() => {
            this.contactForm.classList.remove('show')
            this.aboutSection.classList.remove('show')
        }, 700)
    }
}