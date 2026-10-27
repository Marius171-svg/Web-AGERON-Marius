// Écrit un cookie avec une durée de vie
function setCookie(name, value, days = 30) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/`;
}

// Récupère la valeur d'un cookie par son nom (retourne null si non trouvé)
function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split(';') : [];
  for (let c of cookies) {
    const [key, ...val] = c.trim().split('=');
    if (key === name) {
      return decodeURIComponent(val.join('='));
    }
  }
  return null;
}

// Supprime un cookie en forçant sa date d'expiration à 0
function deleteCookie(name) {
  document.cookie = `${name}=; max-age=0; path=/`;
}

// État réactif de l'application, l'affichage se met à jour quand les données changent
function todoApp() {
  return {
    darkMode: false,
    dyslexie: false,
    texteNouvelleTache: '',
    taches: [],

    // Chargement initial des préférences et données sauvegardées
    init() {
      const savedTheme = localStorage.getItem('theme') || getCookie('theme');
      this.darkMode = savedTheme === 'dark';

      const savedDyslexie = localStorage.getItem('dyslexie') || getCookie('dyslexie');
      this.dyslexie = savedDyslexie === 'true';

      // Programmation try/catch pour éviter un crash si le json est pas valide
      const savedTaches = localStorage.getItem('taches');
      this.taches = savedTaches ? JSON.parse(savedTaches) : [];
    },

    // Bascule l'état et synchronise le stockage on a localStorage + cookie
    DarkMode() {
      this.darkMode = !this.darkMode;
      const themeValue = this.darkMode ? 'dark' : 'light';

      localStorage.setItem('theme', themeValue);
      setCookie('theme', themeValue, 30);
    },

    Dyslexie() {
      this.dyslexie = !this.dyslexie;
      const dyslexieValue = this.dyslexie ? 'true' : 'false';

      localStorage.setItem('dyslexie', dyslexieValue);
      setCookie('dyslexie', dyslexieValue, 30);
    },

    // Valide cette saisie génère un identifiant et persiste la nouvelle tâche
    ajouterTache() {
      const saisie = this.texteNouvelleTache.trim();
      if (!saisie) return;

      this.taches.push({
        id: Date.now(),
        texte: saisie,
        terminee: false
      });

      this.texteNouvelleTache = '';
      this.sauvegarderTaches();
    },

    // Supprime un élément par son index puis met à jour le stockage
    supprimerTache(index) {
      this.taches.splice(index, 1);
      this.sauvegarderTaches();
    },

    // Sauvegarde synchrone de l'état actuel sous forme de chaîne json
    sauvegarderTaches() {
      localStorage.setItem('taches', JSON.stringify(this.taches));
    },

    // Comptent les éléments selon leur statut
    totalTerminees() {
      return this.taches.filter(t => t.terminee).length;
    },

    totalRestantes() {
      return this.taches.filter(t => !t.terminee).length;
    },
  };
}