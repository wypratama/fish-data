import './assets/styles/App.scss';
import { Card } from 'primereact/card';
import { Table, FormGroup } from './components';
import { useEffect, useState } from 'react';
import useStore from './store';

function App() {
  const [formState, setFormState] = useState(false),
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
      <main>
        <FormGroup
          formState={formState}
          setFormState={setFormState}
          editData={editData}
          setEditData={setEditData}
        />
        <Card>
          <Table
            formState={formState}
            setFormState={setFormState}
            setEditData={setEditData}
          />
        </Card>
      </main>
    </div>
  );
}

export default App;
