import './assets/styles/App.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './assets/styles/custom.scss';
import { Card } from 'primereact/card';
import { Table, FormGroup, Navbar, Footer } from './components';
import { useEffect, useRef, useState } from 'react';
import useStore from './store';
import { Toast } from 'primereact/toast';

function App() {
  const [formState, setFormState] = useState(false),
    toast = useRef<Toast>(null),
    dispatchData = useStore((state) => state.dispatchData),
    dispatchArea = useStore((state) => state.dispatchArea),
    dispatchProvince = useStore((state) => state.dispatchProvince),
    dispatchSize = useStore((state) => state.dispatchSize),
    [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatchData();
    dispatchArea();
    dispatchProvince();
    dispatchSize();
  }, []);

  return (
    <div className="App">
      <Toast ref={toast} position="bottom-right" />
      <header>
        <Navbar />
      </header>
      <main>
        <FormGroup
          formState={formState}
          setFormState={setFormState}
          editData={editData}
          setEditData={setEditData}
          toast={toast}
        />
        <Card className="main-content">
          <Table
            formState={formState}
            setFormState={setFormState}
            setEditData={setEditData}
            toast={toast}
          />
        </Card>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
