import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoggedInGuard: boolean = false;

  constructor(
    private auAuth: AngularFireAuth, 
    private toastr: ToastrService,
    private router: Router,
    ) { }

  login(email:any, password: any){
      this.auAuth.signInWithEmailAndPassword(email, password).then(logRef=>{
        this.toastr.success('Login successful..!');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true
        this.router.navigate(['/']);
      }).catch(e =>{
          this.toastr.warning(e);
      })
  }

  loadUser(){
    this.auAuth.authState.subscribe(user =>{
     localStorage.setItem('user',JSON.stringify(user));
      
    });
  }

  logOut(){
     this.auAuth.signOut().then(()=>{
       this.toastr.success('Loged out successfuly...');
       localStorage.removeItem('user');
       this.loggedIn.next(false);
       this.isLoggedInGuard = false;
       this.router.navigate(['/login']);
     })
  }
   
  isLoggedIn(){
      return this.loggedIn.asObservable();
  }
}
