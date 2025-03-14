'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';


export default function TeamMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase.from('team_members').select('*');
      if (!error) setMembers(data);
    };

    fetchMembers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <img
              src={member.photo_url}
              alt={member.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">{member.name}</h2>
            <p className="text-gray-600">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
