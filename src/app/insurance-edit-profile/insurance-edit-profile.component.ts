import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { UserService } from '../service/user.service';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthenticationService } from '../service/authentication.service';
import { Ad } from '../models/ad.model';
import { User } from '../models/user.model';


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-insurance-edit-profile',
  templateUrl: './insurance-edit-profile.component.html',
  styleUrls: ['./insurance-edit-profile.component.css'],
})


export class InsuranceEditProfileComponent implements OnInit {
  editForm: FormGroup;
  Securityform: FormGroup;
  
  userDetail: User = <User>{};

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenStorageService,
    private authService: AuthenticationService
  ) {
    this.editForm = fb.group(
      {
        fname: ['', [Validators.required]],
        lname: ['', [Validators.required]],
        t_number: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+94-?)|0)?[0-9]{10}$'),
          ],
        ],
        address: ['', [Validators.required]],
        cur_password: ['', [Validators.required]],
        new_password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required]],
      }
    );
    this.Securityform = fb.group({
      cur_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
    },
    {
      validator: MustMatch('new_password', 'confirm_password'),
    });
  }

  ngOnInit() {
    this.userDetail = this.tokenService.getUser();
    // console.log(this.adDetail.imgId)
    // console.log(this.userDetail)
    // this.authService.getCurrentUser().subscribe(res => {
    //   this.userDetail = res;
    // })

    this.editForm.patchValue({
      fname: this.userDetail.fname,
      lname: this.userDetail.lname,
      t_number: this.userDetail.tnumber,
      address: this.userDetail.address,
    });
  }

  get fname() {
    return this.editForm.get('fname');
  }
  get t_number() {
    return this.editForm.get('t_number');
  }
  get address() {
    return this.editForm.get('address');
  }
  get lname() {
    return this.editForm.get('lname');
  }
  get new_password() {
    return this.Securityform.get('new_password');
  }
  get cur_password() {
    return this.Securityform.get('cur_password');
  }
  get confirm_password() {
    return this.Securityform.get('confirm_password');
  }
  onSubmit() {
    console.log('workng submit editprofile');
    const editform = {
      fname: this.fname.value,
      tnumber: this.t_number.value,
      address: this.address.value,
      username: this.userDetail.username,
      lname: this.lname.value,
      nic: this.userDetail.nic,
      password:this.userDetail.password,
      role:this.userDetail.role,
      cName:this.userDetail.cName,
      regNum:this.userDetail.regNum,
      imgId:this.userDetail.imgId
    };
    console.log(editform )
    this.userService.editProfile(editform).subscribe({
      next: (res) => {
        console.log(res);
        this.userService.showSuccess(res);
      },
      error: (err) => {
        console.log(err);
        this.userService.shoeErr(err);
      },
    });
  }

  onChangePassword() {
    console.log("button")
    const sec_data = {
      fname : this.userDetail.fname,
      lname : this.userDetail.lname,
      username : this.userDetail.username,
      tnumber : this.userDetail.tnumber,
      nic : this.userDetail.nic,
      password: this.new_password.value,
      role :this.userDetail.role,
      cName :this.userDetail.cName,
      address :this.userDetail.address,
      regNum :this.userDetail.regNum,
      imgId : this.userDetail.imgId
    }
    this.userService.changePassword(sec_data,this.cur_password.value).subscribe({next : (res) =>{
      this.userService.showSuccess(res);
    },
  error : (err) =>{
    this.userService.shoeErr(err);
  }})
  }
}
