import { Component, effect, ElementRef, EventEmitter, Input, Output, QueryList, signal, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-tab-slider',
  imports: [],
  templateUrl: './tab-slider.html',
  styleUrl: './tab-slider.css'
})
export class TabSlider {

  @Input() tabs: string[]= [];
  @Output() selectedTab = new EventEmitter<number>()
  @ViewChildren('tabEl') tabElements!: QueryList<ElementRef<HTMLElement>>;

  sliderWidth = signal(0);
  sliderLeft = signal(0);
  activeTab = signal(0);


  ngAfterViewInit() {
    //initial position of tab
    this.updateSlider(0);
  }

  selectTab(index: number) {
    this.activeTab.set(index);        
    this.updateSlider(index);

  }

  private updateSlider(index: number) {
    const tabEl = this.tabElements?.get(index)?.nativeElement;
    if (tabEl) {
      this.sliderLeft.set(tabEl.offsetLeft);
      this.sliderWidth.set(tabEl.offsetWidth);
      this.selectedTab.emit(index)
    }
  }
  
}
