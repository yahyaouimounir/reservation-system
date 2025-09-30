const ressource = require('../models/ressources');

exports.createRessource = (req, res, next) => {
    const ressourceData = req.body ;
    const newRessource = new ressource({ 
        ...ressourceData,
    });
    newRessource.save()
    .then (() => res.status(201).json({ message: 'Ressource created !'}))
        .catch((error)=>{
            console.log('Erreur création ressource:', error);
            res.status(400).json({ error });
        });
    
}; 

exports.getAllRessources = (req, res, next) => {
    ressource.find()
    .then((ressources) => res.status(200).json(ressources))
    .catch((error) => res.status(400).json({ error }));
}
exports.getressource = (req, res, next) => {
    ressource.findOne({ _id: req.params.id })
    .then((ressource) => res.status(200).json(ressource))
    .catch((error) => res.status(404).json({ error }));
}
exports.modifyRessource = (req, res, next) => {
        console.log("ID reçu:", req.params.id);
        ressource.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
            .then(result => {
                console.log("Résultat update:", result);
                if (result.matchedCount === 0 && result.n === 0) {
                    return res.status(404).json({ error: "Ressource not found" });
                }
                res.status(200).json({ message: 'Ressource updated !'});
            })
            .catch((error) => res.status(400).json({ error }));
} 
exports.deleteRessource = (req,res,next) =>{ 
    ressource.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Ressource deleted !'}))
    .catch((error) => res.status(400).json({ error }));
}

