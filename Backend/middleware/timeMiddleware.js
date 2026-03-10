const moment = require("moment");

const DEPLOY_TIME = moment(process.env.DEPLOY_TIME);

module.exports = (req, res, next) => {
  const now = moment();
  const diff = now.diff(DEPLOY_TIME, "minutes");

  if (diff > 20) {
    return res.status(403).json({
      message: "Resume submission time has expired.",
    });
  }
  next();
};
