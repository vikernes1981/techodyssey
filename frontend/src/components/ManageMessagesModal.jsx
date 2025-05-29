import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageMessagesModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [confirmAction, setConfirmAction] = useState({ type: null, id: null, value: '' });

  useEffect(() => {
    if (open) fetchMessages();
  }, [open]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/messages');
      setMessages(res.data.messages || []);
    } catch {
      alert('Failed to fetch messages');
    }
    setLoading(false);
  };

  const handleUpdateClick = (id, content) => {
    setEditingId(id);
    setEditValue(content);
  };

  const confirmUpdate = (id, value) => {
    setConfirmAction({ type: 'update', id, value });
  };
  const confirmDelete = (id) => {
    setConfirmAction({ type: 'delete', id, value: '' });
  };

  const performUpdate = async () => {
    try {
      await axios.put(`/api/messages/${confirmAction.id}`, { content: confirmAction.value });
      setMessages((msgs) =>
        msgs.map((msg) =>
          msg.id === confirmAction.id ? { ...msg, content: confirmAction.value } : msg
        )
      );
      setEditingId(null);
      setEditValue('');
      setConfirmAction({ type: null, id: null, value: '' });
    } catch {
      alert('Failed to update message');
    }
  };

  const performDelete = async () => {
    try {
      await axios.delete(`/api/messages/${confirmAction.id}`);
      setMessages((msgs) => msgs.filter((msg) => msg.id !== confirmAction.id));
      setConfirmAction({ type: null, id: null, value: '' });
    } catch {
      alert('Failed to delete message');
    }
  };

  const handleClose = () => {
    setEditingId(null);
    setEditValue('');
    setConfirmAction({ type: null, id: null, value: '' });
    onClose();
  };

  if (!open) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
    <div className="bg-gray-900 text-green-400 rounded-2xl shadow-xl p-6 min-w-[380px] max-w-lg relative border border-green-700">
      <button
        className="absolute right-4 top-4 text-2xl text-green-700 hover:text-green-400"
        onClick={handleClose}
        aria-label="Close"
      >
        ×
      </button>
      <h2 className="text-xl font-bold mb-4 text-center text-green-300">Saved Messages</h2>
      {loading ? (
        <div className="text-center text-green-600">Loading...</div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-green-700">No messages saved.</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-center space-x-2 border border-green-800 rounded-xl px-3 py-2 shadow-sm bg-gray-800"
              >
                {editingId === msg.id ? (
                  <>
                    <input
                      className="flex-1 border border-green-700 bg-black text-green-400 rounded px-2 py-1 mr-2"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button
                      className="px-3 py-1 bg-green-700 text-green-100 rounded hover:bg-green-500 mr-1"
                      onClick={() => confirmUpdate(msg.id, editValue)}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-700 text-green-300 rounded hover:bg-gray-600"
                      onClick={() => {
                        setEditingId(null);
                        setEditValue('');
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-green-400 break-words">
                      {msg.content}
                    </span>
                    <button
                      className="px-3 py-1 bg-blue-900 text-green-100 rounded hover:bg-blue-700 mr-1"
                      onClick={() => handleUpdateClick(msg.id, msg.content)}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-red-900 text-green-100 rounded hover:bg-red-700"
                      onClick={() => confirmDelete(msg.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction.type && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-green-400 rounded-2xl shadow-lg p-6 min-w-[300px] max-w-xs border border-green-700">
            <div className="text-center text-lg mb-4">
              {confirmAction.type === 'delete'
                ? 'Are you sure you want to delete this message?'
                : 'Are you sure you want to update this message?'}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-1 bg-green-700 text-green-100 rounded hover:bg-green-500"
                onClick={() => {
                  if (confirmAction.type === 'update') performUpdate();
                  else if (confirmAction.type === 'delete') performDelete();
                }}
              >
                Confirm
              </button>
              <button
                className="px-4 py-1 bg-gray-700 text-green-300 rounded hover:bg-gray-600"
                onClick={() => setConfirmAction({ type: null, id: null, value: '' })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default ManageMessagesModal;

