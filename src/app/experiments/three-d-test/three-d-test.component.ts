import { Component, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';



@Component({
    selector: 'app-three-d-test',
    imports: [],
    templateUrl: './three-d-test.component.html',
    styleUrl: './three-d-test.component.scss'
})
export class ThreeDTestComponent {

  private canvas!: HTMLCanvasElement;
  private engine!: BABYLON.Engine;
  private scene!: BABYLON.Scene;
  private camera!: BABYLON.ArcRotateCamera;
  private light!: BABYLON.HemisphericLight;
  private light2!: BABYLON.HemisphericLight;
  private light3!: BABYLON.HemisphericLight;
  private light4!: BABYLON.HemisphericLight;


  ngOnInit(): void {
    this.initBabylon();
    this.loadGLTFModel();
  }

  initBabylon(): void {
    this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    //this.scene.clearColor = new BABYLON.Color4(.15, .15, .15, 1);

    this.camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvas, true);

    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 0, 3), this.scene);
    this.light.intensity = 100;
    this.light.diffuse = new BABYLON.Color3(1, 1, 1);

    this.light2 = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 0, -3), this.scene);
    this.light2.intensity = 100;
    this.light2.diffuse = new BABYLON.Color3(1, 1, 1);

    this.light3 = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 3, 0), this.scene);
    this.light3.intensity = 100;
    this.light3.diffuse = new BABYLON.Color3(1, 1, 1);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
    //const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("assets/textures/sky.jpg", this.scene);

    // Create the default skybox
    //const skybox = this.scene.createDefaultSkybox(hdrTexture, true, 1000);

    // const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, this.scene);
    // const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", this.scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/sky.jpg", this.scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skybox.material = skyboxMaterial;
    // this.scene.addMesh(skybox);

  }

  async loadGLTFModel() {
    const result = await (BABYLON as any).ImportMeshAsync('assets/models/cogent.gltf', this.scene);
    result.meshes.forEach(mesh => {
      mesh.scaling = new BABYLON.Vector3(4, 4, 4); // Scale the model
    });
  }
}
