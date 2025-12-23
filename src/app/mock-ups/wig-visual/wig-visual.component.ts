import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DB } from '../../dependencies/db';
import { UtilitiesService } from '../../dependencies/utilities';
declare var Matter: any;

@Component({
    selector: 'app-wig-visual',
    imports: [MatIconModule],
    templateUrl: './wig-visual.component.html',
    styleUrl: './wig-visual.component.scss'
})
export class WigVisualComponent implements OnInit {

  engine: any;

  sprites: any[] = [];
  ground: any;
  itemsToShow: any[]
  index = 0;

  ngOnInit(): void {

    const db = new DB();

    this.itemsToShow = db.getMaintenanceServices();
    // if (typeof Matter === 'undefined') {
    //   const script: HTMLOrSVGScriptElement = document.createElement('script');
    //   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    //   script.onload = (e) => {

    // this.engine = Matter.Engine.create(this.engine);
    // this.engine.gravity = 1;

    // const ground = Matter.Bodies.rectangle(0, 1075, 1920, 5, { isStatic: true });
    // ground.isStatic = true;
    // Matter.Composite.add(this.engine.world, [ground]);

    // const square = Matter.Bodies.rectangle(500, 0, 10, 10);
    // Matter.Composite.add(this.engine.world, [square]);
    // square._id = 'square1';

    // this.sprites = [square];
    // this.doLoop();
    // const runner = Matter.Runner.create();
    // Matter.Runner.run(runner, this.engine);
    //};

    //   document.body.appendChild(script);
    // }

    if (typeof Matter === 'undefined') {
      const script: HTMLOrSVGScriptElement = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
      script.onload = (e) => {

        this.doSetup();
      }
      document.body.appendChild(script);

    } else {
      this.doSetup();
    }

  }

  doSetup() {
    var engine = Matter.Engine.create();
    this.engine = engine;
    this.engine.gravity = { x: 0, y: 0.2 };

    this.doDrop(0, engine);

    var ground = Matter.Bodies.rectangle(960, 1070, 1920, 10, { isStatic: true, restitution: .9, friction: 0 });
    ground.restitution = .9;
    ground.friction = 0;
    this.ground = ground;

    // add all of the bodies to the world
    Matter.Composite.add(engine.world, [ground]);
    //Matter.Composite.add(engine.world, [boxA, boxB])
    ground.restitution = .9;

    const barFriction = 0;

    var div1 = Matter.Bodies.rectangle(330, 310, 524, 58, { isStatic: true });
    div1.friction = barFriction;
    Matter.Body.rotate(div1, 0.15)
    Matter.Composite.add(engine.world, div1);


    const div2 = Matter.Bodies.rectangle(900, 210, 424, 58, { isStatic: true, friction: 0, staticFriction: 0 });
    div2.friction = barFriction;
    Matter.Body.rotate(div2, -0.06)
    Matter.Composite.add(engine.world, div2);

    const div3 = Matter.Bodies.rectangle(1500, 410, 400, 58, { isStatic: true, friction: 0, staticFriction: 0 });
    div3.friction = barFriction;
    Matter.Body.rotate(div3, 0.06)
    Matter.Composite.add(engine.world, div3);

    const div4 = Matter.Bodies.rectangle(1200, 610, 350, 58, { isStatic: true, friction: 0, staticFriction: 0 });
    div4.friction = barFriction;
    Matter.Body.rotate(div4, 0.11)
    Matter.Composite.add(engine.world, div4);

    var side1 = Matter.Bodies.rectangle(120, 800, 900, 2, { isStatic: true, friction: 0 });
    side1.friction = 0;
    Matter.Body.rotate(side1, 0.65)
    Matter.Composite.add(engine.world, side1);

    var side2 = Matter.Bodies.rectangle(1850, 800, 900, 2, { isStatic: true, friction: 0 });
    side2.friction = 0;
    Matter.Body.rotate(side2, -0.65)
    Matter.Composite.add(engine.world, side2);

    const leftWall = Matter.Bodies.rectangle(0, 540, 2, 1080, { isStatic: true, friction: 0 });
    Matter.Composite.add(engine.world, leftWall);

    const rightWall = Matter.Bodies.rectangle(1918, 540, 2, 1080, { isStatic: true, friction: 0 });
    Matter.Composite.add(engine.world, rightWall);



    // run the renderer
    //Matter.Render.run(render);

    // create runner
    var runner = Matter.Runner.create();

    // run the engine
    Matter.Runner.run(runner, engine);

    // boxA._id = 'square1';
    // this.sprites = [boxA];
    this.doLoop();
  }

