import React, { useState } from 'react';
import { createLead } from '../api';

export default function LeadForm({ onAdded }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', source:'', status:'New' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits';
    if (!form.source) e.source = 'Source is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      const res = await createLead(form);
      setForm({ name:'', email:'', phone:'', source:'', status:'New' });
      onAdded && onAdded(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to save lead');
    }
  };

  return (
    <form onSubmit={submit} className="card" style={{display:'grid', gap:10}}>
      <div>
        <label>Name</label><br/>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #d1d5db'}}/>
        {errors.name && <div style={{color:'#b91c1c',fontSize:12}}>{errors.name}</div>}
      </div>

      <div>
        <label>Email</label><br/>
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #d1d5db'}}/>
        {errors.email && <div style={{color:'#b91c1c',fontSize:12}}>{errors.email}</div>}
      </div>

      <div>
        <label>Phone</label><br/>
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #d1d5db'}}/>
        {errors.phone && <div style={{color:'#b91c1c',fontSize:12}}>{errors.phone}</div>}
      </div>

      <div>
        <label>Source</label><br/>
        <select value={form.source} onChange={e=>setForm({...form,source:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #d1d5db'}}>
          <option value="">Select source</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Ad">Ad</option>
          <option value="Other">Other</option>
        </select>
        {errors.source && <div style={{color:'#b91c1c',fontSize:12}}>{errors.source}</div>}
      </div>

      <div>
        <label>Status</label><br/>
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #d1d5db'}}>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
        </select>
      </div>

      <div style={{textAlign:'right'}}>
        <button type="submit" style={{padding:'8px 14px',borderRadius:6,background:'#2563eb',color:'white',border:'none'}}>Save Lead</button>
      </div>
    </form>
  );
}
