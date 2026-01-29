'use client';

/**
 * Initialisation du cache de documents au démarrage de l'application.
 * Charge tous les documents JSON en mémoire pour éviter les requêtes répétées.
 */

import { useEffect } from 'react';
import { initializeDocumentCache } from '@/lib/utils/documentCache';

export function CacheInitializer() {
  useEffect(() => {
    let mounted = true;

    async function initCache() {
      try {
        console.log('🔄 Initialisation du cache de documents...');
        await initializeDocumentCache();
        if (mounted) {
          console.log('✅ Cache de documents initialisé avec succès');
        }
      } catch (error) {
        console.error('❌ Échec de l\'initialisation du cache de documents:', error);
      }
    }

    initCache();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
