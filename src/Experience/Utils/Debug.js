export default class Debug {
    constructor() {
        this.active = window.location.hash === '#debug';

        if (this.active && process.env.NODE_ENV !== 'production') {
            import('lil-gui').then((dat) => {
                this.ui = new dat.GUI();
            });
        }
    }
}
