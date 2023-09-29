import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class AuthForms {

    public buildForm( formBuild: FormBuilder ):FormGroup{

        return formBuild.group({
            email   : [ '', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            password: [ '', [Validators.required, Validators.minLength(6)] ],
        });

    }
}