import { defineConfig } from "vite";
import { resolve } from "path"; //permet de résoudre le chemin du fichier d'entrée

export default defineConfig({
  root: "./src", //racine du projet
  build: {
    outDir: "../dist", //répertoire de sortie
    emptyOutDir: true, //Si n'existe pas vite va creer le repertoire dist, sinon il va vider le répertoire  avant de construire}
    rollupOptions: {
      // permet a vite de savoir quel fichier html il doit prendre comme point d'entrée
      input: {
        index: resolve(__dirname, "src/index.html"), //fichier d'entrée
        form: resolve(__dirname, "src/form/form.html"),
        contact: resolve(__dirname, "src/contact/contact.html"), //fichier d'entrée
      },
    },
  },
});
