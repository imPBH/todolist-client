import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  userName: string = '';
  newName: string = '';
  isEditing: boolean = false;
  updateError: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      this.userId = +userIdString;
    } else {
      console.error('userId is not available in localStorage.');
    }

    const userName = localStorage.getItem('username');
    if (userName) {
      this.userName = userName;
    } else {
      console.error('username is not available in localStorage.');
    }
  }

  editName(): void {
    this.newName = this.userName;
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.updateError = '';
  }

  saveName(): void {
    if (this.newName.trim() === '') {
      this.updateError = 'Name can not be empty.';
      return;
    }

    this.profileService.updateUserName(this.userId, this.newName).subscribe(
      () => {
        this.userName = this.newName;
        this.isEditing = false;
        this.updateError = '';
      },
      error => {
        console.error('Error:', error);
        this.updateError = 'Error while updating name.';
      }
    );
  }
}
