import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInterface } from '../../services/interfaces/auth';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-users-admin',
  standalone: false,
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})
export class UsersAdminComponent implements OnInit {
  users: UserInterface[] = [];
  userForm: FormGroup;
  isEditing = false;
  currentUserId: number | null = null;
  loggedUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private popup: PopupService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: [''], // solo obligatorio en alta
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      number: ['', Validators.required],
      mySelf_description: [''],
      roleType: ['CLIENT', Validators.required]
    });
  }

  ngOnInit(): void {
    const session = sessionStorage.getItem('warmhelp_user');
    if (session) {
      this.loggedUserId = JSON.parse(session).id;
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  startEdit(user: UserInterface): void {
    this.isEditing = true;
    this.currentUserId = user.idUser;
    this.userForm.patchValue(user);
    this.userForm.get('password')?.setValue('');

    if (this.loggedUserId === user.idUser) {
      this.userForm.get('roleType')?.disable();
    } else {
      this.userForm.get('roleType')?.enable();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentUserId = null;
    this.userForm.reset({ roleType: 'CLIENT' });
    this.userForm.get('roleType')?.enable();
  }

  submit(): void {
    if (this.userForm.invalid) return;
    const formData = this.userForm.getRawValue();

    if (this.isEditing && this.currentUserId !== null) {
      if (this.currentUserId === this.loggedUserId) {
        delete formData.roleType;
      }

      this.userService.updateUser(this.currentUserId, formData).subscribe({
        next: () => {
          this.popup.showMessage('Actualizado', 'Usuario actualizado correctamente', 'success');
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          this.popup.showMessage('Error', err?.error?.message || 'Error al actualizar usuario', 'error');
        }
      });
    } else {
      if (!formData.password) {
        this.popup.showMessage('Error', 'La contraseña es obligatoria para crear usuario', 'error');
        return;
      }

      this.userService.addUser(formData).subscribe({
        next: () => {
          this.popup.showMessage('Creado', 'Usuario creado correctamente', 'success');
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          this.popup.showMessage('Error', err?.error?.message || 'Error al crear usuario', 'error');
        }
      });
    }
  }

  async deleteUser(id: number): Promise<void> {
    const confirm = await this.popup.showConfirmation(
      'Eliminar usuario',
      '¿Estás seguro de eliminar este usuario?',
      'Sí, eliminar',
      'Cancelar'
    );

    if (confirm) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.popup.showMessage('Eliminado', 'Usuario eliminado correctamente', 'success');
          this.loadUsers();
        },
        error: () => {
          this.popup.showMessage('Error', 'No se pudo eliminar el usuario', 'error');
        }
      });
    }
  }
}
