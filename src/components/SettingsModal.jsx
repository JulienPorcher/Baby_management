import { useEffect, useState } from 'react';
import { THEMES } from '../constants/themes';

export default function SettingsModal({ isOpen, onClose, onSave, onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('bgTheme') || 'bg-gray-100');

  useEffect(() => {
    // Appliquer le thème en cas d'ouverture avec un thème stocké
    onThemeChange(selectedTheme);
  }, [selectedTheme, onThemeChange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Paramètres</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const path = e.target.elements.sheetPath.value;
            const url = e.target.elements.sheetURL.value;
            const title = e.target.elements.appTitle.value || 'Suivi bébé';
            localStorage.setItem('bgTheme', selectedTheme);
            onSave(path, url, title);
            onThemeChange(selectedTheme);
            onClose();
          }}
        >
          <label className="block mb-4">
            Titre personnalisé :
            <input
              type="text"
              name="appTitle"
              defaultValue={localStorage.getItem('appTitle') || 'Suivi bébé'}
              className="w-full border p-2 rounded"
            />
          </label>

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

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Thème de couleur</h4>
            <div className="flex flex-wrap gap-3">
              {THEMES.map((theme, idx) => (
                <label
                  key={idx}
                  className="cursor-pointer"
                  title={theme.name}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme.className}
                    checked={selectedTheme === theme.className}
                    onChange={() => setSelectedTheme(theme.className)}
                    className="hidden"
                  />
                  <div
                    className={`w-8 h-8 rounded-full border-2 transition 
                      ${theme.className} 
                      ${selectedTheme === theme.className ? 'border-black scale-110' : 'border-transparent'}
                    `}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              type="button"
              className="text-gray-600 hover:underline"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
