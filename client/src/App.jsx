import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import LoginView from './components/LoginView/LoginView';
import SignUpView from './components/SignUpView/SignUpView';
import PetSittersView from './components/PetSittersView/PetSittersView';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/signup' element={<SignUpView />} />
        <Route path='/petsitters' element={<PetSittersView />} />
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
