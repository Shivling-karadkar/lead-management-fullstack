import React from 'react';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';

export default function App() {
  const [refreshKey, setRefreshKey] = React.useState(0);
  return (
    <div className="container">
      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:20}}>
        <div>
          <h2 style={{marginBottom:12}}>Add Lead</h2>
          <LeadForm onAdded={() => setRefreshKey(k=>k+1)} />
        </div>
        <div>
          <h2 style={{marginBottom:12}}>Leads</h2>
          <LeadList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
