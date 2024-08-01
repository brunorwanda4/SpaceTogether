"use client";

import { useState, FormEvent } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

interface User {
  name: string;
  email: string;
  age: number;
}

export default function Home() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const user: User = { name, email, age: parseInt(age) };
    try {
      const response = await invoke<{ message: string }>('insert_use', { user });
      console.log(response);
      alert(response.message);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input className=' input input-info' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input className=' input input-info' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input className=' input input-info' type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </label>
        </div>
        <button type="submit" className=' btn'>Update User</button>
      </form>
    </div>
  );
}
