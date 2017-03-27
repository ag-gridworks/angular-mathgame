import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameService } from './game/game.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
