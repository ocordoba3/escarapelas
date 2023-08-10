import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Orientation, Options, Tags, Font, TagForm, MenuForm, TagData } from "../interfaces/interfaces";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class MenuComponent implements OnInit {

  @Input() selected_tag!: TagData;

  @Output() tags_to_render = new EventEmitter<TagData[]>();
  @Output() orientation = new EventEmitter<Orientation>();

  form!: FormGroup;
  tags_form!: FormGroup<TagForm>;
  tags_data: TagData[] = [];
  font_values: number[] = Array.from(new Array(41), (v, k) => k + 10);

  orientation_inputs: Options<Orientation>[] = [
    { label: "Izquierda", value: "start" },
    { label: "Centro", value: "center" },
    { label: "Derecha", value: "end" },
    { label: "Libre", value: "free" },
  ];

  font_inputs: Options<Font>[] = [
    { label: "Lato", value: "Lato" },
    { label: "Montserrat", value: "Montserrat" },
    { label: "Open Sans", value: "Open Sans" },
    { label: "Poppins", value: "Poppins" },
    { label: "Roboto", value: "Roboto" },
  ];

  tag_inputs: Options<Tags>[] = [
    { label: "Nombre", value: "name" },
    { label: "Apellidos", value: "last_name" },
    { label: "Identificación", value: "personal_id" },
    { label: "Empresa", value: "company" },
    { label: "Cargo", value: "role" },
    { label: "ID", value: "id" },
    { label: "QR", value: "qr" },
    { label: "vCard", value: "v_card" },
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      orientation: "start",
      tags: new FormArray([]),
    });
  }

  ngOnChanges(): void {
    if (this.selected_tag) {
      this.tags_form = this.fb.group<TagForm>({
        font: new FormControl("Roboto", { nonNullable: true }),
        font_size: new FormControl(10, { nonNullable: true }),
        tag: new FormControl(this.selected_tag.tag, { nonNullable: true }),
        tag_label: new FormControl(this.selected_tag.tag_label, { nonNullable: true }),
      })
    }
  }

  onCheckboxChange({ target }: Event, item: Options<Tags>) {
    const element = target as HTMLInputElement;
    const selected_tags = (this.form.controls['tags'] as FormArray);
    if (element.checked) {
      selected_tags.push(new FormControl(element.value));
      this.tags_data.push({
        font: "Roboto",
        font_size: 10,
        tag: item.value,
        tag_label: item.label
      })
    } else {
      const index = selected_tags.controls
        .findIndex(x => x.value === element.value);
      selected_tags.removeAt(index);
      this.tags_data = this.tags_data.filter((el) => el.tag !== item.value)
    }
    this.tags_to_render.emit(this.tags_data);
  }

  handleOrientation(event: Event) {
    this.orientation.emit((event.target as HTMLInputElement).value as Orientation);
  }

  save() {
    console.log(this.form.getRawValue());
    console.log(this.tags_form.getRawValue());
  }
}
