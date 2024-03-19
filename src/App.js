import './App.css';
import AppHeader from './components/AppHeader';

// primereact
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';

import Notes from './pages/Notes';
import { createContext, useEffect, useState } from 'react';

// context
export const NotesContext = createContext()

function App() {
  // state management
  const [notes, setNotes] = useState([])

  // effects
  useEffect(() => {
    console.log(notes)
  }, [notes])

  return (
    <div className="App">
      <PrimeReactProvider>
        <div className='app-bg' />
        <AppHeader />
        <NotesContext.Provider value={{ notes, setNotes }}>
          <Notes />
        </NotesContext.Provider>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
