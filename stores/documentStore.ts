import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { LegalPaper } from "@/types/project-type";

interface Document {
  id: string;
  name: string;
  entity_type: 'PROJECT' | 'UNIT';
  entity_id: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  
  uploadProjectDocuments: (projectId: string, documents: LegalPaper,type:string) => Promise<void>;
  getProjectDocuments: (projectId: string) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  resetState: () => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  isLoading: false,
  error: null,

  uploadProjectDocuments: async (projectId: string, document: LegalPaper, type: string) => {
    set({ isLoading: true, error: null });
    try {
      if (!(document.file instanceof File)) {
        throw new Error('The provided document does not contain a valid file');
      }
      const formData = new FormData();
      formData.append('file', document.file);
      formData.append('entity_type', 'PROJECT');
      formData.append('entity_id', projectId);
      formData.append('name', document.name);
      formData.append('type', type);

      console.log('FormData:', Array.from(formData.entries()));
      
  
      await fetchData('/documents/upload', {
        method: 'POST',
        body: formData,
        requiresAuth: true,
      });
  
      await useDocumentStore.getState().getProjectDocuments(projectId);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to upload documents',
        isLoading: false,
      });
      throw error;
    }
  },
  

  getProjectDocuments: async (projectId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Document[]>(`/documents/project/${projectId}`, {
        method: 'GET',
        requiresAuth: true,
      });

      set({
        documents: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch documents',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteDocument: async (documentId: string) => {
    set({ isLoading: true, error: null });
    try {
      await fetchData(`/documents/${documentId}`, {
        method: 'DELETE',
        requiresAuth: true,
      });

      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== documentId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete document',
        isLoading: false,
      });
      throw error;
    }
  },

  resetState: () => {
    set({
      documents: [],
      isLoading: false,
      error: null,
    });
  },
}));