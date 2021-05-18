const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const { User } = require('../../../auth/models');
const { FacialRecognitionService } = require('../../services');
const { authenticate } = require('../../../auth/middleware');

const router = Router();

const facialRecognitionService = new FacialRecognitionService(User);

module.exports = (routes) => {
  routes.use('/facial-recognition', authenticate, router);

  router.post(
    '/',
    celebrate({
      body: Joi.object().keys({
        url: Joi.string().trim().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        res.status(200).json({
          status: 'success',
          message: 'Facial recognition result.',
          data: {
            regions: await facialRecognitionService.handleApiCall(req.body, req.user),
          },
        });
      } catch (err) {
        next(err);
      }
    },
  );
};
