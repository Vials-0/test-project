module.exports = (app) => {
    app.get('/test/:testingParam', async (req, res) => {
        const { testingParam } = req.params;
        res.send(`API test concluded. Your testing param is: ${testingParam}`);
    });
}