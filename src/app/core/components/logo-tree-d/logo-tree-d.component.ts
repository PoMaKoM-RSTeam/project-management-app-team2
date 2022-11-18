/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import cube_gltf from 'src/assets/3D/logo_cube.glb';

@Component({
  selector: 'app-logo-tree-d',
  templateUrl: './logo-tree-d.component.html',
  styleUrls: ['./logo-tree-d.component.scss'],
})
export class LogoTreeDComponent implements OnInit {
  ngOnInit(): void {
    this.main();
  }

  main() {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 12);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.2, 0);
    controls.update();
    controls.enableZoom = false;
    controls.enablePan = false;

    const scene = new THREE.Scene();

    {
      const skyColor = 0xabecff;
      const groundColor = 0x2c74f9;
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 8, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    let loadedModel: any;
    const loader = new GLTFLoader();
    loader.load(cube_gltf, (gltf: any) => {
      loadedModel = gltf;
      scene.add(gltf.scene);
      loadedModel.scene.rotation.y = Math.PI / 5;
      loadedModel.scene.position.y = -2;
      loadedModel.scene.scale.set(7, 7, 7);
    }, (xhr: any) => {
      // eslint-disable-next-line no-mixed-operators
      console.log(`${xhr.loaded / xhr.total * 100}%loaded`);
    }, (error: any) => {
      console.log('An error happened', error);
    });

    const anim = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.y += 0.014;
      }
      requestAnimationFrame(anim);
    };
    anim();

    function resizeRendererToDisplaySize(renderer: any) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
