const ShortUrl = require("../models/url");
const shortid = require("shortid");

const shortenUrl = async (req, res, next) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    const error = new Error("Original URL is required");
    error.statusCode = 400;
    return next(error);
  }

  let shortId;
  let saved = false;

  try {
    while (!saved) {
      try {
        shortId = shortid.generate();
        const newShortUrl = new ShortUrl({ originalUrl, shortId });
        await newShortUrl.save();
        saved = true;
        res.status(201).json({
          shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
        });
      } catch (err) {
        if (err.code === 11000) {
          console.log("Collision detected, regenerating shortId");
        } else {
          return next(err);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const redirectUrl = async (req, res, next) => {
  const { shortId } = req.params;

  try {
    const url = await ShortUrl.findOne({ shortId });

    if (!url) {
      const error = new Error("shortId not found");
      error.statusCode = 404;
      return next(error);
    }

    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

const getUrlStats = async (req, res, next) => {
  const { shortId } = req.params;

  try {
    const url = await ShortUrl.findOne({ shortId });

    if (!url) {
      const error = new Error("shortId not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { shortenUrl, redirectUrl, getUrlStats };
