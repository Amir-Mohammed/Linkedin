import { Component, OnInit } from "@angular/core";
import { User } from "src/_model/user";
import { UserService } from "../user.service";
import { AuthService } from "src/app/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-about-edit",
  templateUrl: "./about-edit.component.html",
  styleUrls: ["./about-edit.component.scss"]
})
export class AboutEditComponent implements OnInit {
  user: User = {};
  activeUser: User;
  aboutForm = new FormGroup({
    about: new FormControl()
  });
  constructor(
    public userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.activeUser.subscribe(res => {
      this.userService.getById(res.id).subscribe(user => {
        this.activeUser = user;
      });
    });
    this.route.params.subscribe(param => {
      this.userService.dataLoaded.subscribe(res => {
        if (res) {
          this.user = this.userService.getByUsername(param.username);
          if (!this.user) {
            this.router.navigate(["not-found"]);
          }
          if (this.user.about) {
            this.aboutForm.controls.about.setValue(this.user.about);
          }
        }
      });
    });
  }
  onSubmit() {
    this.user.about = this.aboutForm.controls.about.value;
    this.userService.save(this.user);
    console.log(this.user);
  }
}
