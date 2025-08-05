import { useEffect, useState } from 'react';
import CategoryCard from './components/CategoryCard';
import AddEntryModal from './components/AddEntryModal';
import SettingsModal from './components/SettingsModal';
import useStats from './hooks/useStats';
import { fetchLastEntries } from './utils/fetchLastEntries';
import { sendToGoogleSheet } from './utils/sendToSheet';

function App() {
  const [activeModal, setActiveModal] = useState(null); // "Repas" ou "Couche"
  const [showSettings, setShowSettings] = useState(false);
  const [lastEntries, setLastEntries] = useState({ repas: null, couche: null });
  const [isLoading, setIsLoading] = useState(true);
  const [bgTheme, setTheme] = useState(localStorage.getItem('bgTheme') || 'bg-gray-100');
  const [appTitle, setAppTitle] = useState(localStorage.getItem('appTitle') || 'Suivi bébé');

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

  const handleSaveSettings = (sheetPath, sheetURL, title) => {
    localStorage.setItem('sheetPath', sheetPath);
    localStorage.setItem('sheetURL', sheetURL);
    localStorage.setItem('appTitle', title);
    setAppTitle(title);
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

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('bgTheme', newTheme);
  }
  //Gestion des stats
  const scriptURL = localStorage.getItem('sheetPath'); // L'URL configurée dans les paramètres
  const { stats, loading, error } = useStats(scriptURL);
  const repasStats = stats.repas || [];
  const coucheStats = stats.couche || [];
  const bainStats = stats.bain || [];
  const peseeStats = stats.pesée || [];

  ;
  return (
    <div className={`min-h-screen ${bgTheme} p-4 max-w-xl mx-auto`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👶 {appTitle}</h1>
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
            stats={repasStats}
          />

          <CategoryCard
            title="Couche"
            onAddClick={() => setActiveModal('Couche')}
            lastEntryTime={lastEntries.couche?.date}
            lastEntry={{
              datetime: lastEntries.couche?.date,
              type: lastEntries.couche?.type,
              volume: lastEntries.couche?.volume,
              comments: lastEntries.couche?.commentaires,
            }}
            stats={coucheStats}
          />
          <CategoryCard
            title="Bain"
            onAddClick={() => setActiveModal('Bain')}
            lastEntryTime={lastEntries.bain?.date}
            lastEntry={{
              datetime: lastEntries.bain?.date,
              comments: lastEntries.bain?.commentaires,
            }}
            stats={bainStats}
          />
          <CategoryCard
            title="Pesée"
            onAddClick={() => setActiveModal('Pesée')}
            lastEntryTime={lastEntries.pesée?.date}
            lastEntry={{
              datetime: lastEntries.pesée?.date,
              poids: lastEntries.pesée?.poids,
              comments: lastEntries.pesée?.commentaires,
            }}
            stats={peseeStats}
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
        onThemeChange={handleThemeChange}
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
