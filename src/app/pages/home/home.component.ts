import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NotesService } from '../../core/services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';
import { Inotes } from '../../shared/interfaces/notes/inotes';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
private readonly notesService =inject(NotesService)
private readonly toastrService =inject(ToastrService)
notesdata:Inotes[]=[];
Idnotes!:string;
mytitle:string ='';
ngOnInit(): void {
  this.getallusernotes()

}
addnoteform:FormGroup= new FormGroup({
  title: new FormControl(null,[Validators.required]),
  content: new FormControl(null,[Validators.required]),
})
updatenoteform:FormGroup= new FormGroup({
  title: new FormControl(null,[Validators.required]),
  content: new FormControl(null,[Validators.required]),
})
getallusernotes():void{
  this.notesService.getusernote().subscribe({
    next:(res)=>{
      console.log(res.notes)
      this.notesdata=res.notes;

    },
    error:(err)=>{
      if(err.error.msg === 'not notes found'){
        this.notesdata=[];
      }
    }
  })
}
addsubmitnote():void{
  console.log(this.addnoteform.value)
  this.notesService.addnote(this.addnoteform.value).subscribe({
    next:(res)=>{
        console.log(res.note)
        this.getallusernotes()
        this.toastrService.success(res.msg,'Notify Team(esraa)')
        this.addnoteform.reset()
    }
  })
}
setUpdatedate(note:any,id:string):void{
  this.Idnotes=id;
  this.updatenoteform.patchValue({
    title:note.title,
    content:note.content
  })
}
submitupdatedateform():void{
  this.notesService.updatenote( this.updatenoteform.value,this.Idnotes).subscribe({
    next:(res)=>{
      console.log(res.note)
      this.getallusernotes()
      this.toastrService.success(res.msg,'Notify Team(esraa)')
    }
  })
}
deletenote(id:string):void{
this.notesService.deletenote(id).subscribe({
  next:(res)=>{
    console.log(res.note)
    this.getallusernotes()
    this.toastrService.success(res.msg,'Notify Team(esraa)')
  }
})
}
}
