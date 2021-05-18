const Clarifai = require('clarifai');

const config = require('../../config');

// You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: config.clarifai.apiKey,
});

module.exports = class FacialRecognitionService {
  constructor(User) {
    this.User = User;
  }

  async handleApiCall(params, accesUser) {
    const user = await this.User.findOne({ email: accesUser.email }).exec();

    if (!user) {
      const err = new Error('User not registered!');
      err.status = 400;
      throw err;
    } else {
      try {
        const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, params.url);
        const regions = data.outputs[0].data.regions.map(
          (region) => region.region_info.bounding_box,
        );

        user.images.push({ url: params.url, regions });
        user.save();

        return regions;
      } catch (e) {
        const err = new Error("Can't working with facial Recogniton model");
        err.status = 500;
        throw err;
      }
    }
  }
};
