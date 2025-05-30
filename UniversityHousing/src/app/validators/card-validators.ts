import {FormControl, ValidationErrors} from '@angular/forms';

export class CardValidators {
  static notOnlyWhiteSpace(control:FormControl): ValidationErrors | null {
    if ((control.value!=null)&&(control.value.trim().length===0)){
      return {'notOnlyWhiteSpace':true};
    }else {
      return null;
    }
  }
}
