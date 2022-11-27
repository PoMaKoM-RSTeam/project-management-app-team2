/* eslint-disable no-bitwise */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  HemisphereLight,
  DirectionalLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import cubeGltf from '../../../../assets/3D/logo_cube.glb';

@Component({
  selector: 'app-logo-tree-d',
  templateUrl: './logo-tree-d.component.html',
  styleUrls: ['./logo-tree-d.component.scss'],
})
export class LogoTreeDComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  private canvas!: ElementRef<HTMLCanvasElement>;

  @Input() rotationSpeed: number = 4;

  private requestedFrame = 0;

  private renderer: WebGLRenderer | null = null;

  private camera: PerspectiveCamera | null = null;

  private controls: OrbitControls | null = null;

  ngAfterViewInit(): void {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas.nativeElement,
      alpha: true,
      antialias: true,
    });

    const scene = new Scene();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let model: GLTF;

    {
      const fov = 45;
      const aspect = 2;
      const near = 0.1;
      const far = 100;
      this.camera = new PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 10, 12);
    }

    {
      const skyColor = 0xabecff;
      const groundColor = 0x2c74f9;
      const intensity = 1;
      const light = new HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new DirectionalLight(color, intensity);
      light.position.set(0, 8, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    {
      const modelLoader = new GLTFLoader();
      modelLoader.load(cubeGltf, (gltf) => {
        gltf.scene.rotation.y = -Math.PI / 8;
        gltf.scene.position.y = -2;
        gltf.scene.scale.set(7, 7, 7);
        scene.add(gltf.scene);
        model = gltf;
      });
    }

    this.controls = new OrbitControls(this.camera, this.canvas.nativeElement);
    this.controls.target.set(0, 0.2, 0);
    Object.assign(this.controls, {
      enableZoom: false,
      enablePan: false,
      autoRotate: true,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI / 2,
    });

    const render = () => {
      if (this.renderer && this.camera && this.controls) {
        this.resizeCanvasToDisplaySize();
        this.renderer.render(scene, this.camera);
        this.controls.autoRotateSpeed = this.rotationSpeed;
        this.controls.update();
      }
      this.requestedFrame = requestAnimationFrame(render);
    };

    render();
  }

  private resizeCanvasToDisplaySize() {
    if (!this.renderer || !this.camera) {
      return;
    }
    const canvas = this.canvas.nativeElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  ngOnDestroy(): void {
    this.renderer?.dispose();
    this.controls?.dispose();
    cancelAnimationFrame(this.requestedFrame);

    this.renderer = null;
    this.controls = null;
    this.requestedFrame = 0;
  }
}
