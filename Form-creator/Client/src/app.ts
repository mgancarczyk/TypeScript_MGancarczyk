import {Form} from './form';
import {CheckboxField, RadioField, EmailField, DateField, TextAreaField, InputField, SelectField} from './input';
import {SubmitButton} from './button';
import './styles/styles.scss';

class App{
    form: any;
    constructor(){
        this.form = new Form('formtest');
    }
    createPresetForm(): void{
        let imie = new InputField('text','Imie: ');
        let nazwisko = new InputField('text','Nazwisko: ');
        // let radio = new RadioField('radiofield','radio');
        let eLearning = new CheckboxField('elearn','E-learning: ');
        let plec = new CheckboxField('km', 'Płeć: ');
        // let date = new DateField('datedield','date');
        let uwagi = new TextAreaField('area','Uwagi: ');
        let email = new EmailField('email','Email: ');
        let kraj = new SelectField('country', 'Kraj: ');
        let next = new InputField('text', 'next')

        this.form.button = new SubmitButton('submitButton', 'submit')
        this.form.fields.push(imie);
        this.form.fields.push(nazwisko);
        this.form.fields.push(plec);
        // this.form.fields.push(radio);
        this.form.fields.push(eLearning);
        // this.form.fields.push(date);
        this.form.fields.push(uwagi);
        this.form.fields.push(email);
        this.form.fields.push(kraj);
        // this.form.fields.push(next);
        this.form.render();
    }
    
}   

new App().createPresetForm();


