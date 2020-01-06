const express = require('express');
const router = express.Router();
const PairRequest = require('../models/pairRequest');
const User = require('../models/user');
const mongoose = require('mongoose');
//const checkAuth = require('connect-ensure-login')

//Route to get one PairRequest
router.get('/:quoteId', (req, res, next) => {
PairRequest.findById(req.params.quoteId)
.exec()
.then(pairRequest => {
  if(!pairRequest) {
    return res.status(404).json({
      message : "PairRequest not found!"
    })
  }
  res.status(200).json({
    pairRequest: pairRequest
  })
})
.catch(error => {
  res.status(500).json({
    error: error
  });
});
});


//Route to get all Quotes
router.get('/', (req, res, next) => {
    PairRequest.find()
    .select("_id title body")
    .exec()
    .then(results => {
      responses = {
        count: results.length,
        pairRequest: results.map(result => {
          return {
            _id: result._id,
            title: result.title,
            body: result.body
          }
        })
      }
      res.status(200).json(responses)
    })
  
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
  });

router.post('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .exec()
  .then( user => {
      if(!user) {
        return res.status(404).json({
          message: "User does not exist"
        });
      }

      const pairRequest = new PairRequest({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body
      });
      return  pairRequest.save()
      .then(result => {
        console.log(user);
        res.status(201).json({
          message: "Pair Request successfully created!",
          pairRequest: {
            pairRequestId: result._id,
            title: result.title,
            body: result.body,
            request: {
              type: "GET",
              url: `http://localhost:3000/api/v1/${user._id}/pairRequest/${result._id}`
            }
          }
        })
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
  });

//Route to UPDATE
router.patch('/:pairRequestId', (req, res) => {
  PairRequest.findOneAndUpdate({ _id:req.params.pairRequestId }, req.body)
  .exec()
  .then(pairRequest => {
    console.log(pairRequest);
    res.status(200).json({
      message: "INFO Successfully updated!",
      pairRequest: pairRequest
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: error
    })
  });
})

//Route to delete PairRequest
router.delete('/:quoteId', (req, res, next) => {
  const id = req.params.quoteId;

  PairRequest.remove({ _id : id })
        .exec()
        .then(result => {
          res.status(200).json({
            message : "PairRequest has been deleted"
          })
        })
        .catch(error => {
          console.log(error);
          res,status(500).json({
            error : error
          })
        });
});

module.exports = router;