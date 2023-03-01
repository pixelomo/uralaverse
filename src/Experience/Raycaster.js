import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'
import UI from './World/UI.js'

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
        this.locationSection = document.querySelectorAll('.locations')
        this.globeMask = document.querySelector('#maskPanel')
        this.testHomeObjects = true
        this.testPortfolioObjects = false
        this.testLocationsObjects = false
        this.locationsNames = ['Tokyo', 'London', 'Jakarta', 'Ho Chi Minh', 'Kuala Lumpur', 'Fukui', 'Singapore', 'Seoul', 'Manila', 'Melbourne']

        const close = document.querySelectorAll('.close-button')
        close.forEach(btn => btn.addEventListener('click', () => {
            this.goHome()
        }))

        const closeControlsButton = document.querySelector('.close-controls-button')
        this.controlsInstructions = document.querySelector('.controls')
        closeControlsButton.addEventListener('click', () => {
            this.controlsInstructions.classList.add('hide')
        })

        this.closeLocationsModal = document.querySelector('#close-locations-button')
        this.locationsHiddenButton = document.querySelector('#locations-hidden-button')
        this.locationDetails = document.querySelectorAll('.location-details')
        this.locationCols = document.querySelectorAll('.locations-col')

        this.closeLocationsModal.addEventListener('click', () => {
            this.closeLocationsModal.classList.add('hide')
            this.locationCols.forEach((d) => {
                d.classList.add('hide')
            })
        })

        document.querySelector('#back-to-locations').addEventListener('click', () => {
            document.querySelectorAll('.locations').forEach((s) => {
                gsap.to(s, {
                    opacity: 1,
                    duration: 1
                })
                s.classList.add('show')
            })
            document.querySelector('#back-to-locations').classList.add('hide');
            // refactor foreach
            this.locationDetails.forEach((d) => {
                // d.classList.remove('show')
                gsap.to(d, {
                    left: "-100vw",
                    duration: 1
                })
            })
            const background = document.querySelector('#maskPanel');
            gsap.to(background, {
                left: "-100vw",
                duration: 1
            })
        })

        document.querySelector('#show-services').addEventListener('click', () => {
            document.querySelector('.intro').classList.add('hide')
            document.querySelector('#service-tabs').classList.remove('hide')
        })

        this.workModal = document.querySelector('#work')
        this.color = null
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })

        window.addEventListener('click', () => {
            this.ui = this.experience.world.ui
            if(this.testHomeObjects === true){
                if(this.intersects.length) {
                    if(!this.currentIntersect) {
                        // console.log('click enter')
                    }
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        // console.log(this.currentIntersect.object.name)
                        // if(this.currentIntersect.object.name != 'portfolio') {
                        //     this.color = new THREE.Color('#00ff0d')
                        //     gsap.to(this.currentIntersect.object.material.color, 1, {
                        //         r: this.color.r,
                        //         g: this.color.g,
                        //         b: this.color.b
                        //     })
                        // }

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
                        /////////////////////////// CONTACT ///////////////////////////////
                        if(this.currentIntersect.object.name === 'contact'){
                            gsap.to(this.camera.position, {
                                x: -0.82,
                                y: -0.33,
                                z: -1.8,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            this.testHomeObjects = false
                            this.aboutSection.classList.remove('show')
                            // this.locationSection.classList.remove('show')
                            this.locationSection.forEach((s) => {
                                s.classList.remove('show')
                            })
                            this.controlsInstructions.classList.add('hide')
                            setTimeout(() => {
                                this.contactForm.classList.add('show')
                                document.getElementById("name").focus();
                            }, 1200)
                        }

                        /////////////////////////// ABOUT ///////////////////////////////
                        /////////////////////////// ABOUT ///////////////////////////////
                        if(this.currentIntersect.object.name === 'about'){
                            // gsap.to(this.camera.position, {
                            //     x: 5,
                            //     y: 14,
                            //     z: 5,
                            //     duration: 2,
                            //     ease: "back.inOut(1.7)",
                            // })
                            this.testHomeObjects = false
                            this.experience.camera.disableControls()
                            // this.locationSection.classList.remove('show')
                            this.locationSection.forEach((s) => {
                                s.classList.remove('show')
                            })
                            gsap.to(this.camera.position, {
                                x: -2.2,
                                y: -3,
                                z: 8.9,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            gsap.to(this.camera.rotation, {
                                x: 1.2,
                                y: 0.1,
                                z: -0.1,
                                duration: 2,
                                ease: "back.inOut(1.7)",
                            })
                            setTimeout(() => {
                                this.aboutSection.classList.add('show')
                                this.controlsInstructions.classList.add('hide')
                            }, 1200)
                        }

                        /////////////////////////// SVG LINK ///////////////////////////
                        /////////////////////////// SVG LINK ///////////////////////////
                        if(typeof this.currentIntersect !== null && this.currentIntersect.object.parent.userData.url){
                            window.open(this.currentIntersect.object.parent.userData.url, '_blank').focus();
                        }

                        /////////////////////////// LOCATIONS ///////////////////////////////
                        /////////////////////////// LOCATIONS ///////////////////////////////
                        if(this.currentIntersect.object.name === 'locations'){
                            gsap.to(this.camera.position, {
                                x: -25,
                                y: 25,
                                z: -10,
                                duration: 2,
                                ease: "back.inOut(1.1)",
                            })
                            this.testHomeObjects = false
                            this.testLocationsObjects = true
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
                                    duration: 1.8,
                                    ease: "back.inOut(1.2)",
                                })
                            }, 1500)
                            setTimeout(() => {
                                // this.locationSection.classList.add('show')
                                this.locationSection.forEach((s) => {
                                    s.classList.add('show')
                                })
                                this.locationsHiddenButton.classList.remove('hide')
                                this.controlsInstructions.classList.add('hide')
                            }, 4000)
                            // setTimeout(() => {
                            //     // canvas.classList.remove('fade')
                            //     this.locationSection.classList.add('show')
                            // }, 3000)
                        }

                        /////////////////////////// WORK ///////////////////////////////
                        /////////////////////////// WORK ///////////////////////////////
                        if(this.currentIntersect.object.name === 'work'){
                            gsap.to(this.camera.position, {
                                x: 2,
                                y: -3,
                                z: 8,
                                duration: 1.5,
                                ease: "back.inOut(1.7)",
                            })
                            this.testHomeObjects = false
                            this.testPortfolioObjects = true
                            // this.workModal.classList.add('show')
                            this.locationsHiddenButton.classList.remove('hide')
                            this.experience.world.showWork()
                        }
                        /////////////////////////// WORK  END ///////////////////////////////
                        /////////////////////////// WORK END ///////////////////////////////
                    }
                }
            } // end of textHomeObjects
            ///////////////////////////// PORTFOLIO ///////////////////////////////////
            ///////////////////////////// PORTFOLIO ///////////////////////////////////
            if(this.testPortfolioObjects === true){
                if(this.intersects.length) {
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        // console.log(this.currentIntersect.object.name)
                        if(this.currentIntersect.object.name === 'portfolio'){
                            // console.log(this.currentIntersect.object.userData)
                            let portfolioItem = this.currentIntersect.object
                            gsap.to(this.camera.position, {
                                x: 0,
                                y: 3,
                                z: 8,
                                duration: 1.2
                            })
                            // userData back to original position
                            gsap.to(portfolioItem.position, {
                                x: 0,
                                y: 0,
                                z: 2,
                                duration: 1.2,
                            })
                            // if no UI create
                            // if(typeof this.ui === 'undefined'){
                            //     this.ui = new UI({title: portfolioItem.userData.title, description: portfolioItem.userData.description})
                            // } else {
                                this.ui.title.children[1].set({content: portfolioItem.userData.title})
                                this.ui.description.children[1].set({content: portfolioItem.userData.description})
                            // }
                            // if UI scale = 1 => 0
                            // console.log(portfolioItem.scale.x)
                            if(this.ui.container.scale.x === 0){
                                this.ui.container.scale.set(1,1,1)
                                this.ui.container.rotation.set(0.15,0,0)
                                this.ui.container.position.set(0, 0, 3)
                                gsap.to(portfolioItem.scale, {
                                    x: 3,
                                    y: 3,
                                    z: 3,
                                    duration: 1.2,
                                })
                                gsap.to(portfolioItem.position, {
                                    x: 0,
                                    y: 0,
                                    z: 2,
                                    duration: 1.2,
                                })
                            } else {
                                this.ui.container.scale.set(0,0,0)
                                gsap.to(portfolioItem.scale, {
                                    x: 1,
                                    y: 1,
                                    z: 1,
                                    duration: 1.2,
                                })
                                gsap.to(portfolioItem.position, {
                                    x: portfolioItem.userData.position.x,
                                    y: portfolioItem.userData.position.y,
                                    z: portfolioItem.userData.position.z,
                                    duration: 1.2,
                                })
                            }
                        }
                    }
                }
            } // end of portfolio
            ///////////////////////////// GLOBE ///////////////////////////////////
            ///////////////////////////// GLOBE ///////////////////////////////////
            if(this.testLocationsObjects === true){
                if(this.intersects.length) {
                    this.currentIntersect = intersects[0]
                } else {
                    if(this.currentIntersect) {
                        for(let i = 0; i < this.locationsNames.length; i++){
                            if(this.currentIntersect.object.name.includes(this.locationsNames[i])
                            && typeof this.currentIntersect.object.userData.address != 'undefined'){
                                // console.log(this.currentIntersect.object.userData)
                                // if no UI create
                                // if(typeof this.ui === 'undefined'){
                                //     this.ui = new UI({title: this.locationsNames[i], description: this.currentIntersect.object.userData.address})
                                // } else {
                                    this.ui.title.children[1].set({content: this.locationsNames[i]})
                                    this.ui.description.children[1].set({content: this.currentIntersect.object.userData.address})
                                // }
                                // if UI scale = 1 => 0
                                if(this.ui.container.scale.x === 0){
                                    this.ui.container.scale.set(0.45,0.45,0.45)
                                    // this.ui.container.position.set(-1,2.7,4.5)
                                    this.ui.container.position.set(2.2,1,4.6)
                                }
                                this.ui.container.lookAt(this.camera.position)
                            } else {
                                if(typeof this.currentIntersect.object.userData.address === 'undefined'){
                                    if(this.ui){
                                        this.ui.container.scale.set(0,0,0)
                                    }
                                }
                            }
                        }
                    }
                }
            } // end of globe
            // console.log(this.objectsToTest)
        })

        //////////////////////////////// Locations select UI ///////////////////////////////////
        //////////////////////////////// Locations select UI ///////////////////////////////////
        let l = document.getElementsByClassName("location")
        for (let i = 0; i < l.length; i++) {
            l[i].addEventListener("click", function() {
                let id = this.classList[1]
                let activeLocation = document.querySelector('#' + id)
                // activeLocation.classList.add('show');
                const background = document.querySelector('#maskPanel');
                // background.classList.add('show');
                gsap.to(activeLocation, {
                    left: 0,
                    duration: 1
                })
                gsap.to(background, {
                    left: 0,
                    duration: 1
                })
                ///// rotate globe to location /////
                const camera = window.experience.camera.instance.position
                if(id === 'tokyo'){
                    gsap.to(camera, {
                        x: 5.4,
                        y: 5.1,
                        z: 5.2,
                        duration: 1,
                    })
                } else if(id === 'london') {
                    gsap.to(camera, {
                        x: -5.6,
                        y: 7.0,
                        z: -1.0,
                        duration: 1,
                    })
                } else if(id === 'jakarta') {
                    gsap.to(camera, {
                        x: 1.8,
                        y: -0.5,
                        z: 8.9,
                        duration: 1,
                    })
                }else if(id === 'hochi') {
                    gsap.to(camera, {
                        x: 1.1,
                        y: 2.2,
                        z: 8.7,
                        duration: 1,
                    })
                }else if(id === 'kuala') {
                    gsap.to(camera, {
                        x: 1.5,
                        y: 0.7,
                        z: 8.9,
                        duration: 1,
                    })
                }else if(id === 'fukui') {
                    gsap.to(camera, {
                        x: 4.6,
                        y: 5.3,
                        z: 5.7,
                        duration: 1,
                    })
                }else if(id === 'singapore') {
                    gsap.to(camera, {
                        x: 1.5,
                        y: 0.7,
                        z: 8.9,
                        duration: 1,
                    })
                }else if(id === 'seoul') {
                    gsap.to(camera, {
                        x: 3,
                        y: 6,
                        z: 6,
                        duration: 1,
                    })
                }else if(id === 'manila') {
                    gsap.to(camera, {
                        x: 3.7,
                        y: 3.2,
                        z: 7.7,
                        duration: 1,
                    })
                }else if(id === 'melbourne') {
                    gsap.to(camera, {
                        x: 5.4,
                        y: -5.3,
                        z: 4.9,
                        duration: 1,
                    })
                }

                document.querySelectorAll('.locations').forEach((s) => {
                    gsap.to(s, {
                        opacity: 0,
                        duration: 1
                    })
                    setTimeout(() => {
                        s.classList.remove('show')
                    }, 1000)
                })
                document.querySelector('#back-to-locations').classList.remove('hide');
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
            if(this.currentIntersect.object.name === 'about' || this.currentIntersect.object.name === 'contact' || this.currentIntersect.object.name === 'locations' || this.currentIntersect.object.name === 'work'){
                this.color = new THREE.Color('#00c4eb')
                gsap.to(this.currentIntersect.object.material.color, 0.5, {
                    r: this.color.r,
                    g: this.color.g,
                    b: this.color.b
                })
                // gsap.to(this.currentIntersect.object.scale, 0.5, {
                //     x: 1.1,
                //     y: 1.1,
                //     z: 1.1
                // })
            }
        } else { // mouse leave
            this.currentIntersect = null
            if(this.experience.world.work){
                this.resetTextColor(this.experience.world.about.mesh)
                this.resetTextColor(this.experience.world.locations.mesh)
                this.resetTextColor(this.experience.world.contact.mesh)
                this.resetTextColor(this.experience.world.work.mesh)
            }
        }
    }

    resetTextColor(mesh) {
        if(mesh.material.color != mesh.material.userData.color){
            gsap.to(mesh.material.color, 0.5, {
                r: mesh.material.userData.color.r,
                g: mesh.material.userData.color.g,
                b: mesh.material.userData.color.b
            })
        }
    }

    goHome() {
        this.experience.camera.enableControls()
        this.testHomeObjects = true
        this.testPortfolioObjects = false
        this.testLocationsObjects = false
        gsap.to(this.camera.position, {
            x: -2.5,
            y: -3,
            z: 6,
            duration: 2,
            ease: "back.inOut(1.7)",
        })
        this.experience.world.showHome()
        this.aboutSection.classList.remove('show')
        this.locationsHiddenButton.classList.add('hide')
        // this.locationsModal.classList.remove('hide')
        // this.locationSection.classList.remove('show')
        this.locationSection.forEach((s) => {
            s.classList.remove('show')
        })
        this.globeMask.classList.remove('show')
        if(this.ui){
            // reset portfolio
            this.ui.container.scale.set(0,0,0)
            this.ui.container.position.set(0,30,0)
            // this.world.globe.position.set(0,30,0)
            // console.log(this.world)
            // console.log(this.scene.children)
            this.experience.world.resetWork()
        }
        // this.workModal.classList.remove('show')
        setTimeout(() => {
            this.contactForm.classList.remove('show')
        }, 700)
        document.querySelector('.intro').classList.remove('hide')
        document.querySelector('#service-tabs').classList.add('hide')
        this.closeLocationsModal.classList.remove('hide')
        this.locationCols.forEach((d) => {
            d.classList.remove('hide')
        })
    }
}