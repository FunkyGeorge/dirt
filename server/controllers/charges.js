var fs = require("fs");
// var stripe = require("stripe")(fs.readFileSync("keys/stripe_secret", "utf8"));
var stripe = require("stripe")("sk_test_0qLcAolfE3wA2Ry38K36ZYZF");

module.exports = {
	lead: function (req, res) {
		console.log(req.body)
		var token = req.body.stripeToken;
		console.log("token is:", token)
		var charge = stripe.charges.create({
			amount: 2500,
			currency: "usd",
			source: token,
			description: "Lead fee"
		}, function(err, charge) {
			console.log(err)
			console.log(charge)
			if (err && err.type === 'StripeCardError') {
				// The card has been declined
			}
			else res.end();
		});
	}
}