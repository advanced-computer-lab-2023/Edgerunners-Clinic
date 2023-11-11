const Package = require("../Models/Package.js");
const { default: mongoose } = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw",
);

const createPackage = async (req, res) => {
  try {
    await Package.create({
      Name: req.body.Name,
      discountDoctor: req.body.discountDoctor,
      discountMedicin: req.body.discountMedicin,
      discountFamily: req.body.discountFamily,
      Price: req.body.Price,
    });
    const price = parseInt(req.body.Price * 100);
    await stripe.products.create({
      name: req.body.Name,
      default_price_data: {
        currency: "egp",
        unit_amount: price,
      },
      description: "Package",
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create package !!");
  }
};

const getPackage = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).send({ data: packages });
  } catch (e) {
    res.status(400).send("Error could not get package !!");
  }
};

const updatePackage = async (req, res) => {
  try {
    await Package.updateOne(
      {
        Name: req.body.Name,
      },
      {
        $set: {
          Name: req.body.NewName,
          Price: req.body.Price,
          discountDoctor: req.body.discountDoctor,
          discountMedicin: req.body.discountMedicin,
          discountFamily: req.body.discountFamily,
        },
      },
    );
    const products = await stripe.products.list({
      active: true,
    });
    let package = Package.findOne({ Name: req.body.name });
    const product = products.data.find((p) => p.name === req.body.Name);

    const price = parseInt(req.body.Price * 100);
    if (req.body.Price !== package.Price) {
      const newPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: price,
        currency: "egp",
      });
      await stripe.products.update(product.id, {
        default_price: newPrice.id,
      });
      await stripe.prices.update(product.default_price, {
        active: false,
      });
    }
    if (req.body.Name !== req.body.NewName) {
      await stripe.products.update(product.id, {
        name: req.body.NewName,
      });
    }
    res.status(200).send("Updated Successfully");
  } catch (e) {
    res.status(400).send("Error could not update package !!");
  }
};

const deletePackage = async (req, res) => {
  try {
    await Package.deleteOne({
      Name: req.body.Name,
    });
    const products = await stripe.products.list({
      active: true,
    });
    const product = products.data.find((p) => p.name === req.body.Name);
    try{
      await stripe.products.del(product.id);
    }catch(e){
      await stripe.products.update(product.id, {
        active: false,
      });
    }
    res.status(200).send("Deleted Successfully");
  } catch (e) {
    res.status(400).send("Error could not delete package !!");
  }
};

module.exports = { createPackage, getPackage, updatePackage, deletePackage };
