import {Arena} from './Arena/Arena';
import { drawRandomSquare } from './Arena/Functions';
import { button } from './browser/browserElements';
import { drawRandomSquare } from './Arena/Functions';

Arena();

button.addEventListener('click',()=>{
  drawRandomSquare()
  
})