  houseCleaningCount = 0;
  pestControlCount = 0;
  lawnCount = 0;
  poolCount = 0;

  doDrop(index: number, engine) {
    const circle = Matter.Bodies.circle(this.random(0, 1900), 0, 30, { restitution: 1, frictionStatic: 0, airFriction: 0 });
    circle.restitution = 1.1;
    circle.frictionStatic = 1;
    circle.friction = 0.02;
    circle.airFriction = 0;
    Matter.Composite.add(engine.world, [circle]);


    const id = UtilitiesService.newid();
    const domObject = document.createElement('div');
    domObject.id = id;
    domObject.className = 'circle';
    document.querySelector('.rendered').appendChild(domObject);
    circle._id = id;

    //domObject.style.border = '1px solid orange';
    domObject.style.backgroundColor = 'pink';
    domObject.style.height = '60px';
    domObject.style.width = '60px';
    domObject.style.borderRadius = '50%';
    domObject.style.position = 'absolute';
    domObject.style.display = 'flex';
    domObject.style.justifyContent = 'center';
    domObject.style.alignItems = 'center';
    
    //domObject.innerText = this.itemsToShow[index].name;

    if (this.itemsToShow[index].name === 'Landscape Maintenance') {
    }

    switch (this.itemsToShow[index].name) {
      case 'Landscape Maintenance':
        domObject.innerHTML = '<span class="material-icons" style="font-size: 32px; color: #fff">grass</span>';
        domObject.style.backgroundColor = 'green';
        domObject.style.backgroundImage = 'radial-gradient(circle, rgba(201,255,170,1) 0%, rgba(57,200,39,1) 100%)';
        this.lawnCount++;
        //Matter.Body.setMass(circle, 3);
        break;
      case 'Pest Control':
        domObject.innerHTML = '<span class="material-icons" style="font-size: 32px; color: #fff">bug_report</span>';
        //domObject.style.backgroundColor = 'red';
        domObject.style.backgroundImage = 'radial-gradient(circle, rgba(238,81,36,1) 0%, rgba(164,36,9,1) 100%)'
        this.pestControlCount++;
        break;
      case 'House Cleaning':
        domObject.innerHTML = '<span class="material-icons" style="font-size: 32px; color: #fff">cleaning_services</span>';
        this.houseCleaningCount ++;
        domObject.style.backgroundImage  = 'radial-gradient(circle, rgba(36,238,234,1) 0%, rgba(9,164,159,1) 100%)';
        //Matter.Body.setMass(circle, 4);
        break;
      case 'Pool Maintenance':
        domObject.innerHTML = '<span class="material-icons" style="font-size: 32px; color: #fff">pool</span>';
        domObject.style.backgroundColor = 'blue';
        domObject.style.backgroundImage = 'radial-gradient(circle, rgba(170,178,255,1) 0%, rgba(46,39,200,1) 100%)';
        this.poolCount++;
        //Matter.Body.setMass(circle, 2);
        break;



    }

    // border: ;
    // background-color: pink;
    // height: 30px;
    // width: 30px;
    // border-radius: 50%;
    // position: absolute;;

    this.sprites.push(circle);
    index++;
    if (index < this.itemsToShow.length) {
      setTimeout(() => this.doDrop(index, engine), 50);
    }
  }

  doRender() {

    Matter.Engine.update(this.engine);
    console.log(this.sprites);
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  doLoop() {
    window.requestAnimationFrame(this.doLoop.bind(this));
    Matter.Engine.update(this.engine, 1000 / 60);


    for (const sprite of this.sprites) {
      const domElement = document.getElementById(sprite._id);
      if (domElement) {
        const pos = sprite.position;
        let x = pos.x;
        let y  = pos.y;
        if(x > 1850) {
          x = 1850;
        }
        if(y > 1050) {
          y = 1050;
        }
        domElement.style.left = `${x - 30}px`;
        domElement.style.top = `${y - 30}px`;
        domElement.style.transform = `rotate(${sprite.angle}rad)`;


      }
    }
  }

}
