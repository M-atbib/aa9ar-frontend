"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function LegalPaper() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentName, setCurrentName] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleSaveFile = () => {
    if (!currentFile || !currentName) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Reset inputs
    setCurrentFile(null);
    setCurrentName("");
    setFileInputKey((prev) => prev + 1);
    toast.success("Document ajouté avec succès");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCurrentFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ajouter nouveau projet:
        <span className="ml-2 font-light">Document légal</span>
      </h1>

      <div className="w-[80%] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Nom du document légal</Label>
          <Input
            type="text"
            placeholder="ex: Titre foncier"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Fichier du document légal</Label>
          <div className="flex gap-2">
            <Input
              key={fileInputKey}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>
          <Button onClick={handleSaveFile} className="w-fit mt-2">
            Ajouter Document
          </Button>
          {/* {formData.legalPaper.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Documents ajoutés:</p>
              <ul className="list-disc list-inside">
                {formData.legalPaper.map((paper, index) => (
                  <li key={index} className="text-sm">
                    {paper.name}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          {currentFile && (
            <p className="text-sm text-green-600">
              Cliquez sur Ajouter pour sauvegarder le document:{" "}
              {currentFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
