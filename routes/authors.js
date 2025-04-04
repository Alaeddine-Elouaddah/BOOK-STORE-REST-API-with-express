const express = require('express');
const router = express.Router();
router.use(express.json());
const Joi = require('joi');
const { Author } = require('../models/Author');

/**
 * @desc GET ALL AUTHORS
 * @router api/authors
 * @method GET
 * @acces public
 */

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: 'something went wrong !' });
  }
});
/**
 * @desc GET AUTHORS BY ID
 * @router api/authors
 * @method GET
 * @access public
 */
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'The author not found !' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong ' });
  }
});
/**
 * @desc  CREATE NEW BOOK
 * @router api/authors
 * @method POST
 * @access public
 */
router.post('/', async (req, res) => {
  // Définition du schéma de validation
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(10).required(),
    lastName: Joi.string().trim().min(3).max(10).required(),
    nationality: Joi.string().trim().min(3).max(10).required(),
    image: Joi.string().trim().min(3).max(10),
  });

  // Validation du corps de la requête
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Ajout du return pour stopper l'exécution si erreur
  }

  try {
    // Création du nouvel auteur
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image, // Corrigé ici
    });

    // Sauvegarde de l'auteur dans la base de données
    const result = await author.save();

    // Réponse de succès avec l'objet author créé
    res
      .status(201)
      .json({ message: 'Author created successfully', author: result });
  } catch (error) {
    // Gestion des erreurs avec un message plus détaillé
    console.log(error);
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
});

//

/**
 * @desc UPDATE Authors
 * @route /api/authors/
 * @method PUT
 * @acces public
 */
router.put('/:id', async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(10).required(),
    lastName: Joi.string().trim().min(3).max(10).required(),
    nationality: Joi.string().trim().min(3).max(10).required(),
    image: Joi.string().trim().min(3).max(10),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
});
/**
 * @desc DELETE AUTHOR BY ID
 * @route /api/authors:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (author) {
      author.delete();
      res.status(204).json({ message: 'Author deleted Succes' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
});
module.exports = router;
