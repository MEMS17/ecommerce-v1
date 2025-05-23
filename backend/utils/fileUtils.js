
const path = require("path");
const fs = require("fs");

exports.saveFile = async (file, fileName, destination, extensions = [], maxSize = 5) => {
        
    try {
        // Vérification de l'extension du fichier
        const fileExtension = path.extname(file.name).toLowerCase();
        if (extensions.length > 0 && !extensions.includes(fileExtension)) {
            throw new Error(`Extension de fichier non autorisée. Extensions autorisées : ${extensions.join(', ')}`);
        }

        // Vérification de la taille du fichier
        const size = maxSize * 1024 * 1024;
        if (file.size > size) {
            throw new Error(`La taille du fichier dépasse la limite autorisée de ${maxSize / (1024 * 1024)} Mo`);
        }

        // Création du dossier de destination s'il n'existe pas
        const publicDestination = path.join(__dirname, '../public', destination);
        await fs.promises.mkdir(publicDestination, { recursive: true });

        // Génération d'un nom de fichier unique avec l'extension
        const uniqueFileName = `${fileName}${fileExtension}`;
        const filePath = path.join(publicDestination, uniqueFileName);

        // Suppreesion du fichier s'il porte le même nom
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }

        // Ecriture du fichier dans le dossier de destination
        await fs.promises.writeFile(filePath, file.data);

        // Renvoie le chemin du fichier enregistré
        return uniqueFileName;

    }catch (error) {
        console.error('Erreur lors de la sauvegarde du fichier :', error);
        throw new Error('Erreur lors de la sauvegarde du fichier: ' + error.message);
    }
}