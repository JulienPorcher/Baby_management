import { useEffect, useState } from 'react';
import CategoryCard from './components/CategoryCard';
import AddEntryModal from './components/AddEntryModal';
import SettingsModal from './components/SettingsModal';
import { fetchLastEntries } from './utils/fetchLastEntries';
import { sendToGoogleSheet } from './utils/sendToSheet';

function App() {
  const [activeModal, setActiveModal] = useState(null); // "Repas" ou "Couche"
  const [showSettings, setShowSettings] = useState(false);
  const [lastEntries, setLastEntries] = useState({ repas: null, couche: null });
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer les dernières entrées depuis le Google Sheet
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLastEntries();
      setLastEntries(data);
    } catch (err) {
      console.error('Erreur lors du chargement des données :', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (formData) => {
    const data = Object.fromEntries(formData.entries());
    data.category = activeModal;

    try {
      console.log("Données envoyées à Google Sheet :", data);
      await sendToGoogleSheet(data);
      await loadData(); // Recharger les entrées après ajout
    } catch (err) {
      console.error('Erreur lors de l’envoi :', err);
    }

    setActiveModal(null);
  };

  const handleSaveSettings = (sheetPath, sheetURL) => {
    localStorage.setItem('sheetPath', sheetPath);
    localStorage.setItem('sheetURL', sheetURL);
  };

  // ✅ Bouton pour ouvrir la Google Sheet
  const handleOpenSheet = () => {
    const url = localStorage.getItem('sheetURL');
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Aucune URL de feuille définie dans les paramètres.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👶 Suivi Bébé</h1>
        <button onClick={() => setShowSettings(true)} className="text-gray-600 text-xl">
          ⚙️
        </button>
      </header>

      {isLoading ? (
        <p className="text-gray-500">Chargement des données...</p>
      ) : (
        <>
          <CategoryCard
            title="Repas"
            onAddClick={() => setActiveModal('Repas')}
            lastEntryTime={lastEntries.repas?.date}
            lastEntry={{
              datetime: lastEntries.repas?.date,
              type: lastEntries.repas?.type,
              amount: lastEntries.repas?.quantite,
              comments: lastEntries.repas?.commentaires,
            }}
            stats={['Lait maternel', 'Moy: 130ml', '5 repas']}
          />

          <CategoryCard
            title="Couche"
            onAddClick={() => setActiveModal('Couche')}
            lastEntryTime={lastEntries.couche?.date}
            lastEntry={{
              datetime: lastEntries.couche?.date,
              type: lastEntries.couche?.type,
              consistency: lastEntries.couche?.consistance,
              comments: lastEntries.couche?.commentaires,
            }}
            stats={['Caca', 'Molle', 'Moy: 6/j']}
          />
        </>
      )}

      <AddEntryModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        onSubmit={handleSubmit}
        category={activeModal}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        //onSave={(path) => localStorage.setItem('sheetPath', path)}
      />
      {/* ✅ Bouton "Voir le tableau Google Sheet" */}
      <div className="fixed bottom-4 w-full flex justify-center">
        <button
          onClick={handleOpenSheet}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          📄 Voir le tableau
        </button>
      </div>
    </div>
  );
}

export default App;
