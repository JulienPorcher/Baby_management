export default function SettingsModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Paramètres</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const path = e.target.elements.sheetPath.value;
            const url = e.target.elements.sheetURL.value;
            onSave(path,url);
            onClose();
          }}
        >
          <label className="block mb-4">
            URL App Script :
            <input
              type="text"
              name="sheetPath"
              defaultValue={localStorage.getItem('sheetPath') || ''}
              className="w-full border p-2 rounded"
              required
            />
          </label>
          <label className="block mb-4">
            URL Google Sheet :
            <input
              type="text"
              name="sheetURL"
              defaultValue={localStorage.getItem('sheetURL') || ''}
              className="w-full border p-2 rounded"
              required
            />
          </label>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} type="button" className="text-gray-600">
              Annuler
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded-lg">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
