import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-count-wig-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-count-wig-visual.component.html',
  styleUrl: './customer-count-wig-visual.component.scss'
})
export class CustomerCountWigVisualComponent {

  //pct: number = 50;

  startAngle = -116;  //deg
  endAngle = 110;  //deg

  number = 14000;
  displayNumber = this.number;
  totalSubscriptions = 14750;
  displayD2C = 0;
  displayRealEstate = 0;
  actualD2C = 321;
  actualRealEstate = 1500;
  realEstateTarget = 7975;
  d2ctarget = 742;

  // get isZero() {
  //   return this.pct < 3;
  // }
  constructor() {

    setTimeout(() => {
      this.revUp();
      this.setMask();
    });
  }

  setMask() {
    const d = this.describeArc(925 - 574, 533 - 181, 350, this.startAngle, this.angle);
    document.getElementById('my-mask').setAttribute('d', d);
  }

  revUp() {
    this.number += 10;
    this.setMask();
    if (this.number === 14250) {
      this.revDown();
      return;
    }
    setTimeout(() => {
      this.revUp();
    }, 10);

  }

  doD2C() {
    this.displayD2C += 10;
    if (this.displayD2C > this.actualD2C) {
      this.displayD2C = this.actualD2C;
    }
    if (this.displayD2C === this.actualD2C) {
      return;
    }
    setTimeout(() => this.doD2C(), 10);
  }

  // -157
  get realEstateTransform() {
    //const delta = this.d2ctarget - this.actualD2C;
    const pct = this.displayRealEstate / this.realEstateTarget;

    return `translateY(${-157 * pct}px)`;
  }



  get d2CTransform() {
    const pct = this.displayD2C / this.d2ctarget;

    return `translateY(${-157 * pct}px)`;
  }

  doRealEstate() {
    this.displayRealEstate += 10;
    if (this.displayRealEstate > this.actualRealEstate) {
      this.displayRealEstate = this.actualRealEstate;
    }
    if (this.displayRealEstate === this.actualRealEstate) {
      return;
    }
    setTimeout(() => this.doRealEstate(), 10);
  }

  revDown() {
    this.number -= 10;
    this.setMask();
    if (this.number === 14000) {
      this.increment();
      return;
    }
    setTimeout(() => {
      this.revDown();
    }, 20);
  }

  increment() {
    if (this.number >= this.totalSubscriptions) {
      return;
    }
    this.number += 10;
    this.setMask();
    this.displayNumber = this.number;
    if (this.number >= this.totalSubscriptions) {
      this.number = this.totalSubscriptions;
      this.displayNumber = this.number;

      setTimeout(() => this.doD2C(), 700);

      setTimeout(() => this.doRealEstate(), 100);
      this.setMask();
      this.endRevUp(400);
    } else {
      setTimeout(() => this.increment(), 10);
    }
  }

  endRevUp(count: number) {
    if (count % 10 !== 0) {
      return;
    }
    this.number += 10;
    this.setMask();
    if (this.number === this.totalSubscriptions + count) {
      this.endRevDown(count);
      return;
    }
    setTimeout(() => this.endRevUp(count), 10);
  }

  endRevDown(count: number) {
    this.number -= 10;
    this.setMask();
    if (this.number === this.totalSubscriptions) {
      this.endRevUp(count / 2);
      return;
    }
    setTimeout(() => this.endRevDown(count), 10);
  }


  get pct() {
    const delta = 16500 - 14000;
    const currentDelta = this.number - 14000;

    return currentDelta / delta;
  }

  get angle() {
    const totalDegrees = Math.abs(this.startAngle - this.endAngle);
    const angle = (totalDegrees * this.pct) + this.startAngle;

    return angle;
  }

  get rotation() {
    return `rotate(${this.angle}deg)`;
  }


  describeArc(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", x, y,
      "Z"
    ].join(" ");

    return d;
  }
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }






  // setZero() {
  //   this.pct = 2;
  // }
}
