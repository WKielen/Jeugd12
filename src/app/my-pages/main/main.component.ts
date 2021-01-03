import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  nbrTabs: number = 4;
  constructor() { }

  ngOnInit(): void {
  }


  // Ik heb werkelijk geen idee hoe dit werkt. Eerlijk gestolen van het internet.
  swipeCoord: any = 0;
  swipeTime: any = 0;
  selectedTab: number = 0;
  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        // console.info(swipe);
        if (swipe === 'next') {
          const isFirst = this.selectedTab === 0;
          if (this.selectedTab < (this.nbrTabs -1)) {
            this.selectedTab = isFirst ? 1 : this.selectedTab + 1;
          }
          // console.log("Swipe left - INDEX: " + this.selectedTab);
        } else if (swipe === 'previous') {
          const isLast = this.selectedTab === (this.nbrTabs - 2);
          if (this.selectedTab >= 1) {
            this.selectedTab = this.selectedTab - 1;
          }
          // console.log("Swipe right - INDEX: " + this.selectedTab);
        }
        // Do whatever you want with swipe
      }
    }
  }
}
