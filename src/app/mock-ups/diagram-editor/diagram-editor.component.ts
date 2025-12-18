import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-diagram-editor',
    imports: [CommonModule, MatButtonModule],
    templateUrl: './diagram-editor.component.html',
    styleUrl: './diagram-editor.component.scss'
})
export class DiagramEditorComponent {


  activeCircle: SVGCircleElement;
  activePolygon: SVGPolygonElement;
  mouseDownEvent: MouseEvent;
  circles: Circle[] = [];
  polygons: Polygon[] = [];
  selectedCircle: Circle;
  selectedMode = 'Circle';
  polygonPoints: Point[];
  selectedPolygon: Polygon;


  mouseDown(evt: MouseEvent) {

    this.mouseDownEvent = evt;

    if (this.selectedMode === 'Circle') {
      if(this.activePolygon) {
        this.activePolygon.parentNode.removeChild(this.activePolygon);
        delete this.activePolygon;
      }
      if (!this.activeCircle) {
        this.activeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.activeCircle.setAttribute('cx', evt.clientX.toString());
        this.activeCircle.setAttribute('cy', evt.clientY.toString());
        this.activeCircle.setAttribute('fill', 'rgba(51, 102, 153, .3)');
        this.activeCircle.setAttribute('stroke', '#336699');
        this.activeCircle.setAttribute('stroke-width', '2');

        const mySvg = document.getElementById('mySvg');
        mySvg.appendChild(this.activeCircle);
      }
    } else if (this.selectedMode === 'Shape') {
      if (!this.activePolygon) {
        this.activePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.activePolygon.setAttribute('fill', 'rgba(51, 102, 153, .3)');
        this.activePolygon.setAttribute('stroke', '#336699');
        this.activePolygon.setAttribute('stroke-width', '2');

        this.activePolygon.setAttribute('points', `${evt.clientX} ${evt.clientY}`);

        const mySvg = document.getElementById('mySvg');
        mySvg.appendChild(this.activePolygon);
        this.polygonPoints = [{ x: evt.clientX, y: evt.clientY }];
        delete this.selectedPolygon;
        delete this.selectedCircle;
      } else {
        const firstPoint = this.polygonPoints[0];
        const points = this.activePolygon.getAttribute('points');
        const deltaX = Math.abs(firstPoint.x - evt.clientX);
        const deltaY = Math.abs(firstPoint.y - evt.clientY);
        if (deltaX < 5 && deltaY < 5) {
          this.polygonPoints.push({ x: firstPoint.x, y: firstPoint.y });
          this.activePolygon.setAttribute('points', `${points} ${firstPoint.x} ${firstPoint.y}`);
          this.polygons.push({
            points: this.polygonPoints,
          });
          delete this.polygonPoints;
          this.activePolygon.parentNode.removeChild(this.activePolygon);
          delete this.activePolygon;
          this.selectPolygon(this.polygons[this.polygons.length - 1], evt);
        } else {
          this.activePolygon.setAttribute('points', `${points} ${evt.clientX} ${evt.clientY}`);
          this.polygonPoints.push({ x: evt.clientX, y: evt.clientY });
        }
      }
    }


  }

  getPolygonPoints(polygon: Polygon) {
    let pointsToString = '';
    for (const point of polygon.points) {
      pointsToString += `${point.x} ${point.y} `;
    }
    pointsToString = pointsToString.trim();
    return pointsToString;
  }

  getFill(hotSpot: Circle) {
    return this.selectedCircle === hotSpot ? 'rgba(255, 0, 0, .3)' : 'rgba(0,0,0,.3)';
  }

  getPolygonFill(polygon: Polygon) {
    return this.selectedPolygon === polygon ? 'rgba(255, 0, 0, .3)' : 'rgba(0,0,0,.3)';
  }

  mouseUp(evt: MouseEvent) {
    if (this.activeCircle) {
      //this.circles.push(this.circleShape);
      const radius = parseFloat(this.activeCircle.getAttribute('r'));
      if (radius > 5) {
        this.circles.push({
          x: parseFloat(this.activeCircle.getAttribute('cx')),
          y: parseFloat(this.activeCircle.getAttribute('cy')),
          radius
        });
        this.selectedCircle = this.circles[this.circles.length - 1];

      } else {
        this.selectedCircle = null;
      }

      this.activeCircle.parentNode.removeChild(this.activeCircle);

    }
    delete this.mouseDownEvent;
    delete this.activeCircle;
  }

  selectCircle(hotSpot: Circle, evt: MouseEvent) {
    evt.preventDefault();
    this.selectedCircle = hotSpot;
    if(this.activePolygon) {
      this.activePolygon.parentNode.removeChild(this.activePolygon);
      delete this.activePolygon;
    }
    delete this.selectedPolygon;
  }

  selectPolygon(polygon: Polygon, evt: MouseEvent) {
    if (this.activePolygon) {
      this.activePolygon.parentNode.removeChild(this.activePolygon);
      delete this.activePolygon;
    }
    evt.preventDefault();
    this.selectedPolygon = polygon;
    delete this.selectedCircle;
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      if (this.selectedCircle) {
        this.circles.splice(this.circles.indexOf(this.selectedCircle), 1);
        delete this.selectedCircle;
      } else if (this.selectedPolygon) {
        this.polygons.splice(this.polygons.indexOf(this.selectedPolygon), 1);
        delete this.selectedPolygon;
      }
    }

    if (event.key === 'Escape') {
      if (this.activePolygon) {
        this.activePolygon.parentNode.removeChild(this.activePolygon);
      }
      if (this.activeCircle) {
        this.activeCircle.parentNode.removeChild(this.activeCircle);
      }
      delete this.activePolygon;
      delete this.activeCircle;
    }
  }

  save() {
    console.log({
      circles: this.circles,
      polygons: this.polygons,
    });
  }

  mouseMove(evt: MouseEvent) {
    if (this.mouseDownEvent && this.activeCircle) {
      const deltaX = Math.abs(evt.clientX - this.mouseDownEvent.clientX);
      const deltaY = Math.abs(evt.clientY - this.mouseDownEvent.clientY);
      const r = deltaX > deltaY ? deltaX : deltaY;

      this.activeCircle.setAttribute('r', r.toString());
    }
  }
}

class Circle {
  x: number;
  y: number;
  radius: number;
  fill?: string;
}

class Point {
  x: number;
  y: number;
}

class Polygon {
  points: Point[];
}
