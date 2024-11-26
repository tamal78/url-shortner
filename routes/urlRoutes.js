const express = require("express");
const {
  shortenUrl,
  redirectUrl,
  getUrlStats,
} = require("../controllers/urlController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ShortUrl:
 *       type: object
 *       properties:
 *         originalUrl:
 *           type: string
 *           description: The original URL to be shortened
 *           example: "https://google.com"
 *         shortId:
 *           type: string
 *           description: The unique ID for the shortened URL
 *           example: "abc123"
 *         clicks:
 *           type: integer
 *           description: Number of times the URL has been accessed
 *           example: 15
 *         lastAccessed:
 *           type: string
 *           format: date-time
 *           description: The last time the URL was accessed
 *           example: "2024-11-26T12:00:00Z"
 */

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The URL to shorten
 *                 example: "https://google.com"
 *     responses:
 *       201:
 *         description: Successfully created shortened URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortUrl'
 */
router.post("/shorten", shortenUrl);

/**
 * @swagger
 * /stats/{shortId}:
 *   get:
 *     summary: Get statistics for a short URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the shortened URL
 *           example: "abc123"
 *     responses:
 *       200:
 *         description: Successfully retrieved URL statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortUrl'
 *       404:
 *         description: URL not found
 */
router.get("/stats/:shortId", getUrlStats);

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the shortened URL
 *           example: "abc123"
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 */
router.get("/:shortId", redirectUrl);

module.exports = router;
