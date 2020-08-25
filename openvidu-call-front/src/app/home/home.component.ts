import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator';
 
const KattoTeema = [
  'Pelti',
  'Tiili',
  'Huopa',
  'Lukkosauma',
	'Konesauma',
	'Katto',
	'Kattoremontti',
	'Tasakatto',
	'Alumiinipeltikatto',
	'Kattopinnoite'
];

const DesiTeema = [
  'Desi',
  'Delta',
  'Puhdistusvaahto',
  'Lukkosauma',
	'Alfa',
	'Delta',
	'Automaatti',
	'Epsilon',
	'Omega',
	'Lambda'
];

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	public roomForm: FormControl;
	public version = require('../../../package.json').version;

	constructor(private router: Router, public formBuilder: FormBuilder) {}

	ngOnInit() {
    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
		const randomName = uniqueNamesGenerator({ dictionaries: [colors, DesiTeema, numberDictionary], length: 3, separator: '-', style: 'capital' });
		this.roomForm = new FormControl(randomName, [Validators.minLength(3), Validators.required]);
	}

	public goToVideoCall() {
		if (this.roomForm.valid) {
			const roomName = this.roomForm.value.replace(/ /g, '-'); // replace white spaces by -
			this.roomForm.setValue(roomName);
			this.router.navigate(['/', roomName]);
		}
	}
}
