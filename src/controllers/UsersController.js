import User from '../models/User';
import { hash } from 'bcrypt';

class UsersController  {
  async index(req, res) {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err){
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  };  
  async show (req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if(!user) {
        return res.status(404).json("Vazio")
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error:"Internal server error." })

    }

  };
  async create (req, res) {
    try{
      const { email, password } = req.body;

      const user = await User.findOne({ email })

      if(user) {
        return res
        .status(422)
        .json({ message: `User ${email} already exist.`})
      }   
      const passwordHash = await hash(password, 8)

       
      const newUser = await User.create({
        email,
        password:passwordHash
      });
      
      return res.status(200).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error. "})
     
    }
    
  };
  async update (req, res) {
    try {
    const { id } = req.params;
    const { email, password } = req.body;

    const user = await User.findById(id);
    
    if(!user) {
      return res.status(404).json('Não foi possivel encontrar tal usuario');
      }
      const passwordHash = await hash(password, 8)

      await user.updateOne({email, password: passwordHash})

      return res.status(200).json("Usuário atualizado")
    } catch (err) {
      console.error(err);
      return res.status(500).json({error:"Internal server error." })

    }
    
    };
  async put (req, res) {
    
  };
  async destroy (req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
    

      if(!user){
        return res.status(404).json()
      }

      await user.deleteOne();

      return res.status(200).json("User deleted");

    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error"})
  
    }
  }
};
export default new UsersController();
 