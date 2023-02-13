import {Injectable} from "@angular/core";

export  interface Menu{
  state:string;
  name:string;
  icon:string;
  role:string;
}
const MENU_ITEMS =[
  {
    state:'dashboard',
    name:'Dashboard',
    icon:'dashboard',
    role:''
  },
  {
    state:'members',
    name:'Manage Members',
    icon:'people',
    role:'admin'
  }


]
@Injectable()
export  class MenuItem{
  getMenuItem():Menu[]{
    return MENU_ITEMS;
  }
}
