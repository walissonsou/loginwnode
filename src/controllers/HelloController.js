class HelloController  {
  async index(req, res) {
    return res.json({ hello: 'olá Hello'});
  }
}
export default new HelloController();
