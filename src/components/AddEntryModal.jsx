export default function AddEntryModal({ isOpen, onClose, onSubmit, category }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Ajouter {category}</h3>
        {/* Formulaire simplifié, à compléter */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(new FormData(e.target));
            onClose();
          }}
        >
          

          {category === 'Repas' && (
            <>
              <label className="block mb-2">
                Date/Heure :
                <input type="datetime-local" name="date" className="w-full border p-2 rounded" required />
              </label>
              <label className="block mb-2">
                Type :
                <select name="type" className="w-full border p-2 rounded">
                  <option>Biberon</option>
                  <option>Solide</option>
                </select>
              </label>
              <label className="block mb-2">
                Quantité (ml/g) :
                <input type="number" name="amount" className="w-full border p-2 rounded" />
              </label>
              <label className="block mb-2">
                Commentaires :
                <input type="text" name="comments" className="w-full border p-2 rounded" />
              </label>
            </>
          )}

          {category === 'Couche' && (
            <>
              <label className="block mb-2">
                Date/Heure :
                <input type="datetime-local" name="date" className="w-full border p-2 rounded" required />
              </label>
              <label className="block mb-2">
                Type :
                <select name="type" className="w-full border p-2 rounded">
                  <option>Urine</option>
                  <option>Selles</option>
                  <option>Mixte</option>
                </select>
              </label>
              <label className="block mb-2">
                Quantité :
                <select name="volume" className="w-full border p-2 rounded">
                  <option>Petit</option>
                  <option>Normal</option>
                  <option>Grand</option>
                </select>
              </label>
              <label className="block mb-2">
                Commentaires :
                <input type="text" name="comments" className="w-full border p-2 rounded" />
              </label>
            </>
          )}
          {category === 'Bain' && (
            <>
              <label className="block mb-2">
                Date/Heure :
                <input type="date" name="date" className="w-full border p-2 rounded" required />
              </label>
              <label className="block mb-2">
                Commentaires :
                <input type="text" name="comments" className="w-full border p-2 rounded" />
              </label>
            </>
          )}
          {category === 'Pesée' && (
            <>
              <label className="block mb-2">
                Date/Heure :
                <input type="date" name="date" className="w-full border p-2 rounded" required />
              </label>
              <label className="block mb-2">
                Poids (kg) :
                <input type="number" name="poids" className="w-full border p-2 rounded" />
              </label>
              <label className="block mb-2">
                Commentaires :
                <input type="text" name="comments" className="w-full border p-2 rounded" />
              </label>
            </>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="text-gray-600">
              Annuler
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-lg">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
