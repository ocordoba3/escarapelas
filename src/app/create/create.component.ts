import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MenuComponent } from "../menu/menu.component";
import { Font, Orientation, TagData, TagForm, Tags } from "../interfaces/interfaces";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CommonModule,
    MenuComponent
  ]
})
export class CreateComponent {

  tags: TagData[] = [];
  selected_tag!: TagData;
  orientation: Orientation = "start";
  font: Font = "Lato";
  showHeader: boolean = false;
  showFooter: boolean = false;
  height_value: string = "100%";

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getTags(tags: TagData[]) {
    this.tags = tags;
    this.showHeader = Boolean(tags.find((el) => el.tag === "header_image"));
    this.showFooter = Boolean(tags.find((el) => el.tag === "footer_image"));
    this.height_value = this.calculateHeightBox();
  }

  calculateHeightBox() {
    if (!this.showHeader && !this.showFooter) {
      return "100%";
    }
    if ((this.showHeader && !this.showFooter) || (!this.showHeader && this.showFooter)) {
      return "80%";
    }
    if (this.showHeader && this.showFooter) {
      return "62%";
    }
    return "100%";
  }

  setOrientation(orientation: Orientation) {
    this.orientation = orientation;
  }

  setFont(font: Font) {
    this.font = font;
  }

  handleSelection(item: TagData) {
    this.selected_tag = item;
  }
}
