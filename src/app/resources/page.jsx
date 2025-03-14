"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

const EventForm = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const departments = ['MUN', 'PD'];

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage('');

      // If we're editing an existing event
      if (editingEvent) {
        let updateData = {
          title: data.title,
          description: data.description,
          department: data.department,
          date: data.date
        };

        // Handle image update if a new one is provided
        if (data.image && data.image[0]) {
          const image = data.image[0];
          
          // Create unique filename
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;

          // Upload image to storage
          const { error: uploadError } = await supabase.storage
            .from('event-images')
            .upload(filePath, image, {
              cacheControl: '3600',
              upsert: false,
              contentType: image.type
            });

          if (uploadError) {
            throw new Error(`Upload error: ${uploadError.message}`);
          }

          // Get the public URL
          const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(filePath);

          updateData.image_url = publicUrl;
        }

        // Update the event
        const { error: updateError } = await supabase
          .from('events')
          .update(updateData)
          .eq('id', editingEvent.id);

        if (updateError) throw new Error(`Update error: ${updateError.message}`);

        setMessage('Event updated successfully!');
        setEditingEvent(null);
      } else {
        // Creating a new event
        if (!data.image || !data.image[0]) {
          throw new Error('Please select an image');
        }

        const image = data.image[0];
        
        // Create unique filename
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload image to storage
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(filePath, image, {
            cacheControl: '3600',
            upsert: false,
            contentType: image.type
          });

        if (uploadError) {
          throw new Error(`Upload error: ${uploadError.message}`);
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(filePath);

        // Create the event
        const { error: eventError } = await supabase
          .from('events')
          .insert({
            title: data.title,
            description: data.description,
            department: data.department,
            image_url: publicUrl,
            date: data.date
          });

        if (eventError) throw new Error(`Event insert error: ${eventError.message}`);

        setMessage('Event added successfully!');
      }
      
      reset();
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    
    // Populate form with event data
    setValue('title', event.title);
    setValue('description', event.description);
    setValue('department', event.department);
    setValue('date', event.date);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      
      // First, get the event to find the image URL
      const { data: eventData, error: fetchError } = await supabase
        .from('events')
        .select('image_url')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Extract the filename from the URL
      if (eventData.image_url) {
        const urlParts = eventData.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        // Delete the image from storage
        const { error: storageError } = await supabase.storage
          .from('event-images')
          .remove([fileName]);
        
        if (storageError) {
          console.error('Error deleting image:', storageError);
          // Continue with event deletion even if image deletion fails
        }
      }
      
      // Delete the event
      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      setMessage('Event deleted successfully!');
      fetchEvents(); // Refresh the events list
      
      // Clear form if the deleted event was being edited
      if (editingEvent && editingEvent.id === id) {
        setEditingEvent(null);
        reset();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setMessage(`Error deleting event: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
        {editingEvent ? 'Edit Event' : 'Add Event'}
      </h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="Event Title"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>
        <div>
          <textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Event Description"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="3"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>
        
        <div>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
        </div>

        <div>
          <select 
            {...register('department', { required: 'Department is required' })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <span className="text-red-500 text-sm">{errors.department.message}</span>}
        </div>

        <div>
          <input
            type="file"
            {...register('image', { required: !editingEvent })}
            accept="image/*"
            className="w-full p-2 dark:text-white"
          />
          {editingEvent && (
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Leave empty to keep the current image
            </p>
          )}
          {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {loading ? (editingEvent ? 'Updating...' : 'Adding...') : (editingEvent ? 'Update Event' : 'Add Event')}
          </button>
          
          {editingEvent && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Events List */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Events Management</h2>
        
        {events.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <div key={event.id} className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-700">
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Available';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs rounded">
                    {event.department}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2 dark:text-gray-300">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 dark:text-gray-300">
                    {event.description.length > 100 
                      ? `${event.description.substring(0, 100)}...` 
                      : event.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      disabled={deleting}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:bg-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventForm;