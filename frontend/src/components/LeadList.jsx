import React, { useEffect, useState } from 'react';
import { getLeads, deleteLead, updateLead } from '../api';

export default function LeadList({ refreshKey }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getLeads({ q });
      setLeads(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetch(); }, [refreshKey]);

  const remove = async (id) => {
    if (!window.confirm('Delete lead?')) return;
    await deleteLead(id);
    setLeads(leads.filter(l=>l._id!==id));
  };

  const changeStatus = async (id, status) => {
    const res = await updateLead(id, { status });
    setLeads(leads.map(l=> l._id===id ? res.data : l));
  };

  if (loading) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <div style={{display:'flex',gap:8, marginBottom:12}}>
        <input placeholder="Search name/email/phone" value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,padding:8,borderRadius:6,border:'1px solid #d1d5db'}}/>
        <button onClick={fetch} style={{padding:'8px 12px',borderRadius:6,border:'none',background:'#10b981',color:'white'}}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>
                <select value={lead.status} onChange={e=>changeStatus(lead._id, e.target.value)}>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                </select>
              </td>
              <td><button onClick={()=>remove(lead._id)} style={{padding:'6px 10px',borderRadius:6,background:'#ef4444',color:'white',border:'none'}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
