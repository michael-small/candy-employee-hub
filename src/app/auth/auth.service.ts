import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/User';

const API = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean = true;

  constructor(private http: HttpClient) { }

  // TODO: If this makes it into master as localhost and
  // not an env var, I will donate $5 to a charity
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API + '/users');
  }
}
