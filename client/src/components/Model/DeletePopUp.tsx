import React from 'react';

interface DeletePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ;
};

export default DeletePopUp;
