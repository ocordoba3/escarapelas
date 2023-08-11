import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MenuComponent } from "../menu/menu.component";
import { Font, Orientation, TagData } from "../interfaces/interfaces";
import domToImage from "dom-to-image";
import * as print from "print-js";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone: true,
  imports: [
    CdkDrag,
    CommonModule,
    MenuComponent
  ]
})
export class CreateComponent {

  @ViewChild('pdfCard') pdfCard!: ElementRef<HTMLElement>;
  tags: TagData[] = [];
  selected_tag!: TagData;
  orientation: Orientation = "start";
  font: Font = "Lato";
  showHeader: boolean = false;
  showFooter: boolean = false;
  height_value: string = "100%";

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

  printPdf(el: any) {
    print({
      printable: el,
      type: "image",
      showModal: true, // Optional
      modalMessage: "Printing...", // Optional
      style: "img { width: 100%;}",
    });
  }

  async exportPDF() {
    let el = undefined;
    await domToImage.toPng(this.pdfCard.nativeElement)
      .then((dataUrl) => el = dataUrl)
      .catch((error) => console.error('oops, something went wrong!', error))
    if (el) {
      console.log(el)
      this.printPdf(el);
    }
  }

}
