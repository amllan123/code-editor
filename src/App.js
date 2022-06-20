
import {BrowserRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Editorpage from './pages/Editorpage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (


<>

<div>
  <Toaster position='top-right'
  
  toastOptions={{
   success:{
    theme:{

      primary:'rgb(79, 250, 0)'
    },

   },

  }}
  >
    

  </Toaster>
</div>
<Router>
<Routes>
<Route  exact path="/" element={<Home/>}/>
<Route exact path="/editor/:roomid" element={<Editorpage/>}></Route>






</Routes>


</Router>





</>
  );
}

export default App;
