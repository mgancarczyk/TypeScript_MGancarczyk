import {Form} from './form';
import {CheckboxField, RadioField, EmailField, DateField, TextAreaField, InputField} from './input';
import {SubmitButton} from './button';

class App{
    form: any;
    constructor(){
        this.form = new Form('formtest');
    }
    createPresetForm(): void{
        let imie = new InputField('text','imie');
        let nazwisko = new InputField('text','nazwisko');
        // let radio = new RadioField('radiofield','radio');
        let eLearning = new CheckboxField('elearn','e-learning');
        // let date = new DateField('datedield','date');
        let uwagi = new TextAreaField('area','uwagi');
        let email = new EmailField('email','email');

        this.form.button = new SubmitButton('submitButton', 'submit')
        this.form.fields.push(imie);
        this.form.fields.push(nazwisko);
        // this.form.fields.push(radio);
        this.form.fields.push(eLearning);
        // this.form.fields.push(date);
        this.form.fields.push(uwagi);
        this.form.fields.push(email);
        this.form.render();
    }
    
}   

new App().createPresetForm();