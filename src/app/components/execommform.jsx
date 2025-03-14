import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

const AddExecommMember = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const departments = ['MUN', 'PD'];
  const subDepartments = ['TND', 'LIT', 'GD'];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const photo = data.photo[0];
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}_${photo.name}`;

      const { error: uploadError } = await supabase.storage
        .from('team-photos')
        .upload(fileName, photo);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('team-photos')
        .getPublicUrl(fileName);

      const { error } = await supabase
        .from('execomm_members')
        .insert({
          name: data.name,
          department: data.department,
          sub_department: data.subDepartment,
          photo_url: publicUrl
        });

      if (error) throw error;

      setMessage('Member added successfully!');
      reset();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add ExeComm Member</h1>
      
      {message && <p className="mb-4">{message}</p>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register('name')}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />

        <select 
          {...register('department')}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select 
          {...register('subDepartment')}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Sub-Department</option>
          {subDepartments.map(subDept => (
            <option key={subDept} value={subDept}>{subDept}</option>
          ))}
        </select>

        <input
          type="file"
          {...register('photo')}
          accept="image/*"
          className="w-full p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

export default AddExecommMember;