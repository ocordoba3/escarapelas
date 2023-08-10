import { FormControl, FormArray, AbstractControl } from "@angular/forms";

export interface MenuForm {
    orientation: FormControl<Orientation>,
    tags: FormArray<AbstractControl<Tags, Tags>>,
}

export interface MenuData {
    orientation: Orientation,
    tags: TagForm[],
}

export interface TagForm {
    tag_label: FormControl<string>;
    tag: FormControl<Tags>;
    font_size: FormControl<number>;
    font: FormControl<Font>;
}

export interface TagData {
    tag_label: string;
    tag: Tags;
    font_size: number;
    font: Font;
}

export interface Options<T> {
    label: string;
    value: T;
}

export type Font = "Lato" | "Montserrat" | "Open Sans" | "Poppins" | "Roboto";

export type Orientation = "start" | "center" | "end" | "free";

export type Tags = "name" | "last_name" | "personal_id" | "company" | "role" | "id" | "qr" | "v_card";
