'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Globe, MessageSquare, Edit, Trash2, Plus, Flag, Bell, Shield, CheckCircle, XCircle } from 'lucide-react';

const contactTypes = ['Family', 'Friend', 'Caregiver', 'Emergency Contact'];
const languages = ['English', 'Hindi', 'Urdu', 'Bengali', 'Tamil', 'Telugu'];
const priorities = ['Primary', 'Secondary', 'Tertiary'];

const mockContacts = [
  { id: '1', name: 'Priya Sharma', type: 'Family', language: 'Hindi', priority: 'Primary', phone: '+91 98765 43210', email: 'priya@email.com' },
  { id: '2', name: 'Dr. Rajesh Kumar', type: 'Caregiver', language: 'English', priority: 'Secondary', phone: '+91 98765 43211', email: 'dr.rajesh@hospital.com' },
  { id: '3', name: 'Amit Patel', type: 'Friend', language: 'Gujarati', priority: 'Secondary', phone: '+91 98765 43212', email: 'amit@email.com' },
  { id: '4', name: 'Emergency Services', type: 'Emergency Contact', language: 'English', priority: 'Primary', phone: '112', email: '' },
];

export function TrustedContactDemo() {
  const [contacts, setContacts] = useState(mockContacts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Family', language: 'English', priority: 'Primary', phone: '', email: '' });

  const handleAdd = () => {
    if (!formData.name || !formData.phone) return;
    const newContact = {
      id: Date.now().toString(),
      ...formData,
    };
    setContacts([...contacts, newContact]);
    setFormData({ name: '', type: 'Family', language: 'English', priority: 'Primary', phone: '', email: '' });
    setShowAdd(false);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, ...formData } : c));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const startEdit = (contact: typeof mockContacts[0]) => {
    setFormData({ ...contact });
    setEditingId(contact.id);
  };

  return (
    <section
      id="trusted-contacts"
      className="relative py-24 lg:py-32"
      aria-labelledby="contacts-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">PRODUCT DEMO</span>
          <h2 id="contacts-heading" className="section-heading mb-6">
            TRUSTED CONTACTS — INTERACTIVE DEMO
          </h2>
          <p className="section-subheading mx-auto">
            Realistic contact management with priority, language preference, and contact type. Demonstrates Guardian's multilingual emergency messaging foundation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-glass overflow-hidden">
            <div className="p-6 border-b border-border-primary flex items-center justify-between">
              <h3 className="font-semibold text-foreground-primary flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                Trusted Contacts
              </h3>
              <span className="status-badge status-working-prototype">WORKING PROTOTYPE</span>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className={cn(
                      'p-4 rounded-xl bg-background-elevated border transition-all',
                      editingId === contact.id ? 'border-accent-cyan/50 bg-accent-cyan/5' : 'border-border-primary'
                    )}
                  >
                    {editingId === contact.id ? (
                      <div className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="label">Name</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="input"
                              placeholder="Contact name"
                            />
                          </div>
                          <div>
                            <label className="label">Phone</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="input"
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div>
                            <label className="label">Contact Type</label>
                            <select
                              value={formData.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                              className="input"
                            >
                              {contactTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="label">Preferred Language</label>
                            <select
                              value={formData.language}
                              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                              className="input"
                            >
                              {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="label">Priority</label>
                            <select
                              value={formData.priority}
                              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                              className="input"
                            >
                              {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave(contact.id)} className="btn btn-primary btn-sm">Save</button>
                          <button onClick={() => setEditingId(null)} className="btn btn-secondary btn-sm">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground-primary">{contact.name}</h4>
                              <span className={cn('status-badge text-xs', contact.priority === 'Primary' ? 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30')}>
                                {contact.priority}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-foreground-tertiary mt-1">
                              <span className="flex items-center gap-1">
                                <Flag className="w-3 h-3" aria-hidden="true" />
                                {contact.language}
                              </span>
                              <span className="flex items-center gap-1">
                                <Shield className="w-3 h-3" aria-hidden="true" />
                                {contact.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => startEdit(contact)} className="p-2 rounded-lg hover:bg-background-tertiary transition-colors" aria-label={`Edit ${contact.name}`}>
                            <Edit className="w-4 h-4 text-foreground-tertiary" />
                          </button>
                          <button onClick={() => handleDelete(contact.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" aria-label={`Remove ${contact.name}`}>
                            <Trash2 className="w-4 h-4 text-accent-red" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => { setFormData({ name: '', type: 'Family', language: 'English', priority: 'Primary', phone: '', email: '' }); setShowAdd(true); }}
                className="btn btn-secondary w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Add Contact
              </button>
            </div>

            {showAdd && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-border-primary bg-background-secondary/50"
              >
                <h4 className="font-semibold text-foreground-primary mb-4">Add New Contact</h4>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="label">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input" placeholder="Contact name" autoFocus />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="label">Contact Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="input">
                      {contactTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Preferred Language</label>
                    <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="input">
                      {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Priority</label>
                    <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="input">
                      {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAdd} className="btn btn-primary btn-sm">Add Contact</button>
                  <button onClick={() => setShowAdd(false)} className="btn btn-secondary btn-sm">Cancel</button>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20"
          >
            <h4 className="font-semibold text-accent-cyan mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" aria-hidden="true" />
              Multilingual Emergency Messaging
            </h4>
            <p className="text-foreground-secondary mb-4">
              When an emergency triggers, Guardian generates structured messages per recipient's preferred language:
            </p>
            <div className="space-y-3">
              {contacts.filter(c => c.language !== 'English').map((contact) => (
                <div key={contact.id} className="p-4 rounded-lg bg-background-elevated border border-border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-foreground-primary">{contact.name}</span>
                    <span className="status-badge text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">{contact.language}</span>
                  </div>
                  <div className="font-mono text-sm text-foreground-tertiary bg-background-primary/50 p-3 rounded">
                    {contact.language === 'Hindi' && '🚨 आपातकाल: प्रिया, आपात स्थिति का पता चला। स्थान: 28.6139° N, 77.2090° E। जोखिम: HIGH। कृपया प्रतिक्रिया दें।'}
                    {contact.language === 'Urdu' && '🚨 ایمرجنسی: امید، ہنگامی صورت حال دریافت شد۔ مقام: 28.6139° N, 77.2090° E۔ خطرہ: HIGH۔ براہ کرم جواب دیں۔'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}