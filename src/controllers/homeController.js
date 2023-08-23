class HomeController {
    async index(req, res) {
      res.json('Start');
    }
}
  
export default new HomeController();
  