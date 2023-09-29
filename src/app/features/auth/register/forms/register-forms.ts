import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterForms {

    public buildForm( formBuild: FormBuilder ):FormGroup{

        return formBuild.group({
            name    : [ '', [Validators.required] ],
            birthDay: [ '', [Validators.required] ],
            phone   : [ '', [Validators.required] ],
            email   : [ '', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            password: [ '', [Validators.required, Validators.minLength(6)] ],
        });

    }
    
}