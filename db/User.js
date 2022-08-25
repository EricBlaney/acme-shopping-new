const conn = require('./conn');
const { Sequelize } = conn;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { BOOLEAN } = require('sequelize');
const crypto = require('crypto');
const Token = require('./Token');
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: {
      args: true,
      msg: 'Email address is already in use!'
    }
  },
  street: {
    type: Sequelize.STRING
  },
  city:{
    type: Sequelize.STRING
  },
  zipcode:{
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.TEXT
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  },
  githubId: {
    type: Sequelize.INTEGER
  }
});


User.addHook('beforeSave', async(user)=> {
  user.password = await bcrypt.hash(user.password, 5);
});

User.addHook('beforeCreate', async(user) =>{
  try{
      const result = await User.findAll({
          where:{
              email: user.email
          }
      });
      if(result.length >= 1 ){
          throw 'Cannot add duplicate email!'
      }
} catch(er){
  throw er
}});


User.prototype.createOrderFromCart = async function(){
  const cart = await this.getCart();
  cart.isCart = false;
  return cart.save();
}

User.prototype.getCart = async function(){
  let order = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [ conn.models.product ]
      }
    ]
  });
  if(!order){
    order = await conn.models.order.create({ userId: this.id });
    order = await conn.models.order.findByPk(order.id, {
      include: [ conn.models.lineItem ]
    });
  }
  return order;
}

User.prototype.addToCart = async function({ product, quantity }){
  const cart = await this.getCart(); 
  let lineItem = await conn.models.lineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id
    }
  });
  if(lineItem){
    lineItem.quantity = quantity;
    if(lineItem.quantity){
      await lineItem.save();
    }
    else {
      await lineItem.destroy();
    }
  }
  else {
    await conn.models.lineItem.create({ productId: product.id, quantity, orderId: cart.id });
  }
  return this.getCart();
};

User.prototype.createWishListFromWishListItems = async function(){
  const wishlist = await this.getWishList();
  wishlist.isWishList = false;
  return wishlist.save();
};

User.prototype.getWishList = async function(){
  let wishlist = await conn.models.wishList.findOne({
    where: {
      userId: this.id,
    },
    include: [
      {
        model: conn.models.wishListItem,
        include: [ conn.models.product ]
      }
    ]
  });
  if(!wishlist){
    wishlist = await conn.models.wishList.create({ userId: this.id });
    console.log(wishlist)
    wishlist = await conn.models.wishList.findByPk( wishlist.id, {
      include: [ conn.models.wishListItem ]
    });
  }
  return wishlist;
}

User.prototype.addToWishList = async function({ product }){
  const wishlist = await this.getWishList();
  console.log(wishlist)

  let wishlistitem = await conn.models.wishListItem.findOne({
    where: {
      productId: product.id,
      wishListId: wishlist.id
    }
  });
  if(!wishlistitem){
    await conn.models.wishListItem.create({ productId: product.id, wishListId: wishlist.id });
  }
  return this.getWishList();
}

User.authenticate = async function(credentials){
  const user = await this.findOne({
    where: {
      username: credentials.username,
      isAdmin: false
    }
  });
  if(user && await bcrypt.compare(credentials.password, user.password)){
    return jwt.sign({ id: user.id }, process.env.JWT);
  }
  else {
    const error = new Error('Bad Credentials');
    error.status = 401;
    throw error;
  }
}

User.adminAuthenticate = async function(credentials){
  const user = await this.findOne({
    where: {
      username: credentials.username,
      isAdmin: true
    }
  });
  if(user && await bcrypt.compare(credentials.password, user.password)){
    return jwt.sign({ id: user.id }, process.env.JWT);
  }
  else {
    const error = new Error('You Are Not an Admin');
    error.status = 401;
    throw error;
  }
}

User.findByToken = async function findByToken(token){
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if(!user){
      throw 'error';
    }
    return user;
  }
  catch(ex){
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }
}

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: "retrosgamesnyc@gmail.com",
        pass: "smkgzqutvsggeuar" // naturally, replace both with your real credentials or an application-specific password
      },
      tls:{
        rejectUnauthorized: false
    } 
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: "retrosgamesnyc@gmail.com",
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

User.requestPasswordReset = async (user_email) => {
  const user = await User.findOne({
    where: {
      email: user_email
    }
  });
  if(!user) throw new Error("User does not exist");
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 5);

  await new Token({
    userId: user.id,
    token: hash,
    createdAt: Date.now(),
  }).save();
  const clientURL = "http://localhost:3000"
  const link = `${clientURL}/#/passwordreset/${resetToken}/${user.username}/${user.id}`;
  sendEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"./template/requestResetPassword.handlebars");
  return link;
}

User.resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({
    where: {
      userId: userId
    }
  });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const user = await User.findByPk(userId);
  await user.update(
    { password: password }
  );
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.destroy();
  return true;
};


module.exports = User;

