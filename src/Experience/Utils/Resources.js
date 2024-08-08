import { TextureLoader, CubeTextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        this.sources = sources;
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath('/draco/');
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
        this.loaders.textureLoader = new TextureLoader();
        this.loaders.cubeTextureLoader = new CubeTextureLoader();
        this.loaders.fontLoader = new FontLoader();
        this.loaders.svgLoader = new SVGLoader();
    }

    startLoading() {
        // Load each source
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            } else if (source.type === 'font') {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            } else if (source.type === 'svg') {
                this.loaders.svgLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;

        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }
}
