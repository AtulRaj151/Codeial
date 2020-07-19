const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
     console.log(htmlString);
    nodeMailer.transporter.sendMail({
       from: 'atulsid151@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString,
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}