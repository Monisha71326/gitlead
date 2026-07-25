import React, { useEffect, useState } from 'react';
import { getLeads, createLead, deleteLead, markCalled } from './api';

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course_interest: '' });

  const loadLeads = async () => {
    const res = await getLeads();
    setLeads(res.data.results || res.data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    await createLead(form);
    setForm({ name: '', phone: '', email: '', course_interest: '' });
    loadLeads();
  };

  // Call button click pannumbodhu:
  // 1. tel: link mூlama phone dialer open aagum -> unga SIM la irundhe call pogum
  // 2. backend ku status update pannurom (last_called_at, status = contacted)
  const handleCall = async (lead) => {
    window.location.href = `tel:${lead.phone}`;
    try {
      await markCalled(lead.id);
      loadLeads();
    } catch (err) {
      console.error('mark_called failed', err);
    }
  };

  const handleDelete = async (id) => {
    await deleteLead(id);
    loadLeads();
  };

  return (
    <div className="container">
      <h2>IGT Lead Automation</h2>

      <form className="lead-form" onSubmit={handleAdd}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="course_interest" placeholder="Course Interest" value={form.course_interest} onChange={handleChange} />
        <button type="submit">Add Lead</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Status</th>
            <th>Last Called</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.course_interest}</td>
              <td>{lead.status}</td>
              <td>{lead.last_called_at ? new Date(lead.last_called_at).toLocaleString() : '-'}</td>
              <td>
                <button className="call-btn" onClick={() => handleCall(lead)}>📞 Call</button>
                <button className="delete-btn" onClick={() => handleDelete(lead.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
